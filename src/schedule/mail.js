import axios from 'axios';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import config from '../config/config';

// const axios = require('axios');
// const path = require('path');
// const ejs = require('ejs');
// const nodemailer = require('nodemailer');
// const config = require('../config/config');

function toHHMMSS(segundos) {
  const hours = Math.floor(segundos / 3600);
  let minutes = Math.floor((segundos - hours * 3600) / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

async function enviaTodosEmails(entidades) {
  const transporter = nodemailer.createTransport({
    host: config.smtpServer,
    port: config.smtpPort,
    secure: config.useSSL,
    service: config.is365 ? 'Outlook365' : '',
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPass,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  entidades.map((entidade) => {
    const { emails, html } = entidade;
    emails.map(async (email) => {
      const info = await transporter.sendMail({
        from: config.smtpEmail,
        to: email.endereco,
        subject: 'Alerta de Horas',
        text: html,
        html,
      });
    });
    return entidade;
  });

  return entidades;
}

async function adicionaMensagem(entidades) {
  const entidadesComMensagem = await Promise.all(
    entidades.map(async (entidade) => {
      const { name, percentual, segundosDisponiveis, segundosGastos } =
        entidade;
      const { mensagem } = config;
      const viewPath = path.resolve(__dirname, '..', 'templates', 'email.ejs');

      const html = await ejs.renderFile(
        viewPath,
        {
          name,
          percentual,
          segundosDisponiveis: toHHMMSS(segundosDisponiveis),
          segundosGastos: toHHMMSS(segundosGastos),
          mensagem,
        },
        { async: true }
      );

      return { ...entidade, html };
    })
  );

  return entidadesComMensagem;
}

async function adicionaEmails(entidades) {
  const entidadesComEmails = await Promise.all(
    entidades.map(async (entidade) => {
      const res = await axios.get(
        `http://localhost:${config.port}/api/emails/${entidade.idEntidade}`
      );
      return { ...entidade, emails: res.data };
    })
  );
  return entidadesComEmails;
}

async function buscaTodasEntidades() {
  const res = await axios.get(`http://localhost:${config.port}/api/entidades`);
  return res.data;
}

function filtraEntidadesPorHora(entidades) {
  const entidadesFiltradas = entidades.filter((entidade) => {
    const { percentual, ultimaNotificacao } = entidade;
    return (
      (percentual >= 80 && ultimaNotificacao < 80) ||
      (percentual >= 90 && ultimaNotificacao < 90) ||
      (percentual >= 100 && ultimaNotificacao < 100) ||
      percentual < ultimaNotificacao
    );
  });
  return entidadesFiltradas;
}

function filtraEntidadesPorEmail(entidades) {
  const entidadesFiltradas = entidades.filter((entidade) => {
    const { emails } = entidade;
    return emails.length > 0;
  });
  return entidadesFiltradas;
}

async function adicionaHoras(entidades) {
  const entidadesCompletas = await Promise.all(
    entidades.map(async (entidade) => {
      const res = await axios.get(
        `http://localhost:${config.port}/api/horas/${entidade.id}`
      );

      if (res.status === 200) {
        const { id, ...cleanData } = res.data;
        return { ...entidade, ...cleanData };
      }
    })
  );

  return entidadesCompletas;
}

async function atualizaUltimaNotificacao(entidades) {
  entidades.map(async (entidade) => {
    const { id, percentual, ultimaNotificacao } = entidade;
    let novaUltimaNotificacao = percentual - 1;

    if (percentual < ultimaNotificacao) {
      novaUltimaNotificacao = 0;
    }

    const res = await axios.put(
      `http://localhost:${config.port}/api/horas/${id}`,
      {
        ultimaNotificacao: novaUltimaNotificacao,
      }
    );
  });
}

export default async function iniciaEnvio() {
  buscaTodasEntidades()
    .then(adicionaHoras)
    .then(filtraEntidadesPorHora)
    .then(adicionaEmails)
    .then(filtraEntidadesPorEmail)
    .then(adicionaMensagem)
    .then(enviaTodosEmails)
    .then(atualizaUltimaNotificacao);
}

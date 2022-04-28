import { QueryTypes } from 'sequelize';
import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';
import pdf from 'html-pdf';
import Relatorio from '../models/Relatorio';
import glpiDatabase from '../config/glpiDatabase';

async function excluiRelatorio(nome) {
  fs.unlink(path.resolve(__dirname, '..', 'files', nome), (error) =>
    console.log(error)
  );
}

async function criaRelatorio({ idEntidade, dataInicial, dataFinal }) {
  const nomeArquivo = `${Date.now().toString()}.pdf`;
  const query = await fs.readFile(
    path.resolve(__dirname, '..', 'database', 'queries', 'report.sql'),
    'utf-8'
  );

  const chamados = await glpiDatabase.query(query, {
    replacements: [idEntidade, dataInicial, dataFinal],
    type: QueryTypes.SELECT,
  });

  const viewPath = path.resolve(__dirname, '..', 'templates', 'relatorio.ejs');
  const html = await ejs.renderFile(viewPath, { chamados }, { async: true });
  const options = {
    format: 'A3',
  };

  const geraRelatorio = (data, opt, name) =>
    new Promise((resolve, reject) => {
      pdf
        .create(data, opt)
        .toFile(path.resolve(__dirname, '..', 'files', name), (err, res) => {
          if (err !== null) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });

  const result = await geraRelatorio(html, options, nomeArquivo);

  return result !== undefined ? nomeArquivo : 'erro';
}

class RelatorioController {
  async index(req, res) {
    try {
      const relatorios = await Relatorio.findAll({
        where: {
          idEntidade: req.params.id,
        },
      });
      return res.json(relatorios);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const relatorio = await Relatorio.findByPk(req.params.id);
      const { nomeArquivo } = relatorio;
      relatorio.destroy();
      excluiRelatorio(nomeArquivo);

      const relatorios = await Relatorio.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.json(relatorios);
    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      const relatorio = { ...req.body };
      const nomeArquivo = await criaRelatorio(relatorio);
      relatorio.nomeArquivo = nomeArquivo;
      const relatorioGerado = await Relatorio.create(relatorio);

      if (relatorioGerado) {
        return res.send(relatorioGerado);
      }
      return res.status(404).json({
        error: 'Não foi possível gerar o PDF',
      });
    } catch (e) {
      console.error(e);
      return res.status(404).json({
        error: 'Não foi possível gerar o PDF',
      });
    }
  }
}

export default new RelatorioController();

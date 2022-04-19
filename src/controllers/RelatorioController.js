import { QueryTypes } from 'sequelize';
import ejs from 'ejs';
import fs from 'fs';
import pdf from 'html-pdf';
import path from 'path';
import Relatorio from '../models/Relatorio';
import glpiDatabase from '../config/glpiDatabase';

async function excluiRelatorio(nome) {
  fs.unlink(path.resolve(__dirname, '..', 'files', nome), (error) =>
    console.log(error)
  );
}

async function criaRelatorio({ idEntidade, dataInicial, dataFinal }) {
  const nomeArquivo = `${Date.now().toString()}.pdf`;

  const chamados = await glpiDatabase.query(
    `SELECT glpi_tickettasks.tickets_id as numero,
    glpi_tickets.name as titulo,
    glpi_tickets.status as status,
    CONCAT(glpi_users.realname, ' ', glpi_users.firstname) as requerente,
    glpi_tickets.date as aberto,
    glpi_tickets.solvedate as fechado,
    SUM(glpi_tickettasks.actiontime) as tempo
    FROM glpi_tickets
    INNER JOIN glpi_users
    ON glpi_tickets.users_id_recipient = glpi_users.id
    INNER JOIN glpi_tickettasks
    ON glpi_tickets.id = glpi_tickettasks.tickets_id
    WHERE glpi_tickets.entities_id = ?
    AND glpi_tickettasks.date BETWEEN ? AND ?
    GROUP BY glpi_tickettasks.tickets_id;`,
    {
      replacements: [idEntidade, dataInicial, dataFinal],
      type: QueryTypes.SELECT,
    }
  );

  ejs.renderFile(
    path.resolve(__dirname, '..', 'templates', 'relatorios.ejs'),
    { chamados },
    (error, data) => {
      if (error) {
        console.error(error);
      } else {
        pdf
          .create(data)
          .toFile(
            path.resolve(__dirname, '..', 'files', nomeArquivo),
            (error, res) => {
              console.error(error);
              console.error(res);
            }
          );
      }
    }
  );

  return nomeArquivo;
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

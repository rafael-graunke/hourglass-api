import { QueryTypes } from 'sequelize';
import Hora from '../models/Hora';
import glpiDatabase from '../config/glpiDatabase';

class HoraController {
  async index(req, res) {
    try {
      let [
        id,
        idEntidade,
        segundosDisponiveis,
        segundosGastos,
        percentual,
        existe,
      ] = [Number(req.params.id), Number(req.params.id), 0, 0, 0, false];

      const hora = await Hora.findOne({
        where: {
          idEntidade: req.params.id,
        },
      });

      if (hora) {
        id = hora.id;
        idEntidade = hora.idEntidade;
        segundosDisponiveis = hora.segundosDisponiveis;
        existe = true;
      }

      const horaGlpi = await glpiDatabase.query(
        `SELECT SUM(glpi_tickettasks.actiontime) as segundosGastos
        FROM glpi_tickets
        INNER JOIN glpi_tickettasks
        ON glpi_tickets.id = glpi_tickettasks.tickets_id
        WHERE glpi_tickets.entities_id = ?
        AND glpi_tickettasks.date BETWEEN ? AND ?;`,
        {
          replacements: [
            req.params.id,
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).toISOString(),
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ).toISOString(),
          ],
          type: QueryTypes.SELECT,
        }
      );

      if (horaGlpi) {
        segundosGastos = horaGlpi[0].segundosGastos || 0;
      }

      percentual = segundosDisponiveis
        ? (segundosGastos / segundosDisponiveis) * 100
        : 0;

      return res.json({
        id,
        idEntidade,
        segundosDisponiveis,
        segundosGastos,
        percentual,
        existe,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async create(req, res) {
    try {
      return res.json(Hora.create(req.body));
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      return res.json(Hora.upsert({ id: req.params.id, ...req.body }));
    } catch (e) {
      console.error(e);
    }
  }
}

export default new HoraController();

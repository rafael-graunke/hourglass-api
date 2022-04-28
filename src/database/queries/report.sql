SELECT glpi_tickettasks.tickets_id as numero,
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
GROUP BY glpi_tickettasks.tickets_id;

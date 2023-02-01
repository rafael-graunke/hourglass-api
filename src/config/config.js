require('dotenv').config();

module.exports = {
  // General setup
  port: 3001,
  timezone: process.env.TIMEZONE,
  sessionSecret: process.env.SESSION_SECRET,
  sessionMaxAge: 604800,

  // SMTP to send notifications
  smtpServer: process.env.SMTP_SERVER,
  smtpPort: 587,
  useSSL: true,
  is365: true, // Set to true if e-mail provider is Microsoft's Office 365
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPass: process.env.SMTP_PASS,

  // Email notification
  mensagem: {
    text:
      process.env.NOTIFICATION_TEXT ||
      'O sistema identificou o seguinte alerta: ',
    companyLogoUrl:
      process.env.NOTIFICATION_COMPANY_LOGO ||
      'https://via.placeholder.com/200x100',
  },

  // System own database
  databaseName: process.env.DATABASE,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT || 3306,
  databaseUser: process.env.DATABASE_USERNAME,
  databasePass: process.env.DATABASE_PASSWORD,

  // GLPI database
  glpiDbName: process.env.GLPI_DATABASE,
  glpiDbHost: process.env.GLPI_HOST,
  glpiDbUser: process.env.GLPI_USER,
  glpiDbPass: process.env.GLPI_PASS,
};

import cron from 'node-cron';
import envioEmails from './mail';

function cronStart() {
  cron.schedule('*/1 * * * *', () => {
    envioEmails();
  });
}

export default cronStart;

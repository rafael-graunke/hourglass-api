import app from './app';
import cron from './schedule/cron';
import config from './config/config';

const port = config.port || 3001;

app.listen(port, () => {
  console.log(`\nListening on port ${port}`);
  console.log(`http://localhost:${port}\n`);
});

cron();

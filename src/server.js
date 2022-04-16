import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`\nListening on port ${port}`);
  console.log(`http://localhost:${port}\n`);
});

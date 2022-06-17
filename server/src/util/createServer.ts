import express from 'express';

export default function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/healthcheck', (_, res) => {
    res.send('hi');
  });

  const port = Number(process.env.PORT || 4000);

  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  })
}

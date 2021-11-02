import './configs/env';
import app from './configs/express';

const server = app;

server.listen(process.env.PORT_SERVER || 3002, () => {
  console.log(`🚀 Server iniciando na porta ${process.env.PORT_SERVER || 3002} 🚀`);
});

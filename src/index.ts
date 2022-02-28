import './config/env';
import server from './server';

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`server listening at ${PORT}`));

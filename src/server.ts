import express from 'express';
import path from 'path';

// Importar arquivo com a definição de conexão com o banco
import './database/connection';

import routes from './routes';

const app = express();

// Possibilitar que o express consiga interpretar requisições com JSON
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333);
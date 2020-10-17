import express from 'express';
// Módulo do ORM que contém os métodos para interagir com a tabela do BD
import { getRepository } from 'typeorm';

// Modelo de orfanatos
import Orphanage from './models/Orphanage';

// Importar arquivo com a definição de conexão com o banco
import './database/connection';

const app = express();

// Possibilitar que o express consiga interpretar requisições com JSON
app.use(express.json());

app.post('/orphanages', async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  } = request.body;

  // Associar repositório ao modelo definido de orfanatos
  const orphanagesRepository = getRepository(Orphanage);

  // Prepara a criação de orfanato com os campos do request.body
  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends
  })

  // Gravar o orfanato no banco, por ser uma tarefa demorada, usar o await e colocar async na função
  await orphanagesRepository.save(orphanage);

  // Retornar o status 201 (Criação) e o objeto do orfanato recém-criado
  return response.status(201).json(orphanage);
})

app.listen(3333);
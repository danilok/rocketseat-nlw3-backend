import { Request, Response } from 'express';
// Módulo do ORM que contém os métodos para interagir com a tabela do BD
import { getRepository } from 'typeorm';

// Modelo de orfanatos
import Orphanage from '../models/Orphanage';

export default {

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanages);
  },

  async create(request: Request, response: Response) {
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

    // Recebe as imagens da propriedade files da request
    // Também forçamos que a tipagem seja um array de File do Multer
    const requestImages = request.files as Express.Multer.File[];
    // Mapeamos para que o array de imagens tenha os campos necessários para serem repassados pra tabela de imagens
    // No caso só precisamos passar o path que é o nome da imagem dentro da pasta uploads
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    // Prepara a criação de orfanato com os campos do request.body
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    })

    // Gravar o orfanato no banco, por ser uma tarefa demorada, usar o await e colocar async na função
    await orphanagesRepository.save(orphanage);

    // Retornar o status 201 (Criação) e o objeto do orfanato recém-criado
    return response.status(201).json(orphanage);
  }
};
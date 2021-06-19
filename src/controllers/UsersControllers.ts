import { getRepository } from "typeorm";
import { Request, Response } from "express";

import User from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { username, password, address, type } = request.body;

    const usersRepository = getRepository(User);
    const data = {
      username,
      password,
      type,
      address,
    };

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(user);
  },

  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const user = await userRepository.find();
    return response.json(user);
  },
};

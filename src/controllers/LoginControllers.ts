import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const loginRepository = getRepository(User);

    const login = await loginRepository.findOne({
      where: { username },
    });

    if (password === login?.password) {
      return response.status(201).json({
        username: login?.username,
        password: login?.password,
        type: login?.type,
      });
    } else {
      return response.status(500).json({ message: "Senha incorreta!" });
    }
  },
};

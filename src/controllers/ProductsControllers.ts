import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Product from "../models/Product";
import * as Yup from "yup";
import productsView from "../views/products_view";

export default {
  async index(request: Request, response: Response) {
    const productRepository = getRepository(Product);

    const product = await productRepository.find({ relations: ["images"] });

    return response.json(productsView.renderMany(product));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(productsView.render(product));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      category,
      price,
      quantity,
      color,
      main_detail,
      description,
      specification,
    } = request.body;

    const productRepository = getRepository(Product);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages?.map((image: any) => {
      return { path: image?.filename };
    });

    const data = {
      name,
      category,
      price,
      quantity,
      color,
      main_detail,
      description,
      specification,
      images,
    };

    const schema = Yup?.object().shape({
      name: Yup.string().required(),
      category: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      color: Yup.string().required(),
      main_detail: Yup.string().required(),
      description: Yup.string().required(),
      specification: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const product = productRepository.create(data);

    await productRepository.save(product);

    return response.status(201).json(product);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = productRepository.delete(id);

    return response.json(product);
  },
};

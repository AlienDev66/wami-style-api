import Product from "../models/Product";
import imagesView from "./images_view";

export default {
  render(product: Product) {
    return {
      id: product?.id,
      name: product?.name,
      category: product?.category,
      price: product?.price,
      quantity: product?.quantity,
      color: product?.color,
      main_detail: product?.main_detail,
      description: product?.description,
      specification: product?.specification,
      images: imagesView?.renderMany(product?.images),
    };
  },

  renderMany(products: Product[]) {
    return products?.map((product) => this.render(product));
  },
};

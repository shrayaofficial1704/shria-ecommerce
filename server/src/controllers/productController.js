import { getProductBySlug, listProducts } from "../services/catalogService.js";

export async function getProducts(request, response, next) {
  try {
    const featured = request.query.featured === "true";
    const products = await listProducts({ featured });
    response.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(request, response, next) {
  try {
    const product = await getProductBySlug(request.params.slug);

    if (!product) {
      response.status(404);
      throw new Error("That gown could not be found.");
    }

    response.json({ product });
  } catch (error) {
    next(error);
  }
}


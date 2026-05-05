import Product from "../models/Product.js";
import products from "../data/products.js";
import { isDatabaseReady } from "../config/db.js";

let catalogChecked = false;

function toClientShape(product) {
  const normalized = product.toObject ? product.toObject() : product;

  return {
    id: normalized._id?.toString?.() ?? normalized.id ?? normalized.slug,
    ...normalized,
  };
}

async function seedCatalogIfNeeded() {
  if (!isDatabaseReady() || catalogChecked) {
    return;
  }

  const count = await Product.countDocuments();

  if (count === 0) {
    await Product.insertMany(products);
  }

  catalogChecked = true;
}

export async function listProducts({ featured } = {}) {
  if (!isDatabaseReady()) {
    const filteredProducts = featured ? products.filter((product) => product.featured) : products;
    return filteredProducts.map(toClientShape);
  }

  await seedCatalogIfNeeded();

  const query = featured ? { featured: true } : {};
  const databaseProducts = await Product.find(query).sort({ sortOrder: 1, price: 1 }).lean();
  return databaseProducts.map(toClientShape);
}

export async function getProductBySlug(slug) {
  if (!isDatabaseReady()) {
    const product = products.find((entry) => entry.slug === slug);
    return product ? toClientShape(product) : null;
  }

  await seedCatalogIfNeeded();
  const product = await Product.findOne({ slug }).lean();
  return product ? toClientShape(product) : null;
}

export async function findProductsBySlugs(slugs) {
  if (!isDatabaseReady()) {
    return products.filter((product) => slugs.includes(product.slug)).map(toClientShape);
  }

  await seedCatalogIfNeeded();
  const databaseProducts = await Product.find({ slug: { $in: slugs } }).lean();
  return databaseProducts.map(toClientShape);
}

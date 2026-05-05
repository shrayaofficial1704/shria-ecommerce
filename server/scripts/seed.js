import { connectDatabase, isDatabaseReady } from "../src/config/db.js";
import products from "../src/data/products.js";
import Product from "../src/models/Product.js";

async function seedProducts() {
  await connectDatabase();

  if (!isDatabaseReady()) {
    throw new Error("MongoDB is required for seeding. Add MONGODB_URI to server/.env first.");
  }

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} Shria products into MongoDB.`);
  process.exit(0);
}

seedProducts().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

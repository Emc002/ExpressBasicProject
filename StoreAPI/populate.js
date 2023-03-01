require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product');
const jsonProducts = require('./products.json')

const starting = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("Success")
    process.exit(0);
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}
starting()
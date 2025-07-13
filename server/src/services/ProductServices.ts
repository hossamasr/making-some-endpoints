import { productModel } from "../models/ProductModel";

export const getAllproducts = async () => {
  return await productModel.find();
};

export const setIntialseed = async () => {
  try {
    const products = [
      {
        title: "Laptop",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLh5Sr5Wr4qQexto-sC-deIOOExF9oaC-r-A&s",
        price: 10,
        stock: 10,
      },
    ];

    const productIndb = await getAllproducts();
    if (productIndb.length == 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot Connect to Db", err);
  }
};

import { CartModel, ICartItem } from "../models/CartModel";
import { productModel } from "../models/ProductModel";
import { orderModel, IorderItem, Iorder } from "../models/orderModel";

interface CreateCartForUser {
  userID: string;
}

const CreateCartForUser = async ({ userID }: CreateCartForUser) => {
  const cart = await CartModel.create({ userID, totalPrice: 0 });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userID: string;
}

export const getActiveCartForUser = async ({
  userID,
}: getActiveCartForUser) => {
  const cart = await CartModel.findOne({ userID, status: "active" });
  if (!cart) {
    const cart = await CreateCartForUser({ userID });
    return cart;
  }

  return cart;
};
interface clearCart {
  userID: string;
}

export const clearCart = async ({ userID }: clearCart) => {
  console.log(userID);
  const cart = await getActiveCartForUser({ userID });

  cart.items = [];
  cart.totalPrice = 0;

  const updatedcart = await cart?.save();
  return { data: updatedcart, statusCode: 201 };
};
interface AddItemtoCart {
  userID: string;
  productID: string;
  quantity: number;
}

export const addItemtocart = async ({
  userID,
  productID,
  quantity,
}: AddItemtoCart) => {
  const cart = await getActiveCartForUser({ userID });
  // product not found
  const existIncart = cart?.items.find((p) => {
    return p.product._id?.toString() === productID;
  });

  if (existIncart) {
    return { data: "item already exists", statusCode: 400 };
  }
  const product = await productModel.findById(productID);
  if (!product) {
    return { data: "item not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "out of stock", statusCode: 400 };
  }
  cart?.items.push({ product: product, unitPrice: product.price, quantity });
  // update price
  if (cart) {
    cart.totalPrice += product.price * quantity;
  }
  const updatedcart = await cart?.save();
  return { data: updatedcart, statusCode: 201 };
};

interface updateItemIncart {
  userID: string;
  productID: string;
  quantity: number;
}

export const updateItemIncart = async ({
  userID,
  productID,
  quantity,
}: updateItemIncart) => {
  const cart = await getActiveCartForUser({ userID });
  // product not found
  const existIncart = cart?.items.find((p) => {
    return p.product._id?.toString() === productID;
  });
  if (!existIncart) {
    return { data: "item not exist", statusCode: 400 };
  }
  const product = await productModel.findById(productID);
  if (!product) {
    return { data: "item not found", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "out of stock", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter((p) => {
    return p.product._id?.toString() !== productID;
  });
  let total = calculateCartTotalitems(otherCartItems);

  existIncart.quantity = quantity;
  total += existIncart.quantity * existIncart.unitPrice;

  cart.totalPrice = total;
  const updatedcart = await cart?.save();
  return { data: updatedcart, statusCode: 201 };
};

interface deleteItemIcart {
  userID: string;
  productID: any;
}

export const deleteItemIcart = async ({
  userID,
  productID,
}: deleteItemIcart) => {
  const cart = await getActiveCartForUser({ userID });
  console.log(productID);
  // product not found
  const existIncart = cart?.items.find((p) => {
    return p.product._id?.toString() === productID;
  });
  if (!existIncart) {
    return { data: "item not exist", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter((p) => {
    return p.product._id?.toString() !== productID;
  });

  let total = calculateCartTotalitems(otherCartItems);

  cart.items = otherCartItems;
  cart.totalPrice = total;
  const updatedcart = await cart?.save();
  return { data: updatedcart, statusCode: 201 };
};

const calculateCartTotalitems = (cart: ICartItem[]) => {
  const total = cart.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};

interface checkOut {
  userID: string;
  address: string;
}
export const checkOut = async ({ userID, address }: checkOut) => {
  const cart = await getActiveCartForUser({ userID });
  const orderItems: IorderItem[] = [];
  for (let item of cart.items) {
    const product = await productModel.findById(item.product._id);
    if (!product) {
      return { data: "product not found", statusCode: 400 };
    }
    const orderItem: IorderItem = {
      productTitle: product.title,
      ProductImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    items: orderItems,
    totalPrice: cart.totalPrice,
    address: address,
    userID: userID,
  });

  (await order).save();

  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};

const express = require("express");
const app = express();
const PORT = 4000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");

// read data from json file
//const fs = require("fs");

const Cart = require("./models/carts.models");

const Product = require("./models/bicycles.models");
const Contact = require("./models/contactUS.models");
const Blog = require("./models/blogPost.models");


app.use(express.json());

initializeDatabase();

// Uncomment this to seed data into database.

/*
const jsonData = fs.readFileSync("products.json", "utf8");

const products = JSON.parse(jsonData);
*/

// function to seed data.

/*
function seedData(){
  try{
    for(const productData of products){
      const newProduct = new Product({
        name: productData.name,
        type: productData.type,
        brand: productData.brand,
        model: productData.model,
        year: productData.year,
        price: productData.price,
        imageUrls: productData.imageUrls,
        description: productData.description,
        favorite: productData.favorite,
        availableInStock: productData.availableInStock,
        stockQuantity: productData.stockQuantity,
        categories: productData.categories,
        tags: productData.tags,
        weight: productData.weight,
        dimensions: productData.dimensions,
        material: productData.material,
        color: productData.color,
        size: productData.size,
        condition: productData.condition,
        warranty: productData.warranty,
        warrantyDuration: productData.warrantyDuration,
        shipping: productData.shipping,
        shippingCost: productData.shippingCost,
        shippingDuration: productData.shippingDuration,
        reviews: productData.reviews,
      });
      newProduct.save(); 
    }
  }catch(error){
    console.error("Error seeding data", error);
  }
}

//seedData();
*/

// code for blog.

async function getBlogData() {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    return { error: "Error  While getting Blogs" };
  }
}

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await getBlogData();
    if (blogs.length != 0) {
      res.json(blogs);
    } else {
      res.status(404).json({ message: "No Blogs Found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting Blogs" });
  }
});

async function saveBlogsData(blogData) {
  try {
    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    return savedBlog;
  } catch (error) {
    throw error;
  }
}

app.post("/blogs", async (req, res) => {
  try {
    const savedBlog = await saveBlogsData(req.body);
    res.status(201).json({ message: "Blog Posted successfully!!! Thank You." });
  } catch (error) {
    res.status(500).json({ error: "Error while submitting form." });
  }
});

// Code for get In touch form.

async function saveContactData(contactData) {
  try {
    const contact = new Contact(contactData);
    const savedContact = await contact.save();
    return savedContact;
  } catch (error) {
    throw error;
  }
}

app.post("/contacts", async (req, res) => {
  try {
    const savedContact = await saveContactData(req.body);
    res.status(201).json({
      message:
        "Form submitted successfully! We will contact you soon! Thank You.",
    });
  } catch (error) {
    res.status(500).json({ error: "Error submitting form." });
  }
});

async function getContactData() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    //console.log(error)
    return { error: "Error getting Contacts" };
  }
}

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await getContactData();
    if (contacts.length != 0) {
      res.json(contacts);
    } else {
      res.status(404).json({ message: "No Contact details found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting Contacts" });
  }
});

// Get all products
async function getAllProducts() {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (error) {
    return error;
  }
}

app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByType(productType) {
  try {
    const products = await Product.find({ type: productType });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/type/:type", async (req, res) => {
  try {
    const products = await getProductsByType(req.params.type);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByBrand(productBrand) {
  try {
    const products = await Product.find({ brand: productBrand });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/brand/:brand", async (req, res) => {
  try {
    const products = await getProductsByBrand(req.params.brand);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByModel(productModel) {
  try {
    const products = await Product.find({ model: productModel });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/model/:model", async (req, res) => {
  try {
    const products = await getProductsByModel(req.params.model);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByYear(productYear) {
  try {
    const products = await Product.find({ year: productYear });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/year/:year", async (req, res) => {
  try {
    const products = await getProductsByYear(req.params.year);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsByPrice(productPrice) {
  try {
    const products = await Product.find({ price: productPrice });
    return products;
  } catch (error) {
    throw error;
  }
}

app.get("/products/price/:price", async (req, res) => {
  try {
    const products = await getProductsByPrice(req.params.price);
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

app.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "No product found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

async function getProductsIfFavorite() {
  try {
    const products = await Product.find({ favorite: true });
    return products;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
}

app.get("/products/favorite/isFavorite", async (req, res) => {
  try {
    const favorites = await getProductsIfFavorite();
    if (favorites.length != 0) {
      res.json(favorites);
    } else {
      res.status(404).json({ message: "There is no favorite Products." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Getting Favorite Product." });
  }
});

async function updateFavorite(productId, dataToUpdate) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      dataToUpdate,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    console.error("Error in updating Favorite.");
    return error;
  }
}

app.post("/products/favorite/isFavorite/:productId", async (req, res) => {
  try {
    const updatedProduct = await updateFavorite(req.params.productId, req.body);

    if (updatedProduct) {
      res.status(200).json({ message: "Favorite updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update favorite" });
  }
});


// Cart API

async function addOrUpdateCartItem(productId, quantity){
  try{
    const product = await Product.findById(productId);
    if(!product){
      throw new Error("Product not found");
    }

    let cartItem = await Cart.findOne({productId});
    if(cartItem){
      cartItem.quantity = quantity;
      await cartItem.save();
    }else{
      cartItem = new Cart({productId,quantity});
      await cartItem.save();
    }

    return cartItem;

  }catch(error){
    throw error;
  }
}

app.post("/cart", async(req,res)=>{
  try{
    if(!req.body || !req.body.productId || !req.body.quantity){
      res.status(400).json({error: "Invalid request body"});
      return;
    }
    const {productId, quantity} = req.body;
    const cartItem = await addOrUpdateCartItem(productId,quantity);
    res.status(200).json(cartItem); 
  }catch(error){
    res.status(500).json({error: error.message});
  }
})


async function getAllCartItems(){
  try{
    const cartItems = await Cart.find().populate("productId");
    return cartItems;
  }catch(error){
    throw error;
  }
}


app.get("/cart", async(req,res)=>{
  try{
    const cartItems = await getAllCartItems();
    if(cartItems.length > 0){
      res.status(200).json(cartItems);
    }else{
      res.status(404).json({message: "Cart is empty"});
    }
  }catch(error){
    res.status(500).json({error: error.message});
  }
})


async function updateCartItemQuantity(cartItemId, quantity){
  try{
    const cartItem = await Cart.findById(cartItemId);
    if(!cartItem){
      throw new Error("Cart Item not found.")
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  }catch(error){
    throw error;
  }
}


app.post("/cart/:id", async(req,res)=>{
  try{
    const {quantity} = req.body;
    const updatedCartItem = await updateCartItemQuantity(req.params.id,quantity);
    res.status(200).json(updatedCartItem);
  }catch(error){
    res.status(500).json({error: error.message});
  }
})

async function removeCartItem(cartItemId){
  try{
    const cartItem = await Cart.findByIdAndDelete(cartItemId);
    if(!cartItem){
      throw new Error("Cart item not found");
    }
    return cartItem;
  }catch(error){
    throw error;
  }
}


app.delete("/cart/:id", async(req,res)=>{
  try{
    const removedCartItem = await removeCartItem(req.params.id);
    res.status(200).json(removeCartItem);
  }catch(error){
    res.status(500).json({error: error.message});
  }
})


async function clearCart(){
  try{
    await Cart.deleteMany({});
    return {message: "All items removed from cart"};
  }catch(error){
    throw error;
  }
}

app.delete("/cart", async(req,res)=>{
  try{
    const result = await clearCart();
    res.status(200).json(result);
  }catch(error){
    res.status(500).json({error: error.message});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

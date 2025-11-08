const expres = require("express")
const upload = require("../utility/multer")
const Product = require("../models/productModel")
const router = expres.Router()

// add product
router.post("/", upload.array("images", 3), async(req , res)=>{
    try {
    const { name, category, price, description, stock, sale } = req.body;
    const images = req.files.map((file) => file.path);

    const product = await Product.create({
      name,
      category,
      price,
      description,
      images,
      stock,
      sale,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


// get all products for admin
router.get("/admin", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get all products for user
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router
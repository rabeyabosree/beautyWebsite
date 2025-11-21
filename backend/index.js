const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()

const PORT = process.env.PORT

// cors

// Allow both localhost + production frontend
const allowedOrigins = [
  "http://localhost:5173",
  process.env.BASE_URL // This must be set in Render env
];

app.use(cors({
  origin: function(origin, callback) {
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

console.log("CORS allowed origins:", allowedOrigins);



// json and formdat data middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongoose connection
const MONGO_URI = process.env.MONGO_URL
mongoose.connect(MONGO_URI)
    .then(() => console.log("Mongodb connected"))
    .catch((error) => console.error("mongodb error", error))

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB connected");

//     // Optional: Clear existing data
//     await Product.deleteMany();

//     // Insert dummy products
//     await Product.insertMany(products);
//     console.log("✅ Products inserted successfully");

//     process.exit(); // Exit the script
//   } catch (err) {
//     console.error("MongoDB error:", err);
//     process.exit(1);
//   }
// };

// seedProducts()


// routes
const productsRoute = require("./routes/productRoute")
const orderRoute = require('./routes/orderRoute')
app.use("/api/products", productsRoute)
app.use("/api/orders", orderRoute)

// app listening
app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`) })

// app response
app.use("/", (req, res) => {
    res.send("Hello world")
})
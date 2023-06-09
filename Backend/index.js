const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
dotenv.config()


const uri = `mongodb+srv://${process.env.ACCESS_KEY}:${process.env.SECRET_KEY}@cluster1.jqrukay.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database collection list here
const database = client.db("e-commerce")
const allProducts = database.collection("all-products")

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
    app.get('/all-products', async (req,res)=>{
      const query = {};
      const products = await allProducts.find(query).toArray();
      res.send(products)
    })
    app.get('/hot-products', async (req,res)=>{
      const query = {product_type:'hot'};
      const products = await allProducts.find(query).toArray();
      res.send(products)
    })
    app.get('/trending-products', async (req,res)=>{
      const query = {product_type:'trending'};
      const products = await allProducts.find(query).toArray();
      res.send(products)
    })
    app.get('/popular-products', async (req,res)=>{
      const query = {product_type:'popular'};
      const products = await allProducts.find(query).toArray();
      res.send(products)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send(`Backend server working on port ${port}`)
})




// Listening on port (Express default)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
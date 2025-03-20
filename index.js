const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 4000;

const app = express();

// movie-portal12
// PU7OipukqsR9xKph

const uri = "mongodb+srv://movie-portal12:PU7OipukqsR9xKph@cluster0.vl8e1.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




//middleware
app.use(cors());
app.use(express.json());





async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
     await client.connect();
      // Send a ping to confirm a successful connection
     await client.db("admin").command({ ping: 1 });

   const databaseMovies = client.db('moviePortal').collection('movies');
  
  app.get("/movies",async(req,res)=>{
    const cursor = databaseMovies.find();
    const result = await cursor.toArray();
    res.send(result);
  })
     app.post("/movies", async(req,res)=>{
      const movieInfo = req.body;
    console.log(movieInfo );

     const data = await databaseMovies.insertOne(movieInfo );
     res.send(data);

     })


    
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
     
    }
  }
  run().catch(console.dir);


  const object ={
  "name":"mumtahina",
  "enroll": 200303246
  };

  app.get("/",async(req,res)=>{


    //  const data = await object.toArray();
    res.send(object);

});

app.listen(port,()=>{
    console.log("server running on port:",port);
})
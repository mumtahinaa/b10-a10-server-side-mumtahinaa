const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
   const FavoriteDb = client.db("favoriteMovies").collection("Fmovies");


  
  app.get("/movies",async(req,res)=>{
    const cursor = databaseMovies.find().sort({rating:-1});
    const result = await cursor.toArray();
    res.send(result);
  })

 

  app.get("/movies/:id", async(req, res)=>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)};
    const result = await databaseMovies.findOne(query);
    res.send(result);

  })


     app.post("/movies", async(req,res)=>{
      const movieInfo = req.body;
    console.log(movieInfo );

     const data = await databaseMovies.insertOne(movieInfo );
     res.send(data);

     });

     app.put("/movies/:id", async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const movie = req.body;
      console.log(movie);

      const updateMovie ={
        $set:{
            
title:movie.title,
poster:movie.poster,
genre:movie.genre,
releaseYear:movie.releaseYear,
rating:movie.rating,
duration:movie.duration,
summary:movie.summary,
        }
      }
      const result = await databaseMovies.updateOne(filter,updateMovie,options)
      res.send(result);
     })

     app.delete("/movies/:id", async(req,res)=>{
      const id = req.params.id;
      console.log(id)
       const query = {_id: new ObjectId(id)}
       const deleteMovie = await databaseMovies.deleteOne(query);
       res.send(deleteMovie);
     });

     //for favorite section
     app.get("/favorite/:email", async (req, res) => {
      const email  = req.params.email;
      console.log("Email:", email);
    
      const cursor = FavoriteDb.find({ User: email });
      const result = await cursor.toArray();
      res.send(result);
    });

     app.post("/favorite",async(req,res)=>{
      const Fdata = req.body;
      // console.log(Fdata);
      const data = await FavoriteDb.insertOne(Fdata)
      res.send(data);
     });

     app.delete("/favorite/:id",async(req,res)=>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: new ObjectId(id)}
      const deleteFav = await FavoriteDb.deleteOne(query);
      res.send(deleteFav);

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
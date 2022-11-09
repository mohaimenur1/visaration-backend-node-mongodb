/** @format */

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

//middile ware

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://rahi:MLM4HtxSaGKzxXAO@cluster0.ap4ff9h.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db('visaration').collection('services');
    const reviewCollection = client.db('visaration').collection('reviews');

    //server route
    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    //home route
    app.get('/home', async (req, res) => {
      const cursor = serviceCollection.find({});
      const limdata = cursor.limit(3);
      const services = await limdata.toArray();
      res.send(services);
    });

    // service single route / service id route
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // reviews api

    //review get api
    app.get('/reviews/:service', async (req, res) => {
      // let query = {};
      // const id = req.params.id;
      // if(req.query.id){
      //   query = {
      //     service: req
      //   }
      // }
      const service = req.params.service;
      const query = { service };

      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.post('/reviews', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port running on port ${port}`);
});

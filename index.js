const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

//middile ware

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://rahi:MLM4HtxSaGKzxXAO@cluster0.ap4ff9h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("visaration").collection("services");

    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    //   app.post("/users", async (req, res) => {
    //     console.log("Post API called");
    //     const user = req.body;

    // users.push(user);
    // console.log(user);
    // const result = await userCollection.insertOne(user);
    // console.log(result);
    // user._id = result.insertedId;
    // res.send(user);
    // console.log(req.body);
    //   });
  } finally {
  }
}

run().catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port running on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.zsn3kat.mongodb.net/?retryWrites=true&w=majority`;

// const uri = 'mongodb://0.0.0.0:27017/';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db('TourismaDB');
    const Traveler = database.collection('Traveler');
    const Bonus = client.db('Bonus');
    const country = Bonus.collection('country');

  app.get('/country', async (req, res) => {
    try {
      const cursor = await country.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    app.get('/country/:name', async (req, res) => {
      const countryName = req.params.name;
      const query = {country_Name : countryName}
      const cursor = await Traveler.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })


    app.get('/tour', async (req, res) => {
      const query = {
        Email: 'mdanowerhossen727@gmail.com',
      };

      const cursor = await Traveler.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/alltour', async (req, res) => {
      const cursor = await Traveler.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/mytour/:email', async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = {
        Email: email,
      };
      const cursor = await Traveler.find(query);
      const result = await cursor.toArray();
      console.log(result);
      res.send(result);
    });

    app.put('/tour/:id', async (req, res) => {
      const Id = req.params.id;
      const accept = req.body;
      const filter = { _id: new ObjectId(Id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          name: accept.name,
          TotalVisitors: accept.TotalVisitors,
          description: accept.description,
          photo: accept.photo,
          average_cost: accept.average_cost,
          country_Name: accept.country_Name,
          seasonality: accept.seasonality,
          travel_time: accept.travel_time,
          User_Name: accept.User_Name,
          Email: accept.Email,
          location: accept.location,
        },
      };

      const result = await Traveler.updateOne(filter, updateDoc, options);

      res.send(result);
    });

    app.get(`/tour/:id`, async (req, res) => {
      const Id = req.params.id;
      const query = {
        _id: new ObjectId(Id),
      };

      const cursor = await Traveler.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/tour', async (req, res) => {
      const resultReq = req.body;
      console.log(resultReq);

      const result = await Traveler.insertOne(resultReq);
      console.log(result);
      res.send(result);
    });

    app.delete('/tour/:id', async (req, res) => {
      const Id = req.params.id;

      const query = {
        _id: new ObjectId(Id),
      };
      const result = await Traveler.deleteOne(query);

      res.send(result);
    });

    // // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

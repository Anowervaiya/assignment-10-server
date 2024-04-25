const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

// const uri =
//   `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.zsn3kat.mongodb.net/?retryWrites=true&w=majority`;

const uri = 'mongodb://0.0.0.0:27017/';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db('insertDB').collection('userCollection');

   

   
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
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

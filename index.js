const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.db('admin').command({ ping: 1 });

const db = client.db('bloodDonation');

const usersCollection = db.collection('users');

const donationRequestsCollection = db.collection('donationRequests');

const fundingCollection = db.collection('fundings');

const paymentsCollection = db.collection('payments');

    
    app.post('/api/donationRequests', async (req, res) => {
      const donation = req.body;
      const result = await donationRequestsCollection.insertOne(donation)
      res.send(result)
    });
    
    
    
    
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
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
  console.log(`Example app listening on port ${port}`);
});

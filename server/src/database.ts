const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from 'dotenv';

async function connectDB(user: String, password: String, database: string) {
  const uri = `mongodb+srv://${user}:${password}@multiplatformchat.${database}.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export { connectDB };

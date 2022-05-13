const express = require('express')
const app = express()
const port =  process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// middleware 

app.use(cors());

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x77n4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);

const run = async()=>{
    try{
        // mongodb client connected 
        await client.connect();

        // database connected (db Name doctorsportal)
        const database = await client.db("doctors_portal");
        const serviceCollection = database.collection('services');

        app.get('/service', async(req, res)=>{

            const query = {};
            const cursor = serviceCollection.find(query);
           const service = await  cursor.toArray();

           res.send(service);

           console.log("all services", service);


        })

        console.log('database connected')



    }finally{
        // some code must be run error or non error
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello From Doctors portal!')
})

app.listen(port, () => {
  console.log(`Doctors portal app listening on port ${port}`)
})
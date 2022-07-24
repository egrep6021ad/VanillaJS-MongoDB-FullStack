const {MongoClient} = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 8080;


app.use(express.json());

app.listen( PORT, ( error ) => {
  error ? console.log(error) : console.log('Backend running on port: ' + PORT);
});

app.get('/', (request, result) => {
  result.set('Content-Type', 'text/html');
  result.status(200).send('<h1>Hello World!</h1>');
});

app.post('/registration', (request, result) => {
  const data = request.body;
  console.log(request.body);
  register(data, result);
});

app.post('/login', (request, result) => {
  login(request.body, result);
});

const register = async (data, result) => {
  // Connect to mongo:
  const connection = new MongoClient('mongodb://127.0.0.1:27017/');
  // Connect to db:
  const database = connection.db('webpro');
  // Connect to collection:
  const clients = database.collection('clients');
  const query = {email: data.email};
  const output = await Promise.resolve(clients.findOne(query));
  if (output == null) {
    const client = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    clients.insertOne(client);
    result.status(200).json({message: 'Registered!'});
  } else result.status(200).json({message: 'Failed!'});
};


const login = async (data, result) => {
  // Connect to mongo:
  const connection = new MongoClient('mongodb://127.0.0.1:27017/');
  // Connect to db:
  const database = connection.db('webpro');
  // Connect to collection:
  const clients = database.collection('clients');
  // Format query:
  const query = {email: data.email};
  // Find a document based on email:
  const output = await Promise.resolve(clients.findOne(query));
  // If there isn't a document the the given email:
  if (output == null) result.status(200).json({message: 'FALSE'});
  // Else, check if passwords match:
  else if (output.password == data.password) {
    result.status(200).json({message: 'TRUE'});
  } else result.status(200).json({message: 'FALSE'});
};

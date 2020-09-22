const express = require('express');
const { graphqlHTTP }= require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@cluster0-ghaim.mongodb.net/db_skripsi?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
	console.log('connected to database');
});
 
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.use(express.static('build'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
	console.log('now listening on port ${PORT}');
});
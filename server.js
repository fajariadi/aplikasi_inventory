const express = require('express');
const { graphqlHTTP }= require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-ghaim.mongodb.net/db_skripsi?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
	console.log('connected to database');
});
 
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));
 
app.use(express.static('public'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
	console.log('now listening on port ${PORT}');
});
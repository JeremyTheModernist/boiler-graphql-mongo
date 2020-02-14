const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
const graphSchema = require("../graphql-schemas");

module.exports = app => {
	// By setting true to graphiql, we can send and receive requests from the browser alike Insomnia or Postman. We also can serve it locally and test it at http://localhost:8080/graphiql to use the console.
	app.use("/graphql", graphqlHTTP({ graphiql: true, schema: graphSchema }));
	app.use(bodyParser.json());
};

const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const schema = new GraphQLObjectType({
	name: "Author",
	fields: {
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		location: {
			type: GraphQLString
		}
	}
});

module.exports = schema;

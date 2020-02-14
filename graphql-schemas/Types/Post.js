const graphql = require("graphql");
const Models = require("../../mongo-models");
const Author = require("./Author");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const Schema = new GraphQLObjectType({
	name: "Post",
	fields: {
		title: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		author: {
			type: Author,
			resolve(parentSource, args, context, info) {
				//  return an author who's name matches args author
				console.log(
					"LOGGING SOURCE!",
					parentSource,
					"your author",
					parentSource.author
				);

				console.log("info", info);
				// so parentSource refers to your data that you save. Author is the author.
				// when you resolve it you effectively return associated data.
				// GRAPH QL is much different than Mongoose. I don't store all associated Data like posts and author together.
				// I just hold an identifying reference to author that I can use in a resolver function.
				var author = Models.Author.findOne(
					{
						author: "JOHN JOHN"
					},
					(err, doc) => {
						console.log("YOUR AUTHOR", doc);
					}
				);

				return Models.Author.findOne({ name: parentSource.author });
			}
		}
	}
});

module.exports = Schema;

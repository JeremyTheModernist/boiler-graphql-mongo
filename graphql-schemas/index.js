const graphql = require("graphql");
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt
} = graphql;

const AuthorSchema = require("./Types/Author");
const PostSchema = require("./Types/Post");
const Models = require("../mongo-models");

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		author: {
			//  This has to be a type of a LIST IN GRAPHQL
			type: AuthorSchema,
			args: {
				age: {
					type: GraphQLInt
				}
			},
			resolve(parent, args) {
				console.log("your source!", Models.Author, "args", args);
				var { Author } = Models;
				//  This has to be a type of a LIST IN GRAPHQL
				return Models.Author.findOne({ age: args.age });
			}
		},
		authors: {
			//  This has to be a type of a LIST IN GRAPHQL
			type: new GraphQLList(AuthorSchema),
			resolve(parent, args) {
				console.log("your source!", Models.Author);
				var { Author } = Models;
				//  This has to be a type of a LIST IN GRAPHQL
				return Models.Author.find({}, (err, docs) => {});
			}
		},
		post: {
			type: PostSchema,
			args: {
				title: {
					type: GraphQLString
				}
			},
			resolve(parent, args) {
				var { Post } = Models;
				return Post.findOne({ title: args.title });
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				},
				location: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parentSource, args) {
				let author = new Models.Author({
					name: args.name,
					age: args.age,
					location: args.location
				});
				console.log("saving author", author);
				return author.save();
			}
		},
		addPost: {
			type: PostSchema,
			//  use args to pass in an author name and resolve with an author object
			args: {
				title: {
					type: GraphQLString
				},
				description: {
					type: GraphQLString
				},
				name: {
					type: GraphQLString
				}
			},
			resolve(source, args) {
				console.log("SOURCE", source);
				let post = new Models.Post({
					title: args.title,
					description: args.description,
					author: args.name
				});
				console.log(post);
				return post.save();
			}
		},
		deletePost: {
			type: PostSchema,
			args: {
				title: {
					type: GraphQLString
				}
			},
			resolve(source, args) {
				console.log("source", source);
				var deletedPost = Models.Post.deleteMany(
					{ title: args.title },
					(err, doc) => {
						console.log("deleted post", doc);
						return doc;
					}
				);

				return deletedPost;
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});

module.exports = schema;

// name: {
//     type: GraphQLString,
//     resolve() {
//         return "Ernest Hemingway";
//     }
// },
// age: {
//     type: GraphQLInt,
//     resolve() {
//         return 35;
//     }
// },
// location: {
//     type: GraphQLString,
//     resolve() {
//         return "New York City";
//     }
// }

// GraphQLSchema config
// export interface GraphQLSchemaConfig extends GraphQLSchemaValidationOptions {
//   query: Maybe<GraphQLObjectType>;
//   mutation?: Maybe<GraphQLObjectType>;
//   subscription?: Maybe<GraphQLObjectType>;
//   types?: Maybe<GraphQLNamedType[]>;
//   directives?: Maybe<GraphQLDirective[]>;
//   extensions?: Maybe<Readonly<Record<string, any>>>;
//   astNode?: Maybe<SchemaDefinitionNode>;
//   extensionASTNodes?: Maybe<ReadonlyArray<SchemaExtensionNode>>;
// }

// Field Configurations:
// export interface GraphQLFieldConfig<
//   TSource,
//   TContext,
//   TArgs = { [argName: string]: any }
// > {
//   description?: Maybe<string>;
//   type: GraphQLOutputType;
//   args?: GraphQLFieldConfigArgumentMap;
//   resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
//   subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs>;
//   deprecationReason?: Maybe<string>;
//   extensions?: Maybe<Readonly<Record<string, any>>>;
//   astNode?: Maybe<FieldDefinitionNode>;
// }

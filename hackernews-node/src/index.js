const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

// const typeDefs = `
//   type Query {
//     info: String!
//     feed: [Link!]!
//   }

//   type Mutation {
//     post(url: String!, description: String!): Link!
//   }

//   type Link {
//     id: ID!
//     description: String!
//     url: String!
//   }
// `

// 1
let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL 1'
    },
    {
        id: 'link-2',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL 2'
    },
];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        // 2
        feed: () => links,
    },

    Mutation: {
        // 2
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const linksSorted = links.filter(links => links.id !== args.id);
            const updatedLink = {
                id: updatedLink.id,
                url: args.url ? args.url : updatedLink.url,
                description: args.description ? args.description : updatedLink.description,
            };
            
            links = linksSorted.push(updatedLink);
            
            return updatedLink;
        },
        deleteLink: (parent, args) => {
            const linkDeleted = links.find(link => links.id === args.id);
            links = links.filter(links => links.id !== args.id);

            return linkDeleted;
        }

    },
        // 3
        Link: {
            id: (parent) => parent.id,
            description: (parent) => parent.description,
            url: (parent) => parent.url,
        }
    }

const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, 'schema.graphql'),
            'utf8'
        ),
        resolvers,
    });

    server
    .listen()
        .then(({ url }) => console.log(`server is running on ${url}`));
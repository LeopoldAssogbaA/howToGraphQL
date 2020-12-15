const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        // 2
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany()
        },
    },

    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        },

        // updateLink: (parent, args) => {
        //     const linksSorted = links.filter(links => links.id !== args.id);
        //     const updatedLink = {
        //         id: updatedLink.id,
        //         url: args.url ? args.url : updatedLink.url,
        //         description: args.description ? args.description : updatedLink.description,
        //     };

        //     links = linksSorted.push(updatedLink);

        //     return updatedLink;
        // },
        // deleteLink: (parent, args) => {
        //     const linkDeleted = links.find(link => links.id === args.id);
        //     links = links.filter(links => links.id !== args.id);

        //     return linkDeleted;
        // }

    },
    // 3
    //     Link: {
    //         id: (parent) => parent.id,
    //         description: (parent) => parent.description,
    //         url: (parent) => parent.url,
};


const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    context: {
        prisma,
    },
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`server is running on ${url}`));
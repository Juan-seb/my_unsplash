import { ApolloServer, gql, AuthenticationError } from 'apollo-server'
import dotenv from 'dotenv'
import Image from './models/image.js'
import './connector.js'

dotenv.config()

const typeDefs = gql`
  type Image {
    label: String!
    url: String!
  }

  type Query {
    getImages: [Image!]!
  }

  type Mutation {
    addImage(label: String!, url: String!): Image!
    deleteImage(password:String!, url: String!): Image!
  }
`

const resolvers = {
  Query: {
    getImages: async () => {
      try {
        return await Image.find({})
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addImage: async (root, args) => {
      const image = new Image({ ...args })

      try {
        return await image.save()
      } catch (error) {
        console.log(error)
      }
    },
    deleteImage: async (root, args) => {
      const { password, url } = args

      if (password !== process.env.PASSWORD) throw new AuthenticationError('Invalid password')

      try {
        return await Image.deleteOne({ url })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

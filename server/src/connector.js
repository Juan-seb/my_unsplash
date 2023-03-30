import moongose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongo = await moongose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connected: ${mongo.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()

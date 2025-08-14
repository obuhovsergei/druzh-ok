import 'module-alias/register';
import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dog-walking'
const PORT = process.env.PORT || 5000

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected successfully')

    await mongoose.connection.db.admin().ping()
    console.log('MongoDB ping confirmed')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer().catch(err => {
  console.error('Server startup error:', err)
  process.exit(1)
})

const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8080

// Connect to db
connectDB()

const app = express()

// Add middleware for sending raw json
// Get data from body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome' })
}) */

// Routes - extends main route - /api/users + userRoutes route
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../frontend/build')))

	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
	})
} else {
	app.get('/login', (req, res) => {
		res.status(200).json({ message: 'Welcome to the page' })
	})
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

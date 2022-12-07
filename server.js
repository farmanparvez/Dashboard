const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


dotenv.config()

connectDB()

const Port = process.env.PORT || 6000

app.listen(Port, () => console.log('app is running on port ' + Port));
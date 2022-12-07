const mongoose = require("mongoose")

async function connectDB () {
    try {
        const db = process.env.DATABASE.replace("<password>", process.env.PASSWORD)
        const res = await mongoose.connect(db)
        console.log("Database is connected")
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1);
    }
}

module.exports = connectDB
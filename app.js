const express = require('express')
const app = express()
const dishRouter = require('./Routes/dishRouter')

app.use(express.json())
app.use('/api', dishRouter)
// app.all("*", (req, res, next) => {
//     new Error (`can't find ${req.originalUrl} on this server`)

//   });

if (process.env.NODE_ENV === "production") {
    // app.use(express.static("frontend/build"));
    app.use(express.static(path.resolve(__dirname, "Frontend", "build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
  }

module.exports = app
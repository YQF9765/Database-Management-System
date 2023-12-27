const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const jwt = require("./jwt/index")
const router = require("./routes/index")
const port = 3001


app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use('', router)

app.use(express.static(path.resolve(__dirname, 'WWW')))

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
})
require("dotenv").config();
const app = require("./src/app");
const connectDB = require('./src/db/db')

connectDB();

const port = 8000 || process.env.PORT;

app.listen(port, () => console.log(`Node server listening to port ${port}`));

require("dotenv").config();
const app = require("./src/app");
const connectDB = require('./src/db/db');
const {initSocket} = require("./src/socket/socket")

connectDB();

const port = 8000 || process.env.PORT;

const httpServer = app.listen(port, () => console.log(`Node server listening to port ${port}`));
initSocket(httpServer);


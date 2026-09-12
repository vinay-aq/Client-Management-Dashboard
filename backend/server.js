require("dotenv/config"); 
const app = require("./src/app");
const {initSocket} = require("./src/socket/socket")



const port =  process.env.PORT || 8000;
console.log("Node version:", process.version);

const httpServer = app.listen(port, () => console.log(`Node server listening to port ${port}`));
initSocket(httpServer);

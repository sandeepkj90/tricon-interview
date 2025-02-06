let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
app.use(express.json());
let port = 4000;

app.use("/users", require("./src/controller/user-controller"));

app.listen(port, () => {
	console.log(`Server stated in port ${port}`);
});

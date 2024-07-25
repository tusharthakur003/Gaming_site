require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./router/auth_router")
const contactRoute = require("./router/contact_router")
const serviceRoute = require("./router/service-router")
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error_middleware');

const PORT = 5000;

//handling cors policy issue
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true,
};

app.use(cors(corsOptions));



app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);


app.use(errorMiddleware);

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port ${PORT}`);
    })
})

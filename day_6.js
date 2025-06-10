console.log("Hallo Developes");
const express = require('express');
const app = express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hallo Developers");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

// console.log("Hallo Developers");
// const express = require('express');
// const app = express();

// Middleware (optional, only if needed for JSON payloads)
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("Hallo Developers");
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

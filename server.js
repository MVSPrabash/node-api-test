const express = require('express');
const app = express();

app.use(express.json());
const userRoutes = require('./routes/user.routes.js');
app.use("/api/users", userRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


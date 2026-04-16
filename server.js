require('dotenv').config();

const express = require('express');
const app = express();

app.set('query parser', 'extended');

const { logger } = require('./middleware/logger.middleware.js');

app.use(express.json());
app.use(logger);

const userRoutes = require('./routes/user.routes.js');
app.use("/api/users", userRoutes);

const authRoutes = require('./routes/auth.routes.js');
app.use("/api/auth", authRoutes);

app.get('/reset-password', (req, res) => {
  const { token } = req.query;

  res.send(`
    <form method="POST" action="/api/reset-password">
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="newPassword" placeholder="New Password" />
      <button type="submit">Reset Password</button>
    </form>
  `);
});

const { errorHandler } = require('./middleware/error.middleware.js');
app.use(errorHandler);

const { connectDB } = require('./config/db.js');
connectDB();

app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: ['/products', '/users', '/posts'],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

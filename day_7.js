// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Load product data from localAPI.json
const dataPath = path.join(__dirname, 'localAPI.json');

const readProducts = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});


app.post('/api/products', (req, res) => {
  try {
    const { brand, title, price, original_price, sizes, image } = req.body;

    if (!brand || !title || !price || !original_price || !sizes || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

  
    if (
      typeof brand !== 'string' ||
      typeof title !== 'string' ||
      typeof price !== 'number' ||
      typeof original_price !== 'number' ||
      !Array.isArray(sizes) ||
      typeof image !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid data types in request' });
    }

    const products = readProducts();


    const newProduct = {
      id: products.length + 1,
      brand,
      title,
      price,
      original_price,
      sizes,
      image
    };

    
    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');

   
    res.status(201).json(newProduct);

  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Product API running at http://localhost:${PORT}/api/products`);
});

const express = require('express');
const path = require('path');

const app = express();

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));
app.use(express.json());

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

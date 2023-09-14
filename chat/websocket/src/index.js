const express = require('express');

const app = express();

const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const PORT = 4000;

app.use(express.static(PUBLIC_DIR_PATH));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

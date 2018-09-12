const express = require('express');
const path = require('path');

const app = express();

const static_dir = path.join(__dirname, 'dist');

app.use(express.static(static_dir));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, () => {
    process.stdout.write('Server is listen on port 3000');
});

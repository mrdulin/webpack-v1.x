import express from 'express';
import path from 'path';

import index from './index';
import page from './page';

const app = express();

const static_dir = path.resolve('client/dist');
console.log(static_dir);
app.use(express.static(static_dir));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/dist/index.html'));
});

app.listen(4000, (err) => {
    if(err) {
        console.error(err);
    } else {
        console.log("Listening on port 4000...");
    }
});

/* server.js */
import express from 'express';
import { getData,scheduledTask, getDb } from './routes/routes.js';
import cron from 'node-cron';

const app = express();

app.use(express.static('public'));
app.use(express.static('public', { index: 'html/index.html' }));


app.get('/getdata', getData);
app.get('/getdb', getDb);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

cron.schedule('*/1 * * * *', scheduledTask);
/* server.js */
import express from 'express';
import { getDataRouteHandler,scheduledTask } from './routes/routes.js';
import cron from 'node-cron';
const app = express();

app.use(express.static('public'));

app.get('/getdata', getDataRouteHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

cron.schedule('*/1 * * * *', scheduledTask);
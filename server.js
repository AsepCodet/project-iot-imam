/* server.js */
import express from 'express';
import { getDataRouteHandler } from './routes/routes.js';
const app = express();

app.use(express.static('public'));

app.get('/getData', getDataRouteHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
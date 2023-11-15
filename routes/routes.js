/* routes.js */
import { getStreamData } from '../db/dataController.js';

async function getDataRouteHandler(req, res) {
  try {
    const data = await getStreamData('test/Data');
    res.json(data);
    //res.write(`data: ${JSON.stringify(data)}\n\n`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getDataRouteHandler };

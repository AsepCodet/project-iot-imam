/* routes.js */
import { getStreamData, pushData } from '../db/dataController.js';

async function getDataRouteHandler(req, res) {
  try {
    const data = await getStreamData('imam/Data');
    res.json(data);
    //res.write(`data: ${JSON.stringify(data)}\n\n`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function scheduledTask() {
  try {
    const currentMinute = new Date().getMinutes();
    if (currentMinute%5===0){
      console.log('Fetching data...');
      const data = await getStreamData('imam/Data');
      console.log('Data fetched:', data);
      console.log('Pushing data to Firebase...');
      pushData('DB/', data);
      console.log('Scheduled task is running...');
    }    
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
}

export { getDataRouteHandler, scheduledTask };


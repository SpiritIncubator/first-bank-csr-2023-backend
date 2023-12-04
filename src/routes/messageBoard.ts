import express from 'express';
import updateSpreadSheet from '../utils/updateSpreadSheet';
import getMessageListFromSheet from '../utils/getMessageFromSheet';
const router = express.Router();


router.get('/messages', async (req, res) => {
  try {
    const messageList = await getMessageListFromSheet()
    console.timeEnd('message api')
    res.status(200).json(messageList);
  } catch (error) {
    console.log('error :', error);
    res.status(500).json({ success: false, message: 'Error when retrieving messages.' });
  }
})

router.post('/createMessage', async (req, res) => {
  const { name, message, color = '', keepTop = false } = req.body;
  try {
    await updateSpreadSheet(name, message, color, keepTop)
    res.status(200).json({ success: true, message: 'Message stored successfully.' });
  } catch (error) {
    console.log('error :', error);
    res.status(500).json({ success: false, message: 'Error when storing the message.' });
  }

})


// @todo: remove redis logic once we make sure the google sheet is working
// router.get('/', async (req, res) => {
//   try {
//     // Fetch all keys that match the message pattern
//     const keys = await redisClient.keys('message:*');

//     // Retrieve and parse each message concurrently
//     const messagePromises = keys.map(async key => {
//       const messageJson = await redisClient.get(key);
//       return messageJson ? JSON.parse(messageJson) : null;
//     });

//     const messages = (await Promise.all(messagePromises)).filter(m => m); // Filter out null values

//     // Sort messages by timestamp
//     messages.sort((a, b) => a.timestamp - b.timestamp);

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log('error :', error);
//     res.status(500).json({ success: false, message: 'Error retrieving messages.' });
//   }
// });

// @todo: remove redis logic once we make sure the google sheet is working
// router.post('/', async (req, res) => {
//   const { name, message } = req.body;
//   const timestamp = Date.now();
//   const oneMonthInSeconds = 30 * 24 * 60 * 60;
//   const uniqueKey = `message:${name}:${timestamp}`;

//   if (name && message) {
//     try {
//       await redisClient.set(uniqueKey, JSON.stringify({ name, message, timestamp }), {
//         EX: oneMonthInSeconds
//       });

//       res.status(200).json({ success: true, message: 'Message stored successfully.' });
//     } catch (error) {
//       console.log('error :', error);
//       res.status(500).json({ success: false, message: 'Error storing the message.' });
//     }
//   } else {
//     res.status(400).json({ success: false, message: 'Name and message are required.' });
//   }
// });


export default router;
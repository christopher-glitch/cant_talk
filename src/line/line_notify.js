const axios = require('axios');
const { getMode } = require('../mode/talk_mode');

const name = 'test'
const LINE_NOTIFY_TOKEN = 'linenotifytoken';
const END_POINT = 'https://notify-api.line.me/api/notify';

const sendMessageToLineNotify = async () => {

	const message = (getMode() === 'cant')? `${name}さんは現在会話ができません。お静かにしてください。`:
																					`${name}さんは会話ができるようになりました。`

	try {
		await axios.post(
			END_POINT,
			{ message },
			{ headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
				},
			}
		);
	} catch (error) {
		console.error('Error sending message to Line Notify:', error.message);
	}
};

exports.sendMessageToLineNotify = sendMessageToLineNotify;


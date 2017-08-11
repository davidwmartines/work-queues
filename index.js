const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 3001));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
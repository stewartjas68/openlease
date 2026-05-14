const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/units', (req, res) => {
  res.json([
    {
      unit: '1-1',
      tenant: 'Sarah Johnson',
      rent: 1450,
      status: 'Occupied'
    },
    {
      unit: '1-2',
      tenant: 'Vacant',
      rent: 1500,
      status: 'Available'
    },
    {
      unit: '2-4',
      tenant: 'Mike Thompson',
      rent: 1675,
      status: 'Occupied'
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`OpenLease running at http://localhost:${PORT}`);
});
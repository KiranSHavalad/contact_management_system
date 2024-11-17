const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "root",
  database: "contact"
});

app.post('/contact', (req, res) => {
  const { firstname, lastname, email, phone, company, jobtitle } = req.body;
  const checkQuery = 'SELECT * FROM contactlist WHERE email = ? OR phone = ?';
  db.query(checkQuery, [email, phone], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: 'Contact with this email or phone already exists' });
    }

    const insertQuery = 'INSERT INTO contactlist(firstname, lastname, email, phone, company, jobtitle) VALUES(?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [firstname, lastname, email, phone, company, jobtitle], (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add contact' });
      }
      res.status(200).json({ message: 'Contact added successfully' });
    });
  });
});

app.put('/contact/update', (req, res) => {
  const { id, firstname, lastname, email, phone, company, jobtitle } = req.body;

  const updateQuery = 'UPDATE contactlist SET firstname = ?, lastname = ?, email = ?, phone = ?, company = ?, jobtitle = ? WHERE id = ?';
  db.query(updateQuery, [firstname, lastname, email, phone, company, jobtitle, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update contact' });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  });
});

app.delete('/contact/delete', (req, res) => {
  const { id } = req.body;

  const deleteQuery = 'DELETE FROM contactlist WHERE id = ?';
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete contact' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  });
});

app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contactlist';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
    res.status(200).json(result);
  });
});

app.listen(8088, () => {
  console.log("Server started on port 8088");
});

const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database');
const { nanoid } = require('nanoid');

app.use(cors());
app.use(express.json());

app.post('/share', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await pool.query(
      'SELECT * FROM "user" WHERE name=$1 AND email=$2',
      [name, email]
    );
    if (user.rows.length > 0) {
      let key = nanoid(10);
      await pool.query(
        'INSERT INTO "invitation" (key, email, state) VALUES ($1, $2, $3)',
        [key, email, 'unused']
      );
      res.json({
        status: 'user found',
        link: `http://localhost:3000/register/${key}`,
      });
    } else {
      res.json({ status: 'not found' });
    }
  } catch (err) {}
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, gender, address, key } = req.body;
    const invitation = await pool.query(
      'SELECT * FROM "invitation" WHERE key=$1',
      [key]
    );
    if (invitation.rows.length > 0) {
      if (invitation.rows[0].state === 'unused') {
        await pool.query('UPDATE "invitation" SET state=$1 WHERE key=$2', [
          'used',
          key,
        ]);
        await pool.query(
          'INSERT INTO "user" (name, email, gender, address) VALUES ($1, $2, $3, $4)',
          [name, email, gender, address]
        );
        res.json({ status: 'success' });
      } else {
        res.json({ status: 'already used' });
      }
    } else {
      res.json({ status: 'invalid invitation' });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/management', async (req, res) => {
  try {
    const userList = await pool.query('SELECT * FROM "user"');
    const invitationList = await pool.query(
      'SELECT * FROM "invitation" WHERE state=$1',
      ['used']
    );
    const managementDict = {};
    invitationList.rows.forEach((i) => {
      if (i.email in managementDict) {
        managementDict[i.email].invitations += 1;
      } else {
        managementDict[i.email] = {
          name: userList.rows.find((u) => u.email === i.email).name,
          invitations: 1,
        };
      }
    });
    let managementList = [];
    for (var key in managementDict) {
      managementList.push(managementDict[key]);
    }

    managementList = managementList.sort((a, b) =>
      a.invitations > b.invitations ? -1 : 1
    );

    res.json({ data: managementList });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3100, () => {
  console.log('back-end running on port 3100');
});

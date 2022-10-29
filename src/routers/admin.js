const express = require('express');
const Admin = require('../models/admin');
const auth = require('../authentication/auth');

const router = new express.Router();

router.post('/register', async (req, res) => {
  const admin = new Admin({ ...req.body });
  try {
    await admin.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send('Please authenticate');
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await Admin.findAdmin(req.body);
    res.status(200).send({ token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/user', auth, async (req, res) => {
  res.send();
});

module.exports = router;

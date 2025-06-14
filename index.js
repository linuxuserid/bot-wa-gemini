import qrcode from 'qrcode-terminal';
// ❌ Hapus ini
// import { Client, LocalAuth } from 'whatsapp-web.js';

// ✅ Ganti dengan ini
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth()
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Scan QR dengan WhatsApp kamu!');
});

client.on('ready', () => {
  console.log('🤖 Bot sudah aktif!');
});

client.on('message', async (message) => {
  const prompt = message.body;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    message.reply(response);
  } catch (err) {
    message.reply('Maaf, terjadi kesalahan dari AI.');
    console.error(err);
  }
});

client.initialize();
// Tambahkan ini di bawah client.initialize()
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🤖 Bot WA Gemini aktif!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});


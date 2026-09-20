const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const FREEIMAGE_KEY = process.env.FREEIMAGE_API_KEY || '6d207e02198a847aa98d0a2a901485a5';
const FREEIMAGE_URL = 'https://freeimage.host/api/1/upload';

router.post('/image', async (req, res) => {
  try {
    const { source, description } = req.body;
    if (!source) {
      return res.status(400).json({ error: 'source es requerido (base64 o URL)' });
    }

    const sizeMB = source.startsWith('data:')
      ? (Buffer.byteLength(source.replace(/^data:[^;]+;base64,/, ''), 'base64') / 1024 / 1024).toFixed(1)
      : 0;

    console.log(`Upload: ${sizeMB}MB | preset: ${description || 'default'}`);

    if (sizeMB > 30) {
      return res.status(413).json({ error: `Imagen demasiado grande (${sizeMB}MB). Máximo 30MB.` });
    }

    const formData = new FormData();
    formData.append('key', FREEIMAGE_KEY);
    formData.append('format', 'json');
    formData.append('action', 'upload');

    if (source.startsWith('data:')) {
      const base64Clean = source.replace(/^data:[^;]+;base64,/, '');
      formData.append('source', base64Clean);
      formData.append('type', 'file');
    } else {
      formData.append('source', source);
      formData.append('type', 'url');
    }

    const response = await fetch(FREEIMAGE_URL, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
      redirect: 'follow',
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Non-JSON response from freeimage:', text.substring(0, 200));
      return res.status(502).json({ error: 'freeimage.host no retornó JSON válido' });
    }

    if (data.status_code !== 200) {
      console.error('Freeimage error:', data);
      return res.status(500).json({ error: data.error?.message || data.status_txt || 'Error al subir imagen' });
    }

    res.json({
      url: data.image.url,
      urlViewer: data.image.url_viewer,
      thumb: data.image.thumb?.url || data.image.url,
      medium: data.image.medium?.url || data.image.url,
      width: data.image.width,
      height: data.image.height,
      size: data.image.size,
      id: data.image.id_encoded,
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

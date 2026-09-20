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

    const isBase64 = source.startsWith('data:');
    const mimeMatch = isBase64 ? source.match(/^data:([^;]+);base64/) : null;
    const format = mimeMatch ? mimeMatch[1].split('/')[1]?.toUpperCase() : 'URL';

    const sizeMB = isBase64
      ? (Buffer.byteLength(source.replace(/^data:[^;]+;base64,/, ''), 'base64') / 1024 / 1024)
      : 0;
    const sizeFormatted = sizeMB >= 1 ? `${sizeMB.toFixed(1)}MB` : `${(sizeMB * 1024).toFixed(0)}KB`;

    console.log(`[Upload] Recibido: ${sizeFormatted} | formato: ${format} | preset: ${description || 'default'}`);

    if (sizeMB > 30) {
      return res.status(413).json({
        error: `Imagen demasiado grande (${sizeFormatted}). Máximo permitido: 30MB.`,
        received: { size: sizeFormatted, format },
      });
    }

    const formData = new FormData();
    formData.append('key', FREEIMAGE_KEY);
    formData.append('format', 'json');
    formData.append('action', 'upload');

    if (isBase64) {
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
      console.error('[Upload] freeimage retornó:', text.substring(0, 300));
      return res.status(502).json({
        error: `freeimage.host no retornó JSON válido (HTTP ${response.status})`,
        received: { size: sizeFormatted, format },
      });
    }

    if (data.status_code !== 200) {
      const fiError = data.error?.message || data.error?.code || data.status_txt || 'Error desconocido';
      console.error(`[Upload] freeimage rechazó: ${fiError}`);
      return res.status(500).json({
        error: `freeimage.host rechazó: ${fiError}`,
        received: { size: sizeFormatted, format },
        suggestion: sizeMB > 10
          ? 'La imagen es muy grande. Intenta reducir calidad o dimensiones.'
          : 'Intenta con otra imagen o formato.',
      });
    }

    console.log(`[Upload] ✓ ${data.image.width}x${data.image.height} | ${data.image.size} bytes`);

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
    console.error('[Upload] Error:', err.message);
    res.status(500).json({
      error: `Error del servidor: ${err.message}`,
      suggestion: 'Verifica tu conexión e intenta de nuevo.',
    });
  }
});

module.exports = router;

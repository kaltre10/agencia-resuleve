const IMAGE_PRESETS = {
  hero:     { width: 600,  height: 600,  quality: 0.85, format: 'image/jpeg', maxSizeKB: 120, fit: 'contain' },
  carousel: { width: 1200, height: 400,  quality: 0.82, format: 'image/jpeg', maxSizeKB: 250, fit: 'cover' },
  offer:    { width: 800,  height: 400,  quality: 0.82, format: 'image/jpeg', maxSizeKB: 200, fit: 'cover' },
  footer:   { width: 600,  height: 200,  quality: 0.80, format: 'image/jpeg', maxSizeKB: 100, fit: 'contain' },
  logo:     { width: 400,  height: 400,  quality: 0.85, format: 'image/jpeg', maxSizeKB: 100, fit: 'contain' },
  thumb:    { width: 400,  height: 400,  quality: 0.80, format: 'image/jpeg', maxSizeKB: 80, fit: 'cover' },
  favicon:  { width: 128,  height: 128,  quality: 0.90, format: 'image/png',  maxSizeKB: 30, fit: 'contain' },
};

function generateSEOFilename(description) {
  const slug = (description || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `img-${slug || 'upload'}-${Date.now()}`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function drawToCanvas(img, config) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const targetRatio = config.width / config.height;
  const sourceRatio = img.width / img.height;

  if (config.fit === 'cover') {
    let sx = 0, sy = 0, sw = img.width, sh = img.height;

    if (sourceRatio > targetRatio) {
      sw = img.height * targetRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / targetRatio;
      sy = (img.height - sh) / 2;
    }

    canvas.width = config.width;
    canvas.height = config.height;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, config.width, config.height);
  } else {
    let drawW, drawH;

    if (sourceRatio > targetRatio) {
      drawW = config.width;
      drawH = config.width / sourceRatio;
    } else {
      drawH = config.height;
      drawW = config.height * sourceRatio;
    }

    canvas.width = config.width;
    canvas.height = config.height;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, config.width, config.height);

    if (config.format === 'image/png') {
      // Transparente para PNG
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, config.width, config.height);
    }

    const offsetX = (config.width - drawW) / 2;
    const offsetY = (config.height - drawH) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  return canvas;
}

async function compressWithRetry(canvas, config) {
  const steps = [config.quality, 0.75, 0.6, 0.45, 0.3];

  for (let i = 0; i < steps.length; i++) {
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => {
        if (!b) return reject(new Error('Error al comprimir'));
        resolve(b);
      }, config.format, steps[i]);
    });

    if (blob.size <= config.maxSizeKB * 1024 || i === steps.length - 1) {
      return { blob, quality: steps[i] };
    }
  }
}

export function optimizeImage(file, preset = 'carousel', description = '') {
  const config = IMAGE_PRESETS[preset] || IMAGE_PRESETS.carousel;

  if (!IMAGE_PRESETS[preset]) {
    console.warn(`Preset "${preset}" no existe. Usando "carousel".`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const canvas = drawToCanvas(img, config);
          const { blob, quality } = await compressWithRetry(canvas, config);

          const ext = config.format === 'image/png' ? '.png' : '.jpg';
          const optimizedFile = new File(
            [blob],
            generateSEOFilename(description) + ext,
            { type: config.format, lastModified: Date.now() }
          );

          resolve({
            file: optimizedFile,
            width: config.width,
            height: config.height,
            fit: config.fit,
            originalWidth: img.width,
            originalHeight: img.height,
            preset,
            size: blob.size,
            sizeFormatted: formatBytes(blob.size),
            originalSize: file.size,
            originalSizeFormatted: formatBytes(file.size),
            compressionRatio: ((1 - blob.size / file.size) * 100).toFixed(1),
          });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.readAsDataURL(file);
  });
}

export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function generateAltText(description, title) {
  const parts = [];
  if (title) parts.push(title);
  if (description) parts.push(description);
  if (parts.length === 0) parts.push('Imagen promocional de lotería');
  return parts.join(' - ');
}

export { IMAGE_PRESETS };

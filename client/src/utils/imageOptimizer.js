const IMAGE_PRESETS = {
  hero:     { width: 1920, height: 800,  quality: 0.80, format: 'image/jpeg', maxSizeKB: 400 },
  carousel: { width: 1200, height: 400,  quality: 0.82, format: 'image/jpeg', maxSizeKB: 250 },
  offer:    { width: 800,  height: 400,  quality: 0.82, format: 'image/jpeg', maxSizeKB: 200 },
  footer:   { width: 600,  height: 200,  quality: 0.80, format: 'image/jpeg', maxSizeKB: 100 },
  logo:     { width: 400,  height: 400,  quality: 0.85, format: 'image/jpeg', maxSizeKB: 100 },
  thumb:    { width: 400,  height: 400,  quality: 0.80, format: 'image/jpeg', maxSizeKB: 80 },
  favicon:  { width: 128,  height: 128,  quality: 0.90, format: 'image/png',  maxSizeKB: 30 },
};

function generateSEOFilename(description, prefix = 'img') {
  const slug = (description || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `${prefix}-${slug || 'upload'}-${Date.now()}`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function compressToTarget(canvas, config, attempt = 0) {
  const qualities = [config.quality, config.quality - 0.1, config.quality - 0.2, 0.5, 0.3];
  const quality = qualities[Math.min(attempt, qualities.length - 1)];

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error('Error al comprimir imagen'));
        resolve({ blob, quality });
      },
      config.format,
      quality
    );
  });
}

export function optimizeImage(file, preset = 'carousel', description = '') {
  return new Promise((resolve, reject) => {
    const config = IMAGE_PRESETS[preset] || IMAGE_PRESETS.carousel;

    if (!IMAGE_PRESETS[preset]) {
      console.warn(`Preset "${preset}" no existe. Usando "carousel".`);
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const sourceRatio = img.width / img.height;
          const targetRatio = config.width / config.height;

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

          let result = await compressToTarget(canvas, config, 0);
          let blob = result.blob;

          while (blob.size > config.maxSizeKB * 1024 && result.quality > 0.15) {
            result = await compressToTarget(canvas, config, Math.round((config.quality - result.quality) / 0.1) + 1);
            blob = result.blob;
          }

          if (blob.size > 10 * 1024 * 1024) {
            return reject(new Error(`No se pudo comprimir a menos de ${config.maxSizeKB}KB. Intenta con una imagen más pequeña.`));
          }

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

const IMAGE_PRESETS = {
  carousel: { width: 1200, height: 400, quality: 0.82, format: 'image/jpeg' },
  offer: { width: 800, height: 400, quality: 0.82, format: 'image/jpeg' },
  thumb: { width: 400, height: 400, quality: 0.8, format: 'image/jpeg' },
};

function generateSEOFilename(description, prefix = 'img') {
  const slug = description
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `${prefix}-${slug || 'upload'}-${Date.now()}`;
}

function detectImageType(file) {
  if (file.type === 'image/png') return 'image/png';
  if (file.type === 'image/webp') return 'image/webp';
  if (file.type === 'image/gif') return 'image/gif';
  return 'image/jpeg';
}

export function optimizeImage(file, preset = 'carousel', description = '') {
  return new Promise((resolve, reject) => {
    const config = IMAGE_PRESETS[preset] || IMAGE_PRESETS.carousel;
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
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

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Error al comprimir imagen'));
            const optimizedFile = new File(
              [blob],
              generateSEOFilename(description) + '.jpg',
              { type: config.format, lastModified: Date.now() }
            );
            resolve({
              file: optimizedFile,
              width: config.width,
              height: config.height,
              originalWidth: img.width,
              originalHeight: img.height,
              size: blob.size,
              sizeFormatted: formatBytes(blob.size),
              compressionRatio: ((1 - blob.size / file.size) * 100).toFixed(1),
            });
          },
          config.format,
          config.quality
        );
      };
      img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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

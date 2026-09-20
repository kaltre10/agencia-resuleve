import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Loader2, ImageIcon, Check, AlertTriangle } from 'lucide-react';
import { optimizeImage, readFileAsBase64, IMAGE_PRESETS } from '@/utils/imageOptimizer';
import { uploadImage } from '@/services/imageUpload';

const PRESET_LABELS = {
  hero: '600x600 • Hero (logo/mascota)',
  carousel: '1200x400 • Carrusel',
  offer: '800x400 • Ofertas',
  footer: '600x200 • Footer/logo',
  logo: '400x400 • Logo cuadrado',
  thumb: '400x400 • Miniatura',
  favicon: '128x128 • Favicon',
};

const ACCEPTED = 'image/jpeg,image/png,image/webp,image/gif';

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileMeta(file) {
  const ext = file.name.split('.').pop()?.toUpperCase() || '?';
  return `${ext} • ${formatBytes(file.size)}`;
}

const ImageUploader = ({ preset = 'carousel', description = '', onUploaded, currentUrl, label = 'Imagen' }) => {
  const [preview, setPreview] = useState(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(currentUrl || null);
    setResult(null);
    setError(null);
    setProgress('');
  }, [currentUrl]);

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError(`Formato no válido: ${file?.name || 'desconocido'} • Solo JPG, PNG, WEBP`);
      return;
    }

    const config = IMAGE_PRESETS[preset] || IMAGE_PRESETS.carousel;
    const fileMeta = getFileMeta(file);

    setError(null);
    setResult(null);
    setUploading(true);

    try {
      setProgress(`Leyendo ${fileMeta}...`);
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      setProgress(`Optimizando ${fileMeta} → ${config.width}x${config.height} (${config.fit})...`);
      const optimized = await optimizeImage(file, preset, description || file.name);

      const ratio = ((1 - optimized.size / file.size) * 100).toFixed(0);
      setProgress(
        `Optimizada: ${optimized.originalWidth}x${optimized.originalHeight} ${formatBytes(file.size)} → ` +
        `${optimized.width}x${optimized.height} ${optimized.sizeFormatted} (-${ratio}%)`
      );

      setProgress(`Subiendo ${optimized.sizeFormatted} a freeimage.host...`);
      const base64 = await readFileAsBase64(optimized.file);
      const uploaded = await uploadImage(base64, description || file.name);

      setResult(uploaded);
      setPreview(uploaded.url);
      setProgress(
        `✓ ${uploaded.width}x${uploaded.height} | ${optimized.sizeFormatted} | ${preset}`
      );
      onUploaded?.(uploaded.url);
    } catch (err) {
      const config2 = IMAGE_PRESETS[preset] || IMAGE_PRESETS.carousel;
      let msg = err.message;

      if (msg.includes('Internal') || msg.includes('500')) {
        msg = `Error del servidor: ${fileMeta}. ` +
              `Imagen optimizada a ${config2.width}x${config2.height}, máx ${config2.maxSizeKB}KB. ` +
              `Intenta con otra imagen o reduce el tamaño original.`;
      } else if (msg.includes('413') || msg.includes('demasiado grande')) {
        msg = `Imagen demasiado grande (${fileMeta}). Máx permitido: 30MB. ` +
              `Tu imagen: ${file.name} (${formatBytes(file.size)}).`;
      }

      setError(msg);
      setProgress('');
    } finally {
      setUploading(false);
    }
  }, [preset, description, onUploaded]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragOver(false), []);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  const handleRemove = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress('');
    onUploaded?.('');
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-on-surface-variant uppercase font-bold block">{label}</label>

      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-surface-container-highest hover:border-primary/50 hover:bg-surface-container-low'
          }`}
        >
          <Upload className="size-8 text-on-surface-variant" />
          <div className="text-center">
            <p className="text-sm text-on-surface font-medium">Arrastra una imagen aquí</p>
            <p className="text-xs text-on-surface-variant mt-1">o haz clic para seleccionar</p>
          </div>
          <p className="text-[10px] text-on-surface-variant">
            {PRESET_LABELS[preset] || preset} • JPG, PNG, WEBP • Máx 30MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-surface-container-highest">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <button
              onClick={handleRemove}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-red-500/80 text-white transition-all cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </div>
          {result && (
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
              <Check className="size-3 text-green-400" />
              <span className="text-[10px] text-green-400 font-medium">Optimizada y subida</span>
            </div>
          )}
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
          <Loader2 className="size-4 text-primary animate-spin" />
          <span className="text-xs text-primary font-medium">{progress}</span>
        </div>
      )}

      {progress && !uploading && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
          <Check className="size-3.5 text-primary" />
          <span className="text-[10px] text-on-surface-variant">{progress}</span>
        </div>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 space-y-1">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="size-3.5 text-red-500 shrink-0" />
            <span className="text-xs text-red-500 font-medium">Error al subir imagen</span>
          </div>
          <span className="text-[11px] text-red-400 leading-relaxed block">{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

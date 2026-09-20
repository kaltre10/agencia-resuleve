import { useState, useRef } from 'react';
import { Link, Upload, X, FileText } from 'lucide-react';
import { uploadImage } from '@/services/imageUpload';
import { readFileAsBase64 } from '@/utils/imageOptimizer';

const DocumentUploader = ({ description = '', currentUrl, onUploaded, label = 'Documento' }) => {
  const [mode, setMode] = useState(currentUrl ? 'url' : 'url');
  const [urlValue, setUrlValue] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleUrlSubmit = () => {
    setError(null);
    if (!urlValue.trim()) {
      onUploaded?.('');
      return;
    }
    let url = urlValue.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    onUploaded?.(url);
  };

  const handleFile = async (file) => {
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';

    if (!isImage && !isPDF) {
      setError(`Formato no valido: "${file.name}". Solo imagenes (JPG, PNG) o PDF.`);
      return;
    }

    setError(null);
    setUploading(true);
    setFileName(file.name);

    try {
      const base64 = await readFileAsBase64(file);
      const uploaded = await uploadImage(base64, description || file.name);
      onUploaded?.(uploaded.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = '';
  };

  const handleRemove = () => {
    setUrlValue('');
    setFileName('');
    setError(null);
    onUploaded?.('');
  };

  return (
    <div className="space-y-3">
      <label className="text-xs text-on-surface-variant uppercase font-bold block">{label}</label>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            mode === 'url'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          <Link className="size-3" />
          URL
        </button>
        <button
          onClick={() => setMode('file')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            mode === 'file'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          <Upload className="size-3" />
          Subir archivo
        </button>
      </div>

      {mode === 'url' ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onBlur={handleUrlSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
            placeholder="https://ejemplo.com/terminos.pdf"
            className="flex-1 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
          />
          {urlValue && (
            <button
              onClick={handleRemove}
              className="p-2.5 rounded-xl bg-surface-container-high hover:bg-red-500/20 text-on-surface-variant hover:text-red-500 transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      ) : (
        <div>
          {fileName && !uploading ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-surface-container-highest">
              <FileText className="size-4 text-primary shrink-0" />
              <span className="text-xs text-on-surface truncate flex-1">{fileName}</span>
              <button
                onClick={handleRemove}
                className="p-1 rounded-lg hover:bg-red-500/20 text-on-surface-variant hover:text-red-500 transition-all cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-surface-container-highest hover:border-primary/50 cursor-pointer transition-all"
            >
              <Upload className="size-6 text-on-surface-variant" />
              <div className="text-center">
                <p className="text-xs text-on-surface font-medium">
                  {uploading ? 'Subiendo...' : 'Click para seleccionar'}
                </p>
                <p className="text-[10px] text-on-surface-variant mt-0.5">JPG, PNG o PDF</p>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
          <div className="size-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-primary font-medium">Subiendo archivo...</span>
        </div>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10">
          <span className="text-xs text-red-500 font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;

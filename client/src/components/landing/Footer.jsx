import useLandingStore from '@/store/landingStore';

const socialIcons = {
  instagram: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  facebook: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tiktok: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
};

const Footer = () => {
  const { settings } = useLandingStore();
  const socials = [
    { key: 'instagram', label: 'Instagram', value: settings.instagram, url: settings.instagram?.startsWith('http') ? settings.instagram : settings.instagram ? `https://instagram.com/${settings.instagram.replace('@', '')}` : '' },
    { key: 'facebook', label: 'Facebook', value: settings.facebook, url: settings.facebook?.startsWith('http') ? settings.facebook : settings.facebook ? `https://facebook.com/${settings.facebook}` : '' },
    { key: 'tiktok', label: 'TikTok', value: settings.tiktok, url: settings.tiktok?.startsWith('http') ? settings.tiktok : settings.tiktok ? `https://tiktok.com/${settings.tiktok.replace('@', '')}` : '' },
  ].filter((s) => s.value);

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-surface-container-lowest border-t border-surface-container-highest" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {settings.favicon ? (
                <img src={settings.favicon} alt={settings.appName} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm" aria-hidden="true">
                  RL
                </div>
              )}
              <span className="text-sm font-bold text-on-surface uppercase tracking-tight">
                {settings.appName}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {settings.footerDescription}
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Loterias disponibles">
            <span className="text-xs text-on-surface uppercase font-bold">Loterias Disponibles</span>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li>
                <a href="https://www.lottoactivo.com/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                  Lotto Activo
                </a>
              </li>
              <li>
                <a href="https://lagranjita.com/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                  La Granjita
                </a>
              </li>
              <li>
                <a href="https://www.nacionalloteria.com/venezuela/triples-venezuela.php" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                  Triples Nacionales
                </a>
              </li>
              <li>
                <a href="https://resultadosvenezuela.com/lottery/triple-chance" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                  Chance Triple
                </a>
              </li>
              <li>
                <a href="https://lagranjita.com/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                  Animalitos
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs text-on-surface uppercase font-bold">Contacto</span>
            <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
              <li>WhatsApp: +{settings.whatsappNumber}</li>
              <li>Atencion: 24/7</li>
              <li>Venezuela</li>
            </ul>
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-all"
                    aria-label={`Siguenos en ${s.label}`}
                  >
                    {socialIcons[s.key]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-surface-container-highest pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-on-surface-variant">
            &copy; 2026 {settings.appName}. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-4">
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
              href={settings.termsUrl || '#'}
              target={settings.termsUrl ? '_blank' : undefined}
              rel={settings.termsUrl ? 'noopener noreferrer' : undefined}
              aria-label="Terminos y condiciones"
            >
              Terminos y Condiciones
            </a>
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
              href={settings.privacyUrl || '#'}
              target={settings.privacyUrl ? '_blank' : undefined}
              rel={settings.privacyUrl ? 'noopener noreferrer' : undefined}
              aria-label="Politica de privacidad"
            >
              Politica de Privacidad
            </a>
            <a
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
              href={settings.responsibleUrl || '#'}
              target={settings.responsibleUrl ? '_blank' : undefined}
              rel={settings.responsibleUrl ? 'noopener noreferrer' : undefined}
              aria-label="Juego responsable"
            >
              Juego Responsable
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

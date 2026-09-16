import { MessageCircle } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const WhatsAppFloat = () => {
  const { settings } = useLandingStore();

  return (
    <a
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25d366] hover:bg-[#1da851] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:shadow-[0_0_50px_rgba(37,211,102,0.9)] transition-all transform hover:scale-110"
      href={`https://wa.me/${settings.whatsappNumber}?text=Hola,%20vengo%20desde%20la%20web.%20Quiero%20hacer%20una%20jugada.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="size-8 animate-pulse" />
    </a>
  );
};

export default WhatsAppFloat;

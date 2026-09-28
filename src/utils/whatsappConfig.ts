import { PROFILE_DATA } from '../data/portfolioData';

const WHATSAPP_STORAGE_KEY = 'habibur_portfolio_whatsapp_v2';

export interface WhatsAppConfig {
  phoneNumber: string;
  defaultMessage: string;
}

export function getWhatsAppConfig(): WhatsAppConfig {
  try {
    const raw = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.phoneNumber === 'string' && parsed.phoneNumber.trim().length >= 8) {
        return {
          phoneNumber: parsed.phoneNumber.replace(/[^0-9]/g, ''),
          defaultMessage:
            parsed.defaultMessage ||
            "Hi Habibur! I visited your portfolio and would love to discuss a video editing or graphic design project."
        };
      }
    }
  } catch {
    // ignore storage errors
  }

  return {
    phoneNumber: PROFILE_DATA.whatsappDefault,
    defaultMessage:
      "Hi Habibur! I visited your portfolio and would love to discuss a video editing or graphic design project."
  };
}

export function saveWhatsAppConfig(phoneNumber: string, defaultMessage?: string): WhatsAppConfig {
  const cleaned = phoneNumber.replace(/[^0-9]/g, '');
  const config: WhatsAppConfig = {
    phoneNumber: cleaned || PROFILE_DATA.whatsappDefault,
    defaultMessage:
      defaultMessage?.trim() ||
      "Hi Habibur! I visited your portfolio and would love to discuss a video editing or graphic design project."
  };
  try {
    localStorage.setItem(WHATSAPP_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore storage errors
  }
  return config;
}

export function isCustomWhatsAppConfigured(): boolean {
  try {
    const raw = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(
      parsed?.phoneNumber &&
        parsed.phoneNumber !== PROFILE_DATA.whatsappDefault &&
        parsed.phoneNumber.length >= 10
    );
  } catch {
    return false;
  }
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const config = getWhatsAppConfig();
  const text = encodeURIComponent(customMessage || config.defaultMessage);
  return `https://wa.me/${config.phoneNumber}?text=${text}`;
}

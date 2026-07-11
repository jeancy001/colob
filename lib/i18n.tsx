'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface Language {
  code: string
  label: string
  native: string
  region: string
}

export const languages: Language[] = [
  { code: 'en', label: 'English', native: 'English', region: 'Global' },
  { code: 'sw', label: 'Swahili', native: 'Kiswahili', region: 'East Africa' },
  { code: 'fr', label: 'French', native: 'Français', region: 'West & Central Africa' },
  { code: 'ar', label: 'Arabic', native: 'العربية', region: 'North Africa' },
  { code: 'ha', label: 'Hausa', native: 'Hausa', region: 'West Africa' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ', region: 'Horn of Africa' },
  { code: 'pt', label: 'Portuguese', native: 'Português', region: 'Lusophone Africa' },
  { code: 'yo', label: 'Yoruba', native: 'Yorùbá', region: 'West Africa' },
]

type Dict = Record<string, string>

// Focused demo translation set covering the most visible UI strings.
const translations: Record<string, Dict> = {
  en: {
    'nav.home': 'Home',
    'nav.discover': 'Discover',
    'nav.network': 'Network',
    'nav.profile': 'Profile',
    'nav.match': 'AI Match',
    'home.welcome': 'Welcome back',
    'home.newMatches': 'new AI matches for you',
    'home.view': 'View',
    'action.connect': 'Connect',
    'action.message': 'Message',
    'action.requestServices': 'Request Services',
    'action.language': 'Language',
    'discover.title': 'Discover',
    'discover.search': 'Search businesses, industries, services…',
    'discover.topVendors': 'Top Vendors & Distributors',
    'discover.trustRanked': 'Trust ranked',
    'discover.allBusinesses': 'Businesses near you',
    'collab.title': 'Ways to collaborate',
    'trust.title': 'Trust & Performance',
    'request.title': 'Request Services',
    'request.subtitle': 'Tell them what you need. This is a prototype request.',
    'request.send': 'Send Request',
    'request.sent': 'Request sent',
  },
  sw: {
    'nav.home': 'Nyumbani',
    'nav.discover': 'Gundua',
    'nav.network': 'Mtandao',
    'nav.profile': 'Wasifu',
    'nav.match': 'Ulinganishi wa AI',
    'home.welcome': 'Karibu tena',
    'home.newMatches': 'ulinganishi mpya wa AI kwako',
    'home.view': 'Tazama',
    'action.connect': 'Unganisha',
    'action.message': 'Ujumbe',
    'action.requestServices': 'Omba Huduma',
    'action.language': 'Lugha',
    'discover.title': 'Gundua',
    'discover.search': 'Tafuta biashara, viwanda, huduma…',
    'discover.topVendors': 'Wauzaji na Wasambazaji Bora',
    'discover.trustRanked': 'Kwa uaminifu',
    'discover.allBusinesses': 'Biashara karibu nawe',
    'collab.title': 'Njia za kushirikiana',
    'trust.title': 'Uaminifu na Utendaji',
    'request.title': 'Omba Huduma',
    'request.subtitle': 'Waambie unachohitaji. Hii ni ombi la mfano.',
    'request.send': 'Tuma Ombi',
    'request.sent': 'Ombi limetumwa',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.discover': 'Découvrir',
    'nav.network': 'Réseau',
    'nav.profile': 'Profil',
    'nav.match': 'Match IA',
    'home.welcome': 'Bon retour',
    'home.newMatches': 'nouveaux matchs IA pour vous',
    'home.view': 'Voir',
    'action.connect': 'Connecter',
    'action.message': 'Message',
    'action.requestServices': 'Demander des services',
    'action.language': 'Langue',
    'discover.title': 'Découvrir',
    'discover.search': 'Rechercher entreprises, secteurs, services…',
    'discover.topVendors': 'Meilleurs fournisseurs et distributeurs',
    'discover.trustRanked': 'Classé par confiance',
    'discover.allBusinesses': 'Entreprises près de vous',
    'collab.title': 'Façons de collaborer',
    'trust.title': 'Confiance et performance',
    'request.title': 'Demander des services',
    'request.subtitle': 'Dites-leur ce dont vous avez besoin. Ceci est un prototype.',
    'request.send': 'Envoyer la demande',
    'request.sent': 'Demande envoyée',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.discover': 'اكتشف',
    'nav.network': 'الشبكة',
    'nav.profile': 'الملف',
    'nav.match': 'مطابقة الذكاء',
    'home.welcome': 'مرحبًا بعودتك',
    'home.newMatches': 'مطابقات ذكاء جديدة لك',
    'home.view': 'عرض',
    'action.connect': 'اتصال',
    'action.message': 'رسالة',
    'action.requestServices': 'طلب الخدمات',
    'action.language': 'اللغة',
    'discover.title': 'اكتشف',
    'discover.search': 'ابحث عن الشركات والصناعات والخدمات…',
  },
  ha: {
    'nav.home': 'Gida',
    'nav.discover': 'Gano',
    'nav.network': 'Cibiya',
    'nav.profile': 'Bayani',
    'nav.match': 'Daidaita AI',
    'home.welcome': 'Barka da dawowa',
    'home.newMatches': 'sabbin daidaiton AI a gare ka',
    'home.view': 'Duba',
    'action.connect': 'Haɗa',
    'action.message': 'Saƙo',
    'action.requestServices': 'Nemi Ayyuka',
    'action.language': 'Harshe',
    'discover.title': 'Gano',
    'discover.search': 'Nemi kasuwanci, masana’antu, ayyuka…',
  },
  am: {
    'nav.home': 'መነሻ',
    'nav.discover': 'ያግኙ',
    'nav.network': 'መረብ',
    'nav.profile': 'መገለጫ',
    'nav.match': 'የ AI ተዛማጅ',
    'home.welcome': 'እንኳን ደህና መጡ',
    'home.newMatches': 'አዲስ የ AI ተዛማጆች ለእርስዎ',
    'home.view': 'ይመልከቱ',
    'action.connect': 'አገናኝ',
    'action.message': 'መልእክት',
    'action.requestServices': 'አገልግሎት ይጠይቁ',
    'action.language': 'ቋንቋ',
    'discover.title': 'ያግኙ',
    'discover.search': 'ንግዶችን፣ ኢንዱስትሪዎችን፣ አገልግሎቶችን ይፈልጉ…',
  },
  pt: {
    'nav.home': 'Início',
    'nav.discover': 'Descobrir',
    'nav.network': 'Rede',
    'nav.profile': 'Perfil',
    'nav.match': 'Match IA',
    'home.welcome': 'Bem-vindo de volta',
    'home.newMatches': 'novos matches de IA para você',
    'home.view': 'Ver',
    'action.connect': 'Conectar',
    'action.message': 'Mensagem',
    'action.requestServices': 'Solicitar serviços',
    'action.language': 'Idioma',
    'discover.title': 'Descobrir',
    'discover.search': 'Pesquisar empresas, setores, serviços…',
  },
  yo: {
    'nav.home': 'Ilé',
    'nav.discover': 'Ṣàwárí',
    'nav.network': 'Nẹ́tíwọ̀kì',
    'nav.profile': 'Àbùdá',
    'nav.match': 'Ìbámu AI',
    'home.welcome': 'Káàbọ̀ padà',
    'home.newMatches': 'àwọn ìbámu AI tuntun fún ọ',
    'home.view': 'Wò ó',
    'action.connect': 'Sopọ̀',
    'action.message': 'Ìránṣẹ́',
    'action.requestServices': 'Béèrè Iṣẹ́',
    'action.language': 'Èdè',
    'discover.title': 'Ṣàwárí',
    'discover.search': 'Wá àwọn iṣòwò, ilé-iṣẹ́, iṣẹ́…',
  },
}

interface LanguageContextValue {
  lang: Language
  setLang: (code: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: languages[0],
  setLang: () => {},
  t: (k) => k,
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState('en')

  const setLang = useCallback((next: string) => setCode(next), [])

  const value = useMemo<LanguageContextValue>(() => {
    const lang = languages.find((l) => l.code === code) ?? languages[0]
    const dict = translations[code] ?? translations.en
    const t = (key: string) => dict[key] ?? translations.en[key] ?? key
    return { lang, setLang, t }
  }, [code, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

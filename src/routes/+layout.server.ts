import type { LayoutServerLoad } from './$types';

const isSupported = (value: string | undefined | null): value is 'en' | 'ru' | 'kz' | 'hr' | 'sk' =>
  value === 'en' || value === 'ru' || value === 'kz' || value === 'hr' || value === 'sk';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cookie = cookies.get('lang');
  const language = isSupported(cookie) ? cookie : 'en';
  return { language };
};

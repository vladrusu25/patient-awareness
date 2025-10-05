import type { LayoutServerLoad } from './$types';

const isSupported = (value: string | undefined | null): value is 'en' | 'ru' =>
  value === 'en' || value === 'ru';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cookie = cookies.get('lang');
  const language = isSupported(cookie) ? cookie : 'en';
  return { language };
};

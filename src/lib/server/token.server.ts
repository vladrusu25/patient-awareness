import { customAlphabet } from 'nanoid';

const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const SAFE_ALPHANUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const oneLetter = customAlphabet(LETTERS, 1);
const remaining = customAlphabet(SAFE_ALPHANUM, 8);

export function generateStandaloneToken(): string {
  return `${oneLetter()}${oneLetter()}${remaining()}`;
}

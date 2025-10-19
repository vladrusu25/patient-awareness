// src/lib/types/auth.ts
export type Role = 'admin' | 'doctor';   // doctor not implemented yet
export type AuthUser = { id: string; username: string; role: Role; doctorCode?: string; region?: string; linkSecret?: string };

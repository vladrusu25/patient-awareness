// src/app.d.ts
import type { AuthUser } from '$lib/types/auth';

declare global {
  namespace App {
    interface Locals {
      auth: { user: AuthUser } | null;
    }
    // (optional) if you want to pass the user to layouts/pages
    interface PageData {
      user?: AuthUser;
    }
  }
}

export {};

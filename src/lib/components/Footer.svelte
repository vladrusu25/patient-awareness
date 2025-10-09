<script lang="ts">
  import { t } from '$lib/i18n';

  export let brand = 'Smart Health';
  export let tagline: string | null = null;
  export let email = 'info@smarthealthandscience.nl';

  const year = new Date().getFullYear();

  const navItems = [
    { labelKey: 'footer.navItems.home', href: '/' },
    { labelKey: 'footer.navItems.assessment', href: '/assessment' },
    { labelKey: 'footer.navItems.contact', href: '/contact' }
  ];
</script>

<footer class="bg-slate-700 text-slate-300">
  <div class="mx-auto max-w-[1152px] px-6 py-12">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
      <!-- Brand + Tagline -->
      <div>
        <div class="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt={`${brand} logo`}
            class="h-8 w-auto"
            loading="lazy"
            decoding="async"
          />
          <span class="font-heading font-bold text-white text-lg leading-7">{brand}</span>
        </div>

        <p class="mt-4 max-w-sm leading-tight">
          {tagline ?? $t('footer.tagline')}
        </p>
      </div>

      <!-- Navigation -->
      <nav aria-label={$t('footer.navigationHeading')}>
        <h3 class="text-white font-heading text-base font-semibold">{$t('footer.navigationHeading')}</h3>
        <ul class="mt-4 space-y-3">
          {#each navItems as item}
            <li>
              <a
                href={item.href}
                class="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
              >{$t(item.labelKey)}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Contact -->
      <div aria-label={$t('footer.contactHeading')}>
        <h3 class="text-white font-heading text-base font-semibold">{$t('footer.contactHeading')}</h3>
        <ul class="mt-4 space-y-4">
          <li class="flex items-start gap-3">
            <svg class="h-5 w-5 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16v16H4z" fill="none" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <a href={`mailto:${email}`} class="hover:text-white transition-colors">{email}</a>
          </li>
          <li class="flex items-start gap-3">
            <a href="/contact" class="hover:text-white transition-colors">{$t('nav.contact')}</a>
          </li>
          <li class="flex items-start gap-3">
            <a href="https://www.instagram.com/smarthealth_pvd/" target="_blank" rel="noopener" class="hover:text-white transition-colors">Instagram</a>
          </li>
          <li class="flex items-start gap-3">
            <a href="https://www.youtube.com/@PelvicVenousDisorders" target="_blank" rel="noopener" class="hover:text-white transition-colors">YouTube</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="mt-10 border-t border-white/10"></div>

    <!-- Copyright -->
    <p class="text-center text-sm mt-6">
      &copy; {year} {brand}. {$t('footer.rights')}
    </p>
  </div>
</footer>


<script lang="ts">
  // You can tweak these in-place or pass via props later if you want
  export let brand = 'HealthCare';
  export let tagline =
    'Empowering individuals with personalized health insights through AI-powered assessments.';
  export let email = 'support@healthcare.com';
  export let phone = '+1 (555) 123-4567';
  export let address = '123 Health St, Medical City';

  const year = new Date().getFullYear();

  const nav = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Assessment', href: '/assessment' },
    { label: 'Contact', href: '/contact' }
  ];

  const support = [
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/faq' }
  ];
</script>

<footer class="bg-slate-700 text-slate-300">
  <div class="mx-auto max-w-[1152px] px-6 py-12">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
      <!-- Brand + Tagline -->
      <div>
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-primary grid place-items-center">
            <!-- same heart/leaf mark used in header -->
            <svg viewBox="0 0 24 24" class="h-4 w-4 text-white" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
            </svg>
          </div>
          <span class="font-heading font-bold text-white text-lg leading-7">{brand}</span>
        </div>

        <p class="mt-4 max-w-sm leading-tight">
          {tagline}
        </p>
      </div>

      <!-- Navigation -->
      <nav aria-label="Footer navigation">
        <h3 class="text-white font-heading text-base font-semibold">Navigation</h3>
        <ul class="mt-4 space-y-3">
          {#each nav as item}
            <li>
              <a
                href={item.href}
                class="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                >{item.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Support -->
      <nav aria-label="Footer support">
        <h3 class="text-white font-heading text-base font-semibold">Support</h3>
        <ul class="mt-4 space-y-3">
          {#each support as item}
            <li>
              <a
                href={item.href}
                class="transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                >{item.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Contact -->
      <div aria-label="Footer contact">
        <h3 class="text-white font-heading text-base font-semibold">Contact</h3>
        <ul class="mt-4 space-y-4">
          <li class="flex items-start gap-3">
            <svg class="h-5 w-5 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16v16H4z" fill="none" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <a href={`mailto:${email}`} class="hover:text-white transition-colors">{email}</a>
          </li>
          <li class="flex items-start gap-3">
            <svg class="h-5 w-5 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.09 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.37 1.77.73 2.58a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.5-1.26a2 2 0 0 1 2.11-.45c.81.36 1.68.61 2.58.73A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} class="hover:text-white transition-colors">{phone}</a>
          </li>
          <li class="flex items-start gap-3">
            <svg class="h-5 w-5 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-6-4.35-8.485-6.835A6 6 0 1 1 12 5a6 6 0 1 1 8.485 9.165C18 16.65 12 21 12 21Z" />
            </svg>
            <span>{address}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="mt-10 border-t border-white/10"></div>

    <!-- Copyright -->
    <p class="text-center text-sm mt-6">
      &copy; {year} {brand}. All rights reserved.
    </p>
  </div>
</footer>

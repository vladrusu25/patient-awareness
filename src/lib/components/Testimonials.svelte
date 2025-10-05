<script context="module" lang="ts">
  export type Testimonial = {
    name: string;
    text?: string;
    textKey?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
    avatar?: string;
  };
</script>

<script lang="ts">
  import { t } from '$lib/i18n';

  const defaultItems: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      textKey: 'testimonials.default1',
      rating: 5,
      avatar: '/images/assessment_page/user_icon.png'
    },
    {
      name: 'Michael Chen',
      textKey: 'testimonials.default2',
      rating: 5,
      avatar: '/images/assessment_page/user_icon.png'
    },
    {
      name: 'Emma Davis',
      textKey: 'testimonials.default3',
      rating: 5,
      avatar: '/images/assessment_page/user_icon.png'
    }
  ];

  // Default content (you can pass your own via `items={...}`)
  export let items: Testimonial[] = defaultItems;

  const starPath =
    'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.985 2.136c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.379 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z';
</script>

<section class="bg-neutral-25 py-16 md:py-20">
  <div class="mx-auto max-w-[1200px] px-6">
    <h2
      class="text-center font-heading text-3xl md:text-4xl font-semibold text-neutral-900"
    >
      {$t('testimonials.heading')}
    </h2>

    <div class="mt-10 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each items as tItem}
        <figure
          class="rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-6 md:p-7"
        >
          <figcaption
            class="font-heading font-semibold text-neutral-900"
          >
            {tItem.name}
          </figcaption>
          <div class="flex items-center gap-4 mt-2">
            <img
              src={tItem.avatar ?? '/images/user_icon.png'}
              alt=""
              class="h-12 w-12 rounded-full object-cover ring-1 ring-black/10 select-none pointer-events-none"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div
                class="mt-1 flex items-center gap-1 text-amber-400"
                aria-label={$t('testimonials.ratingLabel', { rating: String(tItem.rating ?? 5) })}
              >
                {#each Array(tItem.rating ?? 5) as _}
                  <svg viewBox="0 0 20 20" class="h-5 w-5 fill-amber-400">
                    <path d={starPath} />
                  </svg>
                {/each}
              </div>
            </div>
          </div>

          <blockquote
            class="mt-4 text-[17px] leading-7 text-neutral-600"
          >
            &ldquo;{tItem.text ?? (tItem.textKey ? $t(tItem.textKey) : '')}&rdquo;
          </blockquote>
        </figure>
      {/each}
    </div>
  </div>
</section>

<script lang="ts">
  import { t } from '$lib/i18n';

  // Add a video source URL here once you have your own video
  const videoSrc = 'https://www.youtube.com/embed/gcGTOfQSdMA'; // placeholder video for now
</script>

<section class="bg-white py-16 md:py-20">
  <div class="mx-auto max-w-[1200px] px-6">
    <h2 class="text-center font-heading text-3xl md:text-4xl font-semibold text-neutral-900">
      {$t('video.heading')}
    </h2>

    <div class="mt-10 text-center">
      <iframe
        class="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] rounded-xl shadow-lg"
        src={videoSrc}
        title={$t('video.title')}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <p class="mt-6 text-center text-neutral-600 text-lg max-w-[800px] mx-auto">
      {$t('video.description')}
    </p>
  </div>
</section>

<script lang="ts">
  // Add a video source URL here once you have your own video
  const videoSrc = 'https://www.youtube.com/embed/gcGTOfQSdMA'; // placeholder video for now
</script>

<section class="bg-white py-16 md:py-20">
  <div class="mx-auto max-w-[1200px] px-6">
    <h2 class="text-center font-heading text-3xl md:text-4xl font-semibold text-neutral-900">
      Pelvic Health is Essential for Women's Wellness
    </h2>

    <div class="mt-10 text-center">
      <iframe
        class="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] rounded-xl shadow-lg"
        src={videoSrc}
        title="Pelvic Health Video"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <p class="mt-6 text-center text-neutral-600 text-lg max-w-[800px] mx-auto">
      Learn why pelvic health is fundamental to your overall wellness and quality of life. This educational video
      explains the importance of maintaining strong pelvic floor muscles throughout different life stages.
    </p>
  </div>
</section>

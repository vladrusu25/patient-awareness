<script lang="ts">
  import HeroDesktop from '../hero/HeroDesktop.svelte';
  import HeroMobile from '../hero/HeroMobile.svelte';

</script>

<!-- Desktop / tablet -->
<div class="hidden md:block">
  <HeroDesktop />
</div>

<!-- Mobile -->
<div class="block md:hidden">
  <HeroMobile heightVh={35} />
</div>

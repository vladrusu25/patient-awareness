    <script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<!-- ...other sections above... -->

<Testimonials />
<Footer />
<!-- or pass custom reviews -->
<!--
<Testimonials
  items={[
    { name: 'Ava M.', text: 'Loved the flow and speed.', rating: 5, avatar: '/images/user_icon.png' },
    { name: 'Noah B.', text: 'Clear questions and great tips.', rating: 5, avatar: '/images/user_icon.png' },
    { name: 'Liam K.', text: 'Felt private and trustworthy.', rating: 5, avatar: '/images/user_icon.png' }
  ]}
/>
-->

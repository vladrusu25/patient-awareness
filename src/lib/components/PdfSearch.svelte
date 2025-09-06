<script lang="ts">
  import { supa } from '$lib/server/supabase';
  import { createEventDispatcher } from 'svelte';

  let token: string = '';
  let pdfUrl: string | null = null;
  let errorMessage: string = '';
  let isLoading: boolean = false;
  let isPdfFound: boolean = false;

  // Fetch PDF based on token
  const searchPdf = async () => {
    errorMessage = '';  // Reset the error message
    isLoading = true;

    try {
      // Check if the token is valid (16 characters)
      if (token.trim().length !== 16) {
        errorMessage = 'Please enter a valid token (16 characters).';
        isLoading = false;
        return;
      }

      // Fetch the PDF URL from Supabase Storage
      const { data, error } = await supa
        .storage
        .from('health-assessment-pdfs')
        .download(`${token.trim()}.pdf`);

      if (error) {
        errorMessage = 'No PDF found for this token.';
        isPdfFound = false;
      } else {
        // Create an Object URL for the PDF
        const url = URL.createObjectURL(data);
        pdfUrl = url;
        isPdfFound = true;
      }
    } catch (error) {
      errorMessage = 'An error occurred. Please try again later.';
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="max-w-3xl mx-auto p-4">
  <h1 class="text-2xl font-semibold text-primary">Health Assessment PDF Search</h1>

  <div class="mt-4">
    <input
      bind:value={token}
      type="text"
      class="w-full p-2 border border-gray-300 rounded"
      placeholder="Enter your 16-character token"
      on:input={searchPdf}
    />
    {#if errorMessage}
      <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}
  </div>

  {#if isLoading}
    <div class="mt-4">
      <p class="text-gray-500">Loading...</p>
    </div>
  {/if}

  {#if isPdfFound && pdfUrl}
    <div class="mt-4">
      <h2 class="text-xl font-semibold text-primary">Your Health Assessment</h2>
      <iframe src={pdfUrl} class="w-full h-[500px] border" title="Health Assessment PDF"></iframe>

      <div class="mt-4">
        <a
          href={pdfUrl}
          download
          class="inline-block px-4 py-2 bg-green-500 text-white rounded"
        >
          Download PDF
        </a>
      </div>
    </div>
  {/if}
</div>

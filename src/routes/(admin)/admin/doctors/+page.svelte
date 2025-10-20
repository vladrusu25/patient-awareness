<script lang="ts">
  import Sidebar from '$lib/components/dashboard/admin/Sidebar.svelte';
  import { t } from '$lib/i18n';
  import { onDestroy } from 'svelte';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData | null = null;

  const navBase = [
    { href: '/admin', labelKey: 'admin.nav.overview', active: false },
    { href: '/admin/doctors', labelKey: 'admin.nav.doctors', active: true }
  ];

  $: nav = navBase.map((item) => ({
    ...item,
    label: $t(item.labelKey),
    active: item.active
  }));

  const regionValues = [
    { value: 'en', labelKey: 'admin.doctors.region.en' },
    { value: 'ru', labelKey: 'admin.doctors.region.ru' },
    { value: 'kz', labelKey: 'admin.doctors.region.kz' },
    { value: 'hr', labelKey: 'admin.doctors.region.hr' },
    { value: 'sk', labelKey: 'admin.doctors.region.sk' }
  ];

  $: regionOptions = regionValues.map((opt) => ({ value: opt.value, label: $t(opt.labelKey) }));
  $: shareBase = data.origin.replace(/\/$/, '');
  $: createdCode = data.createdCode ?? null;

  type EnhancedDoctor = PageData['doctors'][number] & { fullName: string | null };

  const computeDoctorFullName = (doctor: PageData['doctors'][number]): string | null => {
    const first = typeof doctor.first_name === 'string' ? doctor.first_name.trim() : '';
    const last = typeof doctor.last_name === 'string' ? doctor.last_name.trim() : '';
    const full = [first, last].filter(Boolean).join(' ');
    return full.length ? full : null;
  };

  let doctors: EnhancedDoctor[] = (data.doctors ?? []).map((doctor) => ({
    ...doctor,
    fullName: computeDoctorFullName(doctor)
  }));
  $: doctors = (data.doctors ?? []).map((doctor) => ({
    ...doctor,
    fullName: computeDoctorFullName(doctor)
  }));

  let copiedLink: string | null = null;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  function copy(link: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(link).then(() => {
      copiedLink = link;
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copiedLink = null;
        copyTimeout = null;
      }, 2000);
    });
  }

  onDestroy(() => {
    if (copyTimeout) clearTimeout(copyTimeout);
  });

  $: creationErrorKey = form?.error ?? null;
  $: creationError =
    creationErrorKey === 'invalid_input'
      ? $t('admin.doctors.errors.invalidInput')
      : creationErrorKey === 'username_taken'
        ? $t('admin.doctors.errors.usernameTaken')
        : creationErrorKey === 'resource_exhausted'
          ? $t('admin.doctors.errors.resourceExhausted')
          : creationErrorKey === 'create_failed'
            ? $t('admin.doctors.errors.generic')
            : creationErrorKey
              ? $t('admin.doctors.errors.generic')
              : null;

  function translateKey(key: string, fallback: string): string {
    const value = $t(key);
    return value === key ? fallback : value;
  }

  $: firstNameLabel = translateKey('admin.doctors.firstName', 'First name');
  $: lastNameLabel = translateKey('admin.doctors.lastName', 'Last name');
  $: optionalLabel = translateKey('admin.doctors.optional', 'optional');
  $: doctorIdLabel = translateKey('admin.doctors.doctorId', 'Doctor ID');
  $: doctorNameLabel = translateKey('admin.doctors.nameLabel', 'Doctor name');
  $: idInlineLabel = translateKey('admin.doctors.idInline', 'Doctor ID {{code}}');
</script>

<div class="lg:flex lg:h-full lg:gap-6 lg:overflow-hidden">
  <Sidebar items={nav} classes="hidden lg:block" />

  <div class="flex-1 min-w-0 lg:overflow-y-auto">
    <main class="p-4 md:p-6 space-y-6">
      <section class="space-y-2">
        <h1 class="text-2xl font-heading font-semibold text-neutral-900">
          {$t('admin.doctors.title')}
        </h1>
        <p class="text-sm text-neutral-600 max-w-2xl">{$t('admin.doctors.subtitle')}</p>

        {#if createdCode}
          <div class="mt-3 rounded-lg border border-mint-300 bg-mint-50 px-4 py-3 text-sm text-mint-900">
            {$t('admin.doctors.created', { code: createdCode })}
          </div>
        {/if}
        {#if creationError}
          <div class="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {creationError}
          </div>
        {/if}
      </section>

      <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form method="POST" action="?/create" class="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
          <h2 class="text-lg font-semibold text-neutral-900">
            {$t('admin.doctors.createTitle')}
          </h2>
          <p class="text-sm text-neutral-600">
            {$t('admin.doctors.createHint')}
          </p>

          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-800" for="username">
              {$t('admin.doctors.username')}
            </label>
            <input
              id="username"
              name="username"
              class="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
              autocomplete="off"
              required
            />
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium text-neutral-800" for="firstName">
                {firstNameLabel}
                <span class="text-xs text-neutral-500">({optionalLabel})</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                class="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
                autocomplete="off"
              />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium text-neutral-800" for="lastName">
                {lastNameLabel}
                <span class="text-xs text-neutral-500">({optionalLabel})</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                class="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
                autocomplete="off"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-800" for="password">
              {$t('admin.doctors.password')}
            </label>
            <input
              id="password"
              name="password"
              type="text"
              minlength="8"
              class="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
              required
            />
            <p class="text-xs text-neutral-500">
              {$t('admin.doctors.passwordHint')}
            </p>
          </div>

  <div class="space-y-1">
    <label class="text-sm font-medium text-neutral-800" for="region">
      {$t('admin.doctors.regionLabel')}
    </label>
    <select
      id="region"
      name="region"
      class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-mint-400"
      required
    >
      {#each regionOptions as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
    <p class="text-xs text-neutral-500">
      {$t('admin.doctors.regionHint')}
    </p>
  </div>

          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
          >
            {$t('admin.doctors.createSubmit')}
          </button>
        </form>

        <div class="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-neutral-900">
            {$t('admin.doctors.instructions.title')}
          </h2>
          <ul class="mt-3 space-y-2 text-sm text-neutral-600">
            <li>{$t('admin.doctors.instructions.line1')}</li>
            <li>{$t('admin.doctors.instructions.line2')}</li>
            <li>{$t('admin.doctors.instructions.line3')}</li>
          </ul>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-900">
            {$t('admin.doctors.listTitle')}
          </h2>
          <span class="text-sm text-neutral-500">{$t('admin.doctors.listCount', { count: doctors.length })}</span>
        </div>

        {#if doctors.length === 0}
          <div class="rounded-xl border border-dashed border-neutral-200 bg-neutral-25 px-4 py-8 text-center text-sm text-neutral-500">
            {$t('admin.doctors.empty')}
          </div>
        {:else}
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {#each doctors as doctor}
              {#key doctor.id}
                <article
                  class={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                    doctor.doctor_code === createdCode ? 'border-mint-400 ring-1 ring-mint-300' : 'border-neutral-100'
                  }`}
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-xs uppercase text-neutral-500 font-medium">
                        {doctor.fullName ? doctorNameLabel : doctorIdLabel}
                      </p>
                      <p class="text-xl font-heading text-neutral-900">
                        {doctor.fullName ?? doctor.doctor_code}
                      </p>
                      {#if doctor.fullName}
                        <p class="mt-1 text-xs text-neutral-500">
                          {idInlineLabel.replace('{{code}}', doctor.doctor_code)}
                        </p>
                      {/if}
                    </div>
                    <div class="text-right">
                      <p class="text-xs uppercase text-neutral-500 font-medium">
                        {$t('admin.doctors.createdAt')}
                      </p>
                      <p class="text-sm text-neutral-600">
                        {new Date(doctor.created_at ?? '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <dl class="mt-4 space-y-3 text-sm text-neutral-700">
                    {#if doctor.fullName}
                      <div>
                        <dt class="text-neutral-500 uppercase text-xs font-medium">
                          {doctorNameLabel}
                        </dt>
                        <dd class="font-medium">{doctor.fullName}</dd>
                      </div>
                    {/if}
                    <div>
                      <dt class="text-neutral-500 uppercase text-xs font-medium">
                        {doctorIdLabel}
                      </dt>
                      <dd class="font-medium">{doctor.doctor_code}</dd>
                    </div>
                    <div>
                      <dt class="text-neutral-500 uppercase text-xs font-medium">
                        {$t('admin.doctors.usernameLabel')}
                      </dt>
                      <dd class="font-medium">{doctor.username}</dd>
                    </div>
                    <div>
                      <dt class="text-neutral-500 uppercase text-xs font-medium">
                        {$t('admin.doctors.regionLabel')}
                      </dt>
                      <dd class="font-medium">
                        {regionOptions.find((opt) => opt.value === doctor.region)?.label ?? doctor.region}
                      </dd>
                    </div>
                  </dl>

                  <div class="mt-4 rounded-xl border border-neutral-200 bg-neutral-25/80 p-3 space-y-2">
                    <p class="text-xs uppercase text-neutral-500 font-medium">
                      {$t('admin.doctors.shareLink')}
                    </p>
                    {#if shareBase}
                      {@const shareLink = `${shareBase}/doctor/${doctor.doctor_code}?k=${doctor.link_secret}`}
                      <div class="space-y-2">
                        <p class="text-sm text-neutral-700 break-all">{shareLink}</p>
                        <div class="flex items-center gap-2">
                          <button
                            type="button"
                            class="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                            on:click={() => copy(shareLink)}
                          >
                            {copiedLink === shareLink ? $t('admin.doctors.copied') : $t('admin.doctors.copyLink')}
                          </button>
                          <a
                            class="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-50"
                            href={shareLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {$t('admin.doctors.openLink')}
                          </a>
                        </div>
                        <img
                          class="mt-3 h-32 w-32 rounded-lg border border-neutral-200"
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareLink)}`}
                          alt={$t('admin.doctors.qrAlt', { code: doctor.doctor_code })}
                          loading="lazy"
                        />
                      </div>
                    {/if}
                  </div>
                </article>
              {/key}
            {/each}
          </div>
        {/if}
      </section>
    </main>
  </div>
</div>

<style>
  article {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
</style>


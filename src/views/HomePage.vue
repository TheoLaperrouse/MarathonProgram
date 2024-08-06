<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="rounded-lg bg-white p-8 text-center shadow-lg">
            <h1 class="mb-6 text-4xl font-bold text-gray-900">{{ $t('homeWelcome') }}</h1>
            <p class="mb-6 text-lg text-gray-700" v-html="$t('homeDescription')"></p>
            <button
                @click="goToSettings"
                class="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
            >
                {{ $t('start') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToSettings = () => router.push({ name: 'settings' });
</script>

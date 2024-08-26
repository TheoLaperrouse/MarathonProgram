<template>
    <div class="flex min-h-screen items-center justify-center">
        <div class="rounded-lg text-center">
            <h1 class="mb-6 text-4xl font-bold">{{ $t('homeWelcome') }}</h1>
            <p class="mb-6 text-lg" v-html="$t('homeDescription')"></p>
            <button @click="goToSettings" class="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
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

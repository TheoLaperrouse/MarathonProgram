<template>
    <div class="ml-3 mt-3 max-w-sm space-y-4 rounded-xl bg-gray-200 p-6 shadow-md">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('bestTimeInput') }}</h2>
        <input v-model="bestTime" />
    </div>
</template>

<script setup>
import { usePerformance } from '@/composables/usePerformance';

const { bestTime } = usePerformance();
</script>

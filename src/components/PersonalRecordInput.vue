<template>
    <div class="ml-3 mt-3 max-w-sm space-y-4 rounded-xl bg-gray-200 p-6 shadow-md">
        <h2 class="text-xl font-semibold text-gray-700">{{ $t('bestTimeInput') }}</h2>
        <input
            v-model="bestTime"
            type="number"
            placeholder="Enter your best 2km time"
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
</template>

<script setup>
import { usePerformance } from '@/composables/usePerformance';

const { bestTime } = usePerformance();
</script>

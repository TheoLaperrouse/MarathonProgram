<template>
    <div class="ml-4 mt-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('settings') }}</h1>
        <div class="mb-2">
            <label>{{ $t('marathonTimeLabel') }}</label>
            <input class="w-20" v-model="marathonTime" />
        </div>
        <div>
            <label>{{ $t('bestTimeLabel') }}</label>
            <input class="w-20" v-model="bestTime" />
        </div>
    </div>
</template>

<script setup>
import { usePerformance } from '@/composables/usePerformance';

const { marathonTime, bestTime } = usePerformance();
</script>

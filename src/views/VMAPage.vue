<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('vma') }}</h1>
        <div>{{ $t('VO2MaxInformations', { VO2Max }) }}</div>
        <h1 class="mb-4 text-xl font-bold mt-4">{{ $t('vmaInformations') }}</h1>
        <div class="flex flex-col">
            <div
                v-for="({ pace, percentVMA, cardiacFrequency, color: borderColor }, type) in paces"
                :key="type"
                class="border border-gray-200 rounded-lg shadow-md p-4 mb-2"
                :style="{ borderColor, backgroundColor: hexToRGBA(borderColor, 0.2) }"
            >
                <h2 class="text-lg font-semibold mb-2">{{ $t(type) }}</h2>
                <p class="mb-2">
                    <strong>{{ $t('pace') }}:</strong> {{ pace }} min/km
                </p>
                <p class="mb-2">
                    <strong>{{ $t('percentVMA') }}:</strong> {{ percentVMA }} %
                </p>
                <p class="mb-2">
                    <strong>{{ $t('cardiacFrequency') }}:</strong> {{ cardiacFrequency }} BPM
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFormatter } from '@/composables/useFormatter';
import { usePerformance } from '@/composables/usePerformance';

const { VO2Max, paces } = usePerformance();
const { hexToRGBA } = useFormatter();
</script>

<template>
    <div class="p-4">
        <div class="mb-6 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500 text-gray-700">
            {{ $t('VO2MaxInformations', { VO2Max }) }}
        </div>
        <h2 class="mb-4 text-xl font-bold text-gray-700 mt-6">{{ $t('vmaInformations') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div
                v-for="({ pace, percentVMA, cardiacFrequency, color: borderColor }, type) in paces"
                :key="type"
                class="border-l-4 rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
                :style="{
                    borderLeftColor: borderColor,
                    backgroundColor: hexToRGBA(borderColor, 0.1),
                }"
            >
                <div class="flex items-center mb-3">
                    <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: borderColor }"></div>
                    <h3 class="text-lg font-semibold text-gray-700">{{ $t(type) }}</h3>
                </div>

                <div class="space-y-2 text-gray-600">
                    <p>
                        <span class="font-medium">{{ $t('pace') }}: </span>
                        <span class="text-gray-800">{{ pace }}</span>
                    </p>
                    <p>
                        <span class="font-medium">{{ $t('percentVMA') }}: </span>
                        <span class="text-gray-800">{{ percentVMA }}%</span>
                    </p>
                    <p>
                        <span class="font-medium">{{ $t('cardiacFrequency') }}: </span>
                        <span class="text-gray-800">{{ cardiacFrequency }} BPM</span>
                    </p>
                </div>
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

<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('vma') }}</h1>
        <div>{{ $t('VO2MaxInformations', { VO2Max }) }}</div>
        <h1 class="mb-4 text-1xl font-bold mt-4">{{ $t('vmaInformations') }}</h1>
        <table class="w-full table-auto border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">Type de course</th>
                    <th class="border border-gray-300 px-4 py-2">% VMA</th>
                    <th class="border border-gray-300 px-4 py-2">Allure</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ pace, percentVMA }, type) in paces" :key="type">
                    <td class="border border-gray-300 px-4 py-2">{{ $t(type) }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">{{ percentVMA }} %</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">{{ pace }} min/km</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { usePerformance } from '@/composables/usePerformance';

const { VO2Max, paces } = usePerformance();
</script>

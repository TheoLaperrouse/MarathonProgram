<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="rounded-lg bg-white p-8 text-center shadow-lg">
            <h1 class="mb-4 text-4xl font-bold text-gray-900">{{ $t('welcome') }}</h1>
            <p class="mb-6 text-lg text-gray-700">
                {{ $t('description1') }}
            </p>
            <p>
                {{ $t('description2') }}
            </p>
            <button
                v-if="!bestTime"
                @click="openModal"
                class="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
            >
                {{ $t('start') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import { useLocalStorage } from '@vueuse/core';

const bestTime = useLocalStorage('bestTime', '');
const openModal = () => Swal.fire('Temps le + rapide sur 2km');
</script>

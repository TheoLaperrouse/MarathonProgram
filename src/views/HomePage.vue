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
                @click="openModal"
                class="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
            >
                {{ $t('start') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { usePerformance } from '@/composables/usePerformance';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { marathonTime, bestTime } = usePerformance();
const openModal = () => {
    Swal.fire({
        title: t('informations'),
        html:
            `<label>${t('bestTimeLabel')}</label>` +
            `<input id="bestTime" class="swal2-input mb-6" value="${bestTime.value}">` +
            `<label>${t('marathonTimeLabel')}</label>` +
            `<input  id="marathonTime" class="swal2-input" value="${marathonTime.value}">`,
        showCancelButton: true,
        confirmButtonText: t('save'),
        cancelButtonText: t('cancel'),
        preConfirm: () => {
            const bestTimeInput = document.getElementById('bestTime').value;
            const marathonTimeInput = document.getElementById('marathonTime').value;
            return { bestTimeInput, marathonTimeInput };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            bestTime.value = result.value.bestTimeInput;
            marathonTime.value = result.value.marathonTimeInput;
            Swal.fire({
                icon: 'success',
                title: t('saved'),
                text: t('settingsUpdated'),
                timer: 1500,
                showConfirmButton: false,
            });
        }
    });
};
</script>

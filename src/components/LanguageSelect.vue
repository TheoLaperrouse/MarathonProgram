<template>
    <div class="relative inline-block w-40">
        <select v-model="selectedLanguage" class="w-full px-4 py-2">
            <option v-for="lang in languages" :key="lang.lang" :value="lang.lang">
                {{ lang.name }}
            </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';
import { watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = [
    { lang: 'en', name: 'English' },
    { lang: 'fr', name: 'Français' },
];

const selectedLanguage = useLocalStorage('language', locale.value);

onMounted(() => {
    locale.value = selectedLanguage.value;
});

watch(selectedLanguage, (newLang) => {
    locale.value = newLang;
});
</script>

<style scoped>
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>

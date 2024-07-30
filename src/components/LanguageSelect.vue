<template>
    <div class="relative inline-block w-40">
        <select
            v-model="selectedLanguage"
            @change="changeLanguage"
            class="w-full appearance-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white"
        >
            <option v-for="lang in languages" :key="lang.lang" :value="lang.lang">
                <i :class="`fa ${lang.icon} mr-2`"></i>
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
import { watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';

const { locale } = useI18n();

const languages = [
    { lang: 'en', name: 'English', icon: 'fa-flag-usa' },
    { lang: 'fr', name: 'Français', icon: 'fa-flag-fr' },
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

i {
    font-size: 1rem;
    vertical-align: middle;
}
</style>

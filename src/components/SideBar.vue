<template>
    <div :class="['menu min-h-screen bg-gray-800 text-white', isSidebarOpen ? 'min-w-[250px]' : 'min-w-[80px]']">
        <ul class="fixed ml-6 mt-4">
            <li class="py-4" v-for="(link, index) in menuLinks" :key="index">
                <router-link
                    :class="{ 'text-indigo-400': $route.path === link.to }"
                    :to="link.to"
                    class="flex items-center"
                >
                    <font-awesome-icon
                        :icon="link.icon"
                        v-tooltip="!isSidebarOpen ? $t(link.text) : ''"
                        class="mr-4 text-2xl"
                    />
                    <span v-if="isSidebarOpen">{{ $t(link.text) }}</span>
                </router-link>
            </li>
            <li class="py-4">
                <a :href="githubLink" target="_blank" class="flex items-center">
                    <font-awesome-icon
                        :icon="faGithub"
                        v-tooltip="!isSidebarOpen ? $t('githubRepo') : ''"
                        class="mr-4 text-2xl"
                    />
                    <span v-if="isSidebarOpen"> Repo Github </span>
                </a>
            </li>
        </ul>
        <button
            @click="toggleSidebar"
            :class="[
                'absolute bottom-4 rounded-full border border-gray-600 bg-gray-800 p-2 text-white hover:bg-gray-700',
                isSidebarOpen ? 'left-[234px]' : 'left-[64px]',
            ]"
        >
            <font-awesome-icon :icon="isSidebarOpen ? faChevronLeft : faChevronRight" class="text-xl" />
        </button>
    </div>
</template>

<script setup>
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    faHome,
    faCalendar,
    faStopwatch,
    faTachometerAlt,
    faChevronLeft,
    faChevronRight,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';

const isSidebarOpen = useLocalStorage('isSidebarOpen', true);

const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const menuLinks = [
    { to: '/', text: 'home', icon: faHome },
    { to: '/day-program', text: 'dayProgram', icon: faStopwatch },
    { to: '/calendar', text: 'calendar', icon: faCalendar },
    { to: '/vma', text: 'vma', icon: faTachometerAlt },
    { to: '/settings', text: 'settings', icon: faGear },
];

const githubLink = 'https://github.com/TheoLaperrouse/SportProgram';
</script>

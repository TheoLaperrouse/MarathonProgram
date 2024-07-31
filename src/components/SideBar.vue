<template>
    <div
        :class="[
            'menu min-h-screen bg-gray-800 text-white flex flex-col',
            isSidebarOpen ? 'min-w-[225px]' : 'min-w-[80px]',
        ]"
    >
        <ul class="mt-4 flex-1 ml-6">
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
        </ul>
        <div class="flex-shrink-0 py-4 ml-6">
            <a :href="githubLink" target="_blank" class="flex items-center">
                <font-awesome-icon
                    :icon="faGithub"
                    v-tooltip="!isSidebarOpen ? $t('githubRepo') : ''"
                    class="mr-4 text-2xl"
                />
                <span v-if="isSidebarOpen">{{ $t('githubRepo') }}</span>
            </a>
        </div>
        <button
            @click="toggleSidebar"
            :class="[
                'absolute bottom-4 rounded-full border border-gray-600 bg-gray-800 p-2 text-white hover:bg-gray-700',
                isSidebarOpen ? 'left-[209px]' : 'left-[64px]',
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
    faChevronLeft,
    faChevronRight,
    faGear,
    faPersonRunning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useLocalStorage } from '@vueuse/core';

const isSidebarOpen = useLocalStorage('isSidebarOpen', true);

const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const menuLinks = [
    { to: '/', text: 'home', icon: faHome },
    { to: '/day-program', text: 'dayProgram', icon: faPersonRunning },
    { to: '/calendar', text: 'calendar', icon: faCalendar },
    { to: '/vma', text: 'vma', icon: faStopwatch },
    { to: '/settings', text: 'settings', icon: faGear },
];

const githubLink = 'https://github.com/TheoLaperrouse/SportProgram';
</script>

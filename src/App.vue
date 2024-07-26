<template>
    <div id="app">
        <Sidebar ref="sidebar" />
    </div>
</template>

<script>
import { ref } from 'vue';
import Sidebar from './components/SideBar.vue';

export default {
    components: {
        Sidebar,
    },
    setup() {
        const sidebar = ref(null);

        function toggleNav() {
            if (sidebar.value) {
                sidebar.value.toggleNav();
            }
        }

        return {
            sidebar,
            toggleNav,
        };
    },
};
</script>

<style>
#main {
    transition: margin-left 0.5s;
    padding: 16px;
}

.openbtn {
    font-size: 20px;
    cursor: pointer;
    background-color: #111;
    color: white;
    padding: 10px 15px;
    border: none;
}
</style>

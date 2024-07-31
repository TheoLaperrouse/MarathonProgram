<template>
    <div>
        <div v-if="!training">{{ $t('noTraining') }}</div>
        <template v-else>
            <div class="text-2xl mb-2">{{ $t(type) }} :</div>
            <template v-if="['slowRun', 'mediumRun'].includes(type)">
                <div>
                    {{
                        $t('slowMediumRunDescription', {
                            time: training.time,
                            pace: paces[type].pace,
                            percentVMA: paces[type].percentVMA,
                        })
                    }}
                </div>
            </template>
            <template v-else-if="type === 'thresholdRun'">
                <div></div>
            </template>
            <template v-else-if="['intervalsRun', 'fastIntervalsRun'].includes(type)">
                <div></div>
            </template>
        </template>
    </div>
</template>
<script setup>
import { usePerformance } from '@/composables/usePerformance';
import { computed, toRefs } from 'vue';

const props = defineProps({
    training: Object,
});
const { training } = toRefs(props);
const { paces } = usePerformance();

const type = computed(() => training.value?.type);
</script>

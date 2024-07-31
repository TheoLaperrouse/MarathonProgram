<template>
    <div>
        <div v-if="!training">{{ $t('noTraining') }}</div>
        <template v-else>
            <div v-if="formattedDate" class="text-2xl mb-2">{{ formattedDate }} :</div>
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
import { useFormatter } from '@/composables/useFormatter';
import { usePerformance } from '@/composables/usePerformance';
import { computed, toRefs } from 'vue';

const props = defineProps({
    training: Object,
    date: String,
});
const { training, date } = toRefs(props);

const { paces } = usePerformance();
const { humanizeDate, parseDate } = useFormatter();

const formattedDate = computed(() => (date.value ? humanizeDate(parseDate(date.value)) : null));
const type = computed(() => training.value?.type);
</script>

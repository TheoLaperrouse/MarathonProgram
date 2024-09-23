<template>
    <div>
        <div v-if="!training">
            {{ $t('noTraining') }}
        </div>
        <template v-else>
            <div v-if="formattedDate" class="text-2xl mb-2 flex justify-between bold">
                {{ formattedDate }} :
                <div class="flex items-center">
                    <button
                        class="mr-2 text-base rounded-md bg-zinc-500 px-1 text-white shadow-md hover:bg-zinc-700"
                        v-if="isValidGarmin && !isTrainingMade(date)"
                        v-tooltip="$t('exportTraining')"
                        @click="sendWorkoutToGarmin"
                    >
                        <FontAwesomeIcon :icon="faCloudArrowUp"> </FontAwesomeIcon>
                    </button>
                    <input
                        class="w-6 h-6"
                        type="checkbox"
                        :checked="isTrainingMade(date)"
                        @change="updateMadeTrainings(date)"
                    />
                </div>
            </div>
            <div class="text-xl mb-2">
                <b>{{ $t(type) }}</b> ({{ paces[type].percentVMA }}% VMA / {{ paces[type].cardiacFrequency }} BPM) :
            </div>
            <template v-if="['mediumRun', 'longRun'].includes(type)">
                <div>
                    {{
                        $t('slowMediumRunDescription', {
                            time: training.time,
                            pace: paces[type].pace,
                        })
                    }}
                </div>
            </template>
            <template v-else-if="type === 'thresholdRun'">
                <div>
                    <span class="block">{{ $t('warmUpDescription', { warmUpTime: training.warmUpTime }) }}</span>
                    <span class="block">{{
                        $t('thresholdDescription', {
                            repetition: training.repetition,
                            distance: training.distance,
                            warmUpTime: training.warmUpTime,
                            recupTime: training.recupTime,
                        })
                    }}</span>
                </div>
            </template>
            <template v-else-if="type === 'fastIntervalsRun'">
                <div>
                    <span class="block">{{ $t('warmUpDescription', { warmUpTime: training.warmUpTime }) }}</span>
                    <span class="block">{{
                        $t('intervalDescription', {
                            intervalsRepetition: training.intervalsRepetition,
                            repetition: training.repetition,
                            time1: training.time1,
                            time2: training.time2,
                            warmUpTime: training.warmUpTime,
                            recupTime: training.recupTime,
                        })
                    }}</span>
                </div>
            </template>
            <template v-else-if="type === 'marathon'">
                <span class="block">{{ $t('marathonDescription', { expectedTime: marathonTime }) }}</span>
            </template>
        </template>
    </div>
</template>
<script setup>
import { useFormatter } from '@/composables/useFormatter';
import { useGarmin } from '@/composables/useGarmin';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, toRefs } from 'vue';

const props = defineProps({
    training: Object,
    date: String,
});
const { training, date } = toRefs(props);

const { paces, marathonTime } = usePerformance();
const { isTrainingMade, updateMadeTrainings } = useProgram();
const { humanizeDate, parseDate } = useFormatter();
const { sendWorkoutToGarmin, isValidGarmin } = useGarmin();

const formattedDate = computed(() => (date.value ? humanizeDate(parseDate(date.value)) : null));
const type = computed(() => training.value?.type);
</script>

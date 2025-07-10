<template>
    <div>
        <div v-if="!training" class="text-gray-600">
            {{ $t('noTraining') }}
        </div>

        <template v-else>
            <div class="flex justify-between mb-3">
                <div class="w-95 text-lg font-semibold text-gray-700">
                    {{ formattedDate }}
                </div>
                <div>
                    <input
                        class="w-5 h-5"
                        type="checkbox"
                        :checked="isTrainingMade(date)"
                        @change="updateMadeTrainings(date)"
                    />
                </div>
            </div>
            <div class="flex items-center mb-3">
                <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: paces[type].color }"></div>
                <h3 class="text-lg font-medium text-gray-800">
                    {{ $t(type) }} ({{ paces[type].percentVMA }}% VMA / ~{{ Math.round(paces[type].cardiacFrequency) }}
                    BPM)
                </h3>
            </div>
            <div class="text-gray-600 space-y-2 pl-5">
                <template v-if="['mediumRun', 'longRun'].includes(type)">
                    <p>
                        {{
                            $t('slowMediumRunDescription', {
                                time: training.time,
                                pace: paces[type].pace,
                            })
                        }}
                    </p>
                </template>

                <template v-else-if="type === 'thresholdRun'">
                    <p>{{ $t('warmUpDescription', { warmUpTime: training.warmUpTime }) }}</p>
                    <p>
                        {{
                            $t('thresholdDescription', {
                                repetition: training.repetition,
                                distance: training.distance,
                                warmUpTime: training.warmUpTime,
                                recupTime: training.recupTime,
                            })
                        }}
                    </p>
                </template>

                <template v-else-if="type === 'intervalsRun'">
                    <p>{{ $t('warmUpDescription', { warmUpTime: training.warmUpTime }) }}</p>
                    <p>
                        {{
                            $t('intervalDescription', {
                                intervalsRepetition: training.intervalsRepetition,
                                repetition: training.repetition,
                                time1: training.time1,
                                time2: training.time2,
                                warmUpTime: training.warmUpTime,
                                recupTime: training.recupTime,
                            })
                        }}
                    </p>
                </template>

                <template v-else-if="type === 'marathon'">
                    <p>{{ $t('marathonDescription', { expectedTime: marathonTime }) }}</p>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useFormatter } from '@/composables/useFormatter';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { computed, toRefs } from 'vue';

const props = defineProps({
    training: Object,
    date: String,
});
const { training, date } = toRefs(props);

const { paces, marathonTime } = usePerformance();
const { isTrainingMade, updateMadeTrainings } = useProgram();
const { humanizeDate, parseDate } = useFormatter();

const formattedDate = computed(() => (date.value ? humanizeDate(parseDate(date.value)) : null));
const type = computed(() => training.value?.type);
</script>

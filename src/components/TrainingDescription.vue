<template>
    <div>
        <div v-if="!training" class="text-gray-600">
            {{ $t('noTraining') }}
        </div>
        <template v-else>
            <div class="flex justify-between mb-3">
                <div class="font-semibold text-gray-700">
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
                <h3 class="font-medium text-gray-900">
                    {{ $t(type) }} ( ~{{ Math.round(paces[type].cardiacFrequency) }} {{ $t('BPM') }}) :
                </h3>
            </div>
            <div class="text-sm text-gray-800 space-y-2 pl-5">
                <template v-if="type === 'longRun'">
                    <p>
                        {{
                            $t('slowRunDescription', {
                                time: training.time,
                                pace: paces['longRun'].pace,
                            })
                        }}
                    </p>
                </template>
                <template v-else-if="type === 'mediumRun'">
                    <p>
                        {{
                            $t('mediumRunDescription', {
                                time: training.time,
                                pace: paces['mediumRun'].pace,
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
                                pace: paces['thresholdRun'].pace,
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
                                pace: paces['intervalsRun'].pace,
                            })
                        }}
                    </p>
                </template>

                <template v-else-if="type === 'marathon'">
                    <p>{{ $t('marathonDescription', { expectedTime: marathonTime, pace: paces['marathon'].pace }) }}</p>
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

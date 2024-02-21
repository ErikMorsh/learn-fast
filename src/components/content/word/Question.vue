<template>
    <v-col class="bg-blue-lighten-1">
        <v-row class="ma-0 d-flex justify-space-between"
               style="height: 10%">
            <v-col cols="2">
                <v-btn>
                    Edit Card
                </v-btn>
            </v-col>
            <v-col cols="2">
                <h3>Question</h3>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-2 d-flex justify-space-between"
               style="height: 77%">
            <v-col cols="12">
                <v-card class="h-100 bg-cyan-lighten-3 pa-5">
                    <transition>
                        <p v-if="contentVisible">{{ content }}</p>
                    </transition>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-2 d-flex justify-space-between"
               style="height: 10%">
            <v-col cols="6"
                   class="d-flex justify-start py-0 align-center">
                <v-card :color="wordStateColor">
                    <v-card-text class="text-uppercase py-2">{{ wordState
                    }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6"
                   class="d-flex justify-end py-0 align-center">
                <v-btn @click="handleShowAnswer">Show answer</v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    props: ['content', 'selection'],
    emits: ['toggle-content'],
    data: function () {
        return {
            contentVisible: false
        }
    },
    watch: {
        content: function () {
            this.contentVisible = false
            setTimeout(() => this.contentVisible = true, 10)
        }
    },
    computed: {
        wordState: function () {
            return this.selection !== null ? 'Selected' : 'Not Selected'
        },
        wordStateColor: function () {
            if (this.selection)
                return 'green-accent-3'
            else if (this.selection === false)
                return 'deep-orange-accent-3'
            // third option is that no state selected initially
            // this.selection === null
            // return 'nothing'
        }
    },
    methods: {
        handleShowAnswer: function () {
            this.$emit('toggle-content', 'Answer')
        }
    },
    mounted() {
        this.contentVisible = true
    },
}
</script>

<style scoped>
.v-enter-from {
    opacity: 0;
    transform: translateX(-50px)
}

.v-enter-active {
    transition: all 0.2s ease-out
}

.v-enter-to {
    opacity: 1;
    transform: translateX(0px)
}
</style>
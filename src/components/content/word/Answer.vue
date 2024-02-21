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
                <h3>Answer</h3>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-2 d-flex justify-space-between"
               style="height: 77%">
            <v-col cols="12">
                <v-card class="h-100 bg-cyan-lighten-3 pa-5">
                    <p>{{ content }}</p>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-2 d-flex"
               style="height: 10%">
            <v-col cols="4"
                   class="d-flex justify-end py-0 align-center">
                <v-btn @click="handleSelection(true)"
                       :color="selectBtnFinalColor('green')"
                       class="w-100">I Knew it</v-btn>
            </v-col>
            <v-col cols="4"
                   class="d-flex justify-end py-0 align-center">
                <v-btn @click="handleSelection(false)"
                       :color="selectBtnFinalColor('red')"
                       class="w-100">I Didn't Know</v-btn>
            </v-col>
            <v-col cols="4"
                   class="d-flex justify-end py-0 align-center">
                <v-btn @click="handleShowQuestion">Show Question</v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    props: ['content', 'selection'],
    emits: ['selection-done', 'toggle-content'],
    data: function () {
        return {
            reviewResult: this.selection
        }
    },
    methods: {
        selectBtnFinalColor: function (btn) {
            if (btn === 'green') {
                if (this.reviewResult === null || this.reviewResult === true)
                    return 'green-accent-3'
                else
                    return 'grey'
            }
            else {
                if (this.reviewResult === null || this.reviewResult === false)
                    return 'deep-orange-accent-3'
                else
                    return 'grey'
            }

        },
        handleSelection: function (state) {
            this.reviewResult = state
            this.$emit('selection-done', state)
        },
        handleShowQuestion: function () {
            this.$emit('toggle-content', 'Question')
        }
    },
}
</script>
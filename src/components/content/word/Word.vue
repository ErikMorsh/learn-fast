<template>
    <v-card elevated
            class="stage-card d-flex flex-column pa-2 bg-blue-lighten-5">

        <!-- Info -->
        <v-row class="bg-blue-lighten-3 ma-0"
               style="height: 10%">
            <v-col cols="2"
                   class="bg-yellow-lighten-1 d-flex justify-center">
                <h2>Stage {{ stageId }}</h2>
            </v-col>
            <v-col class="bg-green-lighten-1 d-flex justify-center align-center"
                   cols="4">
                <p class="mr-6">Ready to review:</p>
                <span>{{ stageWords.length - stetedCount }}</span>
            </v-col>
            <v-col class="bg-green-lighten-1 d-flex justify-center align-center"
                   cols="4">
                <p class="mr-6">Reviewed:</p>
                <span>{{ stetedCount }}</span>
            </v-col>
            <v-col class="bg-green-lighten-1 d-flex justify-center align-center"
                   cols="2">
                <span>{{ currentWordIndex + 1 }} / {{ stageWords.length }}</span>
            </v-col>
        </v-row>

        <!-- Indication -->
        <v-row class="bg-blue-lighten-3 ma-0 mt-2"
               style="height: 90%">

            <!-- Previous Btn -->
            <v-col cols="1"
                   class="pa-0">
                <v-hover>
                    <template #default="{ isHovering, props }">
                        <v-card @click="previousWordClicked"
                                v-bind="props"
                                v-ripple
                                :disabled="currentWordIndex === 0"
                                :color="isHovering ? 'blue-darken-1' : 'blue-darken-2'"
                                class="h-100 d-flex justify-center align-center">
                            <v-icon icon="mdi-chevron-left"
                                    :size="isHovering ? 60 : 50"
                                    style="transition: all 0.05s ease-in-out"></v-icon>
                        </v-card>

                    </template>
                </v-hover>
            </v-col>

            <!-- Word Indication -->
            <transition name="toggle"
                        mode="out-in">
                <Question v-if="currentIndication === 'Question'"
                          :content="pageContent"
                          :selection="selectedState"
                          @toggle-content="toggleContent" />
                <Answer v-else
                        :content="pageContent"
                        :selection="selectedState"
                        @toggle-content="toggleContent"
                        @selection-done="stateWord" />
            </transition>

            <!-- Next Btn -->
            <v-col cols="1"
                   class="pa-0">
                <v-hover>
                    <template #default="{ isHovering, props }">
                        <v-card @click="nextWordClicked"
                                v-bind="props"
                                v-ripple
                                :disabled="stageWords.length - 1 === currentWordIndex"
                                :color="isHovering ? 'blue-darken-1' : 'blue-darken-2'"
                                class="h-100 d-flex justify-center align-center">
                            <v-icon icon="mdi-chevron-right"
                                    :size="isHovering ? 60 : 50"
                                    style="transition: all 0.05s ease-in-out"></v-icon>
                        </v-card>

                    </template>
                </v-hover>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import Answer from './Answer.vue'
import Question from './Question.vue'

export default {
    components: {
        Question,
        Answer
    },
    props: ['groupId', 'stageId'],
    data: function () {
        return {
            currentIndication: 'Question',
            currentWordIndex: 0,
        }
    },
    computed: {
        words: function () {
            return this.$store.getters.getGroupWords(this.groupId)
        },
        stageWords: function () {
            return this.words.filter(word => word.stage === this.stageId)

        },
        currentWord: function () {
            return this.stageWords[this.currentWordIndex]
        },
        pageContent: function () {
            if (this.currentIndication === 'Question')
                return this.currentWord.question
            else
                return this.currentWord.answer
        },
        selectedState: function () {
            const result = this.$store.state.wordSelectedStates.find(state => state.wordId === this.currentWord.id)

            if (result === undefined)
                return null
            else
                return result.state
        },
        stetedCount: function () {
            return this.$store.state.wordSelectedStates.length
        }
    },
    methods: {
        toggleContent: function (content) {
            this.currentIndication = content
        },
        nextWordClicked: function () {
            if (this.currentWordIndex + 1 < this.stageWords.length) {
                this.currentWordIndex++
                this.currentIndication = 'Question'
            }
        }
        ,
        previousWordClicked: function () {
            this.currentWordIndex--
            this.currentIndication = 'Question'
        },
        stateWord: function (state) {
            // collect words that has selected state
            const result = this.$store.state.wordSelectedStates.findIndex(state => state.wordId === this.currentWord.id)

            if (result >= 0)
                this.$store.state.wordSelectedStates.splice(result, 1)

            this.$store.state.wordSelectedStates.push({
                wordId: this.currentWord.id,
                stage: this.stageId,
                state,
                reviewTime: Date.now()
            })

            // check for all reviews
            this.submitStatedWords()

            this.nextWordClicked()
        },

        submitStatedWords: function () {
            if (this.$store.state.wordSelectedStates.length === this.stageWords.length) {
                // Time to save this review to server
                confirm('You finished all words, select other stage!')
                // this.$store.state.wordSelectedStates.forEach(item => {
                // });
                // Prevent empty stage decleration && submit
                setTimeout(() => {
                    this.$store.dispatch('submitStatedWords', { event: 'stage-finish' })
                }, 10);

                // return to stage selection && clearing all caches
                const groupId = this.$route.params.groupId
                this.$router.replace('/groups/' + groupId)
            }
        },
        submitStatedWordsOnStateChange: function () {
            this.$store.dispatch('submitStatedWords', { event: 'stage-change' })

            // clear cache manualy
            this.currentIndication = 'Question'
            this.currentWordIndex = 0
        },
        submitStetedWordsForcedLeave: function () {
            // This one needs a Navigation Guard
            // Time to save this review to server

            console.log('shit')

            // empty store
            this.$store.state.onboardStage = null
            this.$store.state.wordSelectedStates = []

            // return to stage selection
            const groupId = this.$route.params.groupId
            this.$router.replace('/groups/' + groupId)
        }
    },
    beforeUpdate() {
        // submit what has been reviewed till now
        this.submitStatedWordsOnStateChange()
    }
}
</script>

<style scoped>
li {
    margin-right: 5px;
}

.stage-card {
    height: 100%;
}

.title {
    width: auto;
    height: 25%;
    border-radius: 5px;
}

.info {
    width: 100%;
    height: 75%;
    font-size: small;
}

.toggle-enter-from {
    opacity: 0.3;
}

.toggle-enter-active {
    transition: opacity .2s ease-out;
}

.toggle-enter-to {
    opacity: 1;
}
</style>
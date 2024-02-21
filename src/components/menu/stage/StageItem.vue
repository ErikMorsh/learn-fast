<template>
    <li>
        <v-hover>
            <template v-slot:default="props">
                <v-card width="10vw"
                        elevated
                        :disabled="!activeWords.length"
                        class="stage-card d-flex flex-column pa-2 "
                        :class="activeWords.length ? 'cursor-pointer' : 'cursor-not-allowed'"
                        :color="props.isHovering ? 'red-lighten-4' : stageBaseColor"
                        v-bind="props.props"
                        v-ripple
                        @click="stageClicked">


                    <!-- Title -->
                    <div class="title d-flex justify-center">
                        <h3>Stage {{ id }}</h3>
                    </div>
                    <!-- Words Information -->
                    <div class="info d-flex flex-column justify-center align-start pa-0">
                        <div class="d-flex justify-space-between w-100 px-1">
                            <p>All Words:</p>
                            <span>{{ stageWords.length }}</span>
                        </div>

                        <div class="d-flex justify-space-between w-100 rounded mt-1 px-1"
                             :class="activeWords.length ? 'bg-green-lighten-1' : 'bg-red-lighten-1'">
                            <p>Ready:</p>
                            <span>{{ activeWords.length }}</span>
                        </div>
                    </div>
                </v-card>
            </template>
        </v-hover>
    </li>
</template>

<script>

export default {
    props: ['id', 'words', 'delayTime'],
    created() {
        // Prevent from wrong view of stage when page refreshed manually
        if (!null) {
            const groupId = this.$route.params.groupId
            this.$router.replace('/groups/' + groupId)
        }
    },
    beforeUnmount() {
        this.$store.state.onboardStage = null
    },
    computed: {
        onboardStage: function () {
            return this.$store.state.onboardStage
        },
        stageWords: function () {
            return this.words.filter((word) => word.stage === this.id);
        },
        activeWords: function () {
            const now = Date.now();
            let oneDay = 60 * 60 * 1000;
            if (this.id === 1)
                oneDay = 1
            return this.stageWords.filter(word => now - word.reviewTime > oneDay * this.id)
        },
        stageBaseColor: function () {
            return this.onboardStage === this.id ? 'red' : 'white'
        }
    },
    methods: {
        stageClicked: function () {
            // This stage is on bord
            const groupId = this.$route.params.groupId
            this.$router.replace('/groups/' + groupId + '/' + this.id)

            // Set stage to onboard
            this.$store.state.onboardStage = this.id
        },
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
</style>
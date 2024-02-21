<template>
    <div class="container">
        <ul>
            <StageItem v-for="i in 12"
                       :key="i"
                       :id="i"
                       :words="groupWords" />
        </ul>
    </div>
</template>

<script>
import StageItem from './StageItem.vue';
export default {
    components: {
        StageItem
    },
    data: function () {
        return {
            groupId: null
        }
    },
    computed: {
        groupWords: function () {
            return this.$store.getters.getGroupWords(this.groupId)
        },
    },
    created() {
        // remember that params always cache String
        this.groupId = parseInt(this.$route.params.groupId)
    }
}
</script>

<style scoped>
ul {
    display: flex;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
}

.container {
    padding: 5px;
}
</style>
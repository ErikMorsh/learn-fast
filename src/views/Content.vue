<template>
    <div class="containter"
         :class="{ 'overflow-y-scroll': page === 'groups' }">
        <GroupList v-if="page === 'groups'" />
        <Word v-else-if="page === 'word'"
              :groupId="groupId"
              :stageId="stageId" />
        <h1 v-else-if="page === 'pick'">Select A Stage To Start Review...</h1>
    </div>
</template>

<script>
import GroupList from '../components/content/group/GroupList.vue';
import Word from '../components/content/word/Word.vue';

export default {
    components: {
        GroupList,
        Word
    },
    data: function () {
        return {
            page: 'groups',
            groupId: null,
            stageId: null,
        }
    },
    methods: {
        updatePage: function () {
            const hasGroup = parseInt(this.$route.params.groupId)
            const hasStage = parseInt(this.$route.params.stageId)

            this.page = 'groups'
            if (hasGroup) {
                this.page = 'pick'
                this.groupId = hasGroup
            }
            if (hasStage) {
                this.page = 'word'
                this.stageId = hasStage
            }

        }
    },
    created() {
        this.updatePage()
    },
    beforeUpdate() {
        this.updatePage()
    }
}
</script>

<style scoped>
.containter {
    border: solid blue 5px;
    width: 100%;
    height: inherit;
}

.overflow-y-scroll {
    overflow-y: scroll;
}
</style>
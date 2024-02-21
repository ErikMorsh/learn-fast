<template>
    <div class="container bg-grey-lighten-3">
        <StageList v-if="page === 'stage'" />
        <h1 v-else>Menu</h1>
    </div>
</template>

<script>
import StageList from '../components/menu/stage/StageList.vue';

export default {
    components: {
        StageList
    },
    data: function () {
        return {
            page: 'menu'
        }
    },
    methods: {
        updatePage: function () {
            const hasGroup = this.$route.params.groupId
            if (hasGroup)
                this.page = 'stage'
            else
                this.page = 'menu'
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
.container {
    border: red solid 5px;
    width: 100%;
    height: 100%;
}
</style>
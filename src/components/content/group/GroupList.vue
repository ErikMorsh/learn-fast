<template>
    <v-container>
        <v-row class="flex-row-reverse">
            <GroupItem v-for="group of groups"
                       :key="group.id"
                       :id="group.id"
                       :name="group.name" />
        </v-row>
    </v-container>
</template>

<script>
import GroupItem from './GroupItem.vue';
export default {
    components: {
        GroupItem
    },
    data: function () {
        return {

        }
    },
    computed: {
        groups: function () {
            return this.$store.getters.getGroups
        }
    },
    created() {
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    border: dotted 2px red;
}

.item {

    border: solid 2px green
}
</style>
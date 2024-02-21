<template>
    <div class="container">
        <PanelActions />
    </div>
</template>

<script>
import PanelActions from '../components/panel/actions/PanelActions.vue'
export default {
    components: {
        PanelActions
    }
}
</script>

<style scoped>
.container {
    border: green solid 5px;
    width: 100%;
    height: 100%;
}
</style>
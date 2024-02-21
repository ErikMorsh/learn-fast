<template>
    <v-dialog>
        <template v-slot:activator="{ props }">
            <slot name="activator"
                  v-bind="props"></slot>
        </template>

        <template v-slot:default="{ isActive }">
            <slot name="content"
                  v-bind="isActive"></slot>
        </template>
    </v-dialog>
</template>

<script>
export default {

}
</script>
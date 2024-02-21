<template>
    <base-modal>
        <template #activator="props">
            <v-row class="ma-0 pa-0">
                <v-col cols="12"
                       class="pb-0"
                       v-if="currentPage === 'group'">
                    <v-btn v-bind="props"
                           @click="handleAction('add-group')"
                           class="w-100"
                           color="green-accent-3">

                        New Group
                    </v-btn>
                </v-col>
                <v-col cols="12"
                       v-else-if="currentPage === 'stage'">
                    <v-btn v-bind="props"
                           @click="handleAction('add-word')"
                           class="w-100"
                           color="green-accent-3">
                        new word
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <template #content="isActive">
            <div class="d-flex justify-center">
                <!-- Forms -->
                <AddGroup v-if="activeModal === 'add-group'"
                          :isActive="isActive" />
                <AddWord v-else-if="activeModal === 'add-word'"
                         :isActive="isActive"
                         :groupId="groupId" />
            </div>
        </template>
    </base-modal>
</template>

<script>
import AddGroup from './AddGroup.vue'
import AddWord from './AddWord.vue'

export default {
    components: {
        AddGroup,
        AddWord
    },
    data: function () {
        return {
            currentPage: '',
            activeModal: '',
            modalActivation: true,
            groupId: null

        }
    },
    watch: {
        $route: function (newRoute) {
            this.currentPage = newRoute.params.groupId ? 'stage' : 'group'
            this.groupId = parseInt(newRoute.params.groupId)
        }
    },
    created() {
        this.currentPage = this.$route.params.groupId ? 'stage' : 'group'
        this.groupId = parseInt(this.$route.params.groupId)
    },
    methods: {
        handleAction: function (action) {
            if (action === 'add-group')
                this.activeModal = 'add-group'
            else if (action === 'add-word')
                this.activeModal = 'add-word'


        },
        closeModal: function () {

            this.modalActivation = false
        }
    }
}
</script>
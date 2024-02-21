<template>
    <v-card width="60vw"
            height="50vh">
        <v-form @submit.prevent>
            <v-row class="ma-0 mt-15">
                <v-col cols="12"
                       class="d-flex justify-center">
                    <h1>Create New Group</h1>
                </v-col>
            </v-row>
            <v-row class="ma-0 mt-5 mb-5 d-flex justify-center">
                <v-col cols="8">
                    <v-text-field label="Group Name"
                                  v-model="groupName"
                                  :rules="rules"
                                  hide-details="auto"></v-text-field>
                </v-col>
            </v-row>

            <v-row class="ma-0 mt-5 d-flex justify-space-evenly">
                <v-col cols="3">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn @click="handleAction('add')"
                                   type="submit"
                                   class="w-100"
                                   v-bind="props"
                                   :color="isHovering ? 'green-accent-3' : undefined">Add</v-btn>
                        </template>
                    </v-hover>
                </v-col>
                <v-col cols="3">
                    <v-btn @click="handleAction('cancel')"
                           class="w-100">Cancel</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
export default {
    props: ['isActive'],
    data: function () {
        return {
            groupName: '',
            rules: [
                value => {
                    if (value && value.length >= 3)
                        return true
                    else if (value && value.length < 3)
                        return 'Min 3 characters'
                    else if (!value)
                        return 'Group name is required.'
                }
            ],

        }
    },
    methods: {
        handleAction: function (action) {
            if (action === 'cancel') {
                // cancel btn
                this.isActive.value = false
            } else {
                // add btn
                if (this.rules[0](this.groupName) === true) {
                    // Do Action
                    const newGroup = {
                        groupName: this.groupName.charAt(0).toUpperCase() + this.groupName.slice(1)
                    }
                    this.$store.dispatch('submitNewGroup', newGroup)

                    this.isActive.value = false
                }

            }
        }
    }
}
</script>


<template>
    <v-col cols="3">
        <v-hover>
            <template v-slot:default="props">
                <v-card height="220"
                        class="d-flex flex-column pa-2 cursor-pointer "
                        :color="props.isHovering ? 'blue-darken-2' : 'blue-lighten-2'"
                        v-bind="props.props"
                        v-ripple
                        @click="groupClicked">


                    <!-- Title -->
                    <div class="title d-flex justify-center align-center pa-2"
                         :class="props.isHovering ? '' : 'bg-blue-lighten-5'">
                        <h3>{{ name }}</h3>
                    </div>
                    <!-- Words Information -->
                    <div class="info d-flex flex-column justify-center align-start pa-5">
                        <div class="d-flex justify-space-between w-100">
                            <p>All Words:</p>
                            <span>{{ groupWords.length }}</span>
                        </div>
                        <div class="d-flex justify-space-between w-100">
                            <p>Active Words:</p>
                            <span>{{ groupActiveWords.length }}</span>
                        </div>
                    </div>

                    <!-- A Button For Edit The Group Informaiton -->
                    <div @click.stop
                         class="edit d-flex align-center">
                        <v-hover>
                            <template v-slot:default="props2">
                                <v-btn variant="elevated"
                                       size="x-small"
                                       icon="mdi-pencil"
                                       v-bind="props2.props"
                                       :color="props2.isHovering ? 'orange-lighten-2' : 'blue-lighten-4'"
                                       @click="editClicked">
                                </v-btn>
                            </template>
                        </v-hover>
                    </div>
                </v-card>
            </template>
        </v-hover>
    </v-col>
</template>

<script>
export default {
    props: ['id', 'name'],
    computed: {
        groupWords: function () {
            return this.$store.getters.getGroupWords(this.id)
        },
        groupActiveWords: function () {
            return this.$store.getters.getGroupActiveWords(this.id)
        }
    },
    methods: {
        editClicked: function () {
            confirm("This will be the Edit Modal later.")
        },
        groupClicked: function () {
            setTimeout(() => {
                this.$router.push(`/groups/${this.id}`)
            }, 300);
        }
    }
}
</script>

<style scoped>
.title {
    width: auto;
    height: 55%;
    border-radius: 5px;
}

.info {
    width: 100%;
    height: 30%;
    font-size: small;
}

.edit {
    width: fit-content;
    height: 15%;
}
</style>
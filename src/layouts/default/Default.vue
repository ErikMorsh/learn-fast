<template>
    <v-app>
        <v-main>
            <v-row class="ma-0">
                <v-col cols="10"
                       class="pa-0"
                       style="height: 100dvh">
                    <v-col cols="12"
                           style="height: 22.5dvh">
                        <MenuBar />
                    </v-col>
                    <v-col cols="12"
                           style="height: 75dvh">
                        <ContentView />
                    </v-col>
                </v-col>
                <v-col cols="2"
                       style="height: 100dvh">
                    <PanelSideBar />
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script setup>
import MenuBar from './MenuBar.vue'
import PanelSideBar from './PanelSideBar.vue'
import ContentView from './ContentView.vue'
</script>

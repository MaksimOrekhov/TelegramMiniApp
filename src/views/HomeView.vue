<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { Alert, MainButton } from 'vue-tg'

function handleAlertClose() {
    // ...
}

function handleBackButton() {
    // ...
}
</script>

<template>
  <main>
    <TheWelcome />
<!--      <Alert message="Hello!" @close="handleAlertClose" />-->
      <MainButton @click="handleBackButton" />
  </main>
</template>

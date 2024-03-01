<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { Alert, MainButton } from 'vue-tg'
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

function handleAlertClose() {
    // ...
}

function handleBackButton() {
    // ...
}

const result = ref('')
const scanning = ref(false)

function startScanning() {
    scanning.value = true
}

function onDecode(content) {
    result.value = content
    scanning.value = false
}

function onInit(promise) {
    promise.then(() => {
        console.log('Ready to scan!')
    }, error => {
        if (error.name === 'NotAllowedError') {
            // пользователь отказался предоставить доступ к камере
        } else if (error.name === 'NotFoundError') {
            // нет устройства для захвата медиа
        } else if (error.name === 'NotReadableError') {
            // невозможно получить поток медиа
        } else if (error.name === 'OverconstrainedError') {
            // ограничения не могут быть удовлетворены
        } else {
            // другая ошибка
        }
    })
}
</script>

<template>
  <main>
    <TheWelcome />
<!--      <Alert message="Hello!" @close="handleAlertClose" />-->
      <MainButton @click="handleBackButton" />
      <button @click="startScanning">Начать сканирование</button>
      <qrcode-stream v-if="scanning" @decode="onDecode" @init="onInit"></qrcode-stream>
      <p>{{ result }}</p>
  </main>
</template>

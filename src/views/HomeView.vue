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
const errorMessage = ref('')

function startScanning() {
    scanning.value = true
}

function onDetect(content) {
    result.value = JSON.parse(content)
    scanning.value = false
    window.open(content.rawValue)
}

function onInit(promise) {
    promise.then(() => {
        console.log('Ready to scan!')
    }, error => {
        if (error.name === 'NotAllowedError') {
            errorMessage.value = 'пользователь отказался предоставить доступ к камере'
            // пользователь отказался предоставить доступ к камере
        } else if (error.name === 'NotFoundError') {
            errorMessage.value = 'нет устройства для захвата медиа'
            // нет устройства для захвата медиа
        } else if (error.name === 'NotReadableError') {
            errorMessage.value = 'невозможно получить поток медиа'
            // невозможно получить поток медиа
        } else if (error.name === 'OverconstrainedError') {
            errorMessage.value = 'ограничения не могут быть удовлетворены'
            // ограничения не могут быть удовлетворены
        } else {
            errorMessage.value = error
            // другая ошибка
        }
    })
}
</script>

<template>
  <main>
    <TheWelcome />
      <Alert :message=errorMessage @close="handleAlertClose" />
      <MainButton @click="handleBackButton" />
      <button @click="startScanning">Начать сканирование</button>
      <qrcode-stream v-if="scanning" @detect="onDetect" @init="onInit"></qrcode-stream>
      <p>{{ result }}</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
  </main>
</template>

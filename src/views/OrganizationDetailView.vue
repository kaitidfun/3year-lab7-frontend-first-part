<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import type { Organizer } from '@/types'

const route = useRoute()
const organizer = ref<Organizer | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  const { data } = await OrganizerService.getOrganizer(id)
  organizer.value = data
})
</script>

<template>
  <div class="max-w-2xl mx-auto text-center space-y-3">
    <h1 class="text-3xl font-semibold">Organizer Detail</h1>

    <div v-if="organizer">
      <p class="text-xl font-medium">Name: {{ organizer.name }}</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

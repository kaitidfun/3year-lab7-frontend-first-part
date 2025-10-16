<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import type { Organizer } from '@/types'

const router = useRouter()
const route = useRoute()

const isEdit = route.params.id !== undefined
const form = ref<Organizer>({
  id: 0,
  name: ''
})

if (isEdit) {
  const id = Number(route.params.id)
  OrganizerService.getOrganizer(id).then(res => {
    form.value = res.data
  })
}

async function onSubmit() {
  if (!form.value.name.trim()) return

  if (isEdit) {
    const id = Number(route.params.id)
    await OrganizerService.updateOrganizer(id, { name: form.value.name.trim() })
    router.push({ name: 'organization-detail', params: { id } })
  } else {
    const { data } = await OrganizerService.createOrganizer({ name: form.value.name.trim() })
    router.push({ name: 'organization-detail', params: { id: data.id } })
  }
}
</script>

<template>
  <div class="max-w-md mx-auto space-y-4">
    <h2 class="text-2xl font-semibold">
      {{ isEdit ? 'Edit Organizer' : 'New Organizer' }}
    </h2>

    <label class="block text-sm font-medium">Organizer Name</label>
    <input
      v-model="form.name"
      type="text"
      class="w-full border rounded p-2"
      placeholder="Enter organizer name"
    />

    <button
      class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      type="button"
      @click="onSubmit"
    >
      {{ isEdit ? 'Save' : 'Create' }}
    </button>
  </div>
</template>

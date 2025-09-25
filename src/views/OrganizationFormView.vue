<script setup lang="ts">
import type { Organization } from '@/types'
import { ref } from 'vue'
import OrganizationService from '@/services/OrganizationService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organization = ref<Organization>({
  organizationName: '',
  address: ''
})

const router = useRouter()
const store = useMessageStore()

function saveOrganization() {
  OrganizationService.saveOrganization(organization.value)
    .then((response) => {
      // หลังบันทึกเสร็จ redirect ไปหน้า detail หรือ list
      router.push({ name: 'organizer-detail-view', params: { id: response.data.id } })
      store.updateMessage('You have successfully added a new organization: ' + response.data.organizationName)
      setTimeout(() => { store.resetMessage() }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organization</h1>
    <form @submit.prevent="saveOrganization">
      <label>Organization Name</label>
      <input v-model="organization.organizationName" type="text" placeholder="Organization Name" class="field" />

      <label>Address</label>
      <input v-model="organization.address" type="text" placeholder="Address" class="field" />

      <button class="button" type="submit">Submit</button>
    </form>

    <pre>{{ organization }}</pre>
  </div>
</template>

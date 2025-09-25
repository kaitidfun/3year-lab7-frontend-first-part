<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrganizationService from '@/services/OrganizationService'
import type { Organization } from '@/types'

const route = useRoute()
const router = useRouter()
const organization = ref<Organization | null>(null)

onMounted(() => {
  const id = Number(route.params.id)
  OrganizationService.getOrganization(id)
    .then(res => { organization.value = res.data })
    .catch(err => {
      if (err.response?.status === 404) {
        router.push({ name: '404-resource-view', params: { resource: 'organization' } })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
</script>

<template>
  <div v-if="organization">
    <p>{{ organization.organizationName }} @ {{ organization.address }}</p>
  </div>
  <div v-else>
    <!-- loading state (ถ้าต้องการ) -->
  </div>
</template>

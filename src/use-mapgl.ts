import { computed, getCurrentInstance, watch } from 'vue'
import type { Mapgl } from './types'

const onMapglReadyCbs: Array<(sdk: Mapgl) => void> = []

export function useMapgl() {
  const mapgl = getCurrentInstance()?.appContext.config.globalProperties.$mapgl

  if (!mapgl) {
    console.warn('Mapgl plugin must be installed before useMapgl call.')
    return {
      loading: computed(() => false),
      sdk: computed(() => null),
      onMapglReady: () => {},
    }
  }

  const loading = computed(() => !mapgl.sdk.value)
  const sdk = computed(() => mapgl.sdk.value)

  const unwatch = watch(
    sdk,
    _sdk => {
      if (_sdk) {
        onMapglReadyCbs.forEach(cb => cb(_sdk))
        onMapglReadyCbs.length = 0
        unwatch()
      }
    },
    { immediate: true },
  )

  function onMapglReady(cb: (sdk: Mapgl) => void) {
    if (sdk.value) {
      cb(sdk.value)
    } else {
      onMapglReadyCbs.push(cb)
    }
  }

  return {
    loading,
    sdk,
    onMapglReady,
  }
}

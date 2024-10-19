import { provide, shallowRef, watch, onScopeDispose } from 'vue'
import type { MapOptions } from '@2gis/mapgl/types/types'
import { mapglInjectionKey } from './consts'
import type { MapReadyCb, MapIsntance } from './types'
import { useMapgl } from './use-mapgl'

const onMapReadyCbs: MapReadyCb[] = []

export function useMap() {
  const map = shallowRef<MapIsntance>()
  const { sdk, onMapglReady } = useMapgl()

  provide(mapglInjectionKey, { onMapReady })

  const unwatch = watch(
    map,
    _map => {
      if (_map) {
        onMapReadyCbs.forEach(cb => cb(sdk.value!, _map))
        onMapReadyCbs.length = 0
        unwatch()
      }
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    if (map.value) {
      map.value.destroy()
    }
  })

  function createMap(el: HTMLElement | string, options: MapOptions) {
    onMapglReady(sdk => {
      map.value = new sdk.Map(el, options)
    })
  }

  function onMapReady(cb: MapReadyCb) {
    if (map.value) {
      cb(sdk.value!, map.value)
    } else {
      onMapReadyCbs.push(cb)
    }
  }

  return {
    createMap,
  }
}

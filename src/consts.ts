import type { InjectionKey } from 'vue'
import type { MapReadyCb } from './types'

export const mapglInjectionKey: InjectionKey<{
  onMapReady: (cb: MapReadyCb) => void
}> = Symbol('mapgl-vue')

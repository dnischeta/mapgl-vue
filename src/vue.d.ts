import type { ShallowRef } from 'vue'
import { Mapgl } from './types'

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $mapgl: { sdk: ShallowRef<Mapgl | undefined> }
  }
}

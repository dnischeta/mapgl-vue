import { load } from '@2gis/mapgl'
import { shallowRef, type Plugin } from 'vue'
import type { Mapgl } from './types'

type MapglPluginOptions = { url: string }

export const plugin: Plugin<MapglPluginOptions[]> = {
  install(app, options) {
    const url: string | undefined = options?.url
    const sdk = shallowRef<Mapgl | undefined>()

    load(url).then(mapgl => {
      sdk.value = mapgl
    })

    app.config.globalProperties.$mapgl = { sdk }
  },
}

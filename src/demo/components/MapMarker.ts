import { defineComponent } from 'vue'
import { useMapChild } from '../../use-map-child'

export default defineComponent({
  setup() {
    const { onMapReady } = useMapChild()

    onMapReady((sdk, map) => {
      new sdk.Marker(map, {
        coordinates: map.getCenter(),
      })
    })

    return () => null
  },
})

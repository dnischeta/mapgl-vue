import { inject } from 'vue'
import { mapglInjectionKey } from './consts'

export function useMapChild() {
  const mapglInjection = inject(mapglInjectionKey)

  if (!mapglInjection) {
    console.warn(
      'useMapChild must be called only from ancestor of the component which executes useMap.',
    )
    return {
      onMapReady: () => {},
    }
  }

  return {
    onMapReady: mapglInjection.onMapReady,
  }
}

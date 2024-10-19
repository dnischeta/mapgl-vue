# mapgl-vue

A Vue 3 wrapper for the 2GIS MapGL library.

## Installation

```sh
npm install mapgl-vue
```

## Usage

First, install the plugin in your main Vue application file:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { vueMapglPlugin } from 'mapgl-vue'

createApp(App)
  .use(vueMapglPlugin)
  .mount('#app')
```

## Exported Entities

The library exports the following entities:

### vueMapglPlugin

A Vue plugin that initializes the 2GIS MapGL library. It should be installed using `app.use()` as shown in the usage example above.

### useMapgl

A composable function that provides access to the MapGL SDK. It returns an object with the following properties:

- `loading`: A computed ref indicating whether the SDK is still loading.
- `sdk`: A computed ref containing the MapGL SDK once it's loaded.
- `onMapglReady`: A function that takes a callback to be executed when the SDK is ready.

Example usage:

```vue
<script setup>
import { useMapgl } from 'mapgl-vue'

const { loading, sdk, onMapglReady } = useMapgl()

onMapglReady((mapglSdk) => {
  // Use mapglSdk here
})
</script>
```

### useMap

A composable function for creating and managing a MapGL instance. It returns an object with the following method:

- `createMap`: A function that takes an HTML element (or its ID) and map options to create a new map instance.

Example usage:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useMap } from 'mapgl-vue'

const mapContainer = ref(null)
const { createMap } = useMap()

onMounted(() => {
  createMap(mapContainer.value, { center: [55.31878, 25.23584], zoom: 13 })
})
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 400px;"></div>
</template>
```

### useMapChild

A composable function for child components that need to interact with the map instance. It provides:

- `onMapReady`: A function that takes a callback to be executed when both the SDK and map instance are ready.

Example usage:

```vue
<script setup>
import { useMapChild } from 'mapgl-vue'

const { onMapReady } = useMapChild()

onMapReady((sdk, map) => {
  // Add markers, layers, or other map elements
})
</script>
```

## License

[MIT License](LICENSE)

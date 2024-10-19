import { load } from '@2gis/mapgl'

export type Mapgl = Awaited<ReturnType<typeof load>>

export type MapIsntance = InstanceType<Mapgl['Map']>
export type MapReadyCb = (sdk: Mapgl, map: MapIsntance) => void

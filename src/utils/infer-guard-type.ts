// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferGuardType<T> = T extends (x: any) => x is infer G ? G : never;

export function flatten<T>(arr: Array<unknown>): T[] {
  return arr.reduce(function (flat: T[], toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : (toFlatten as T)
    );
  }, [] as T[]);
}

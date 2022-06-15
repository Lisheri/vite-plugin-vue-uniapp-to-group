// * 去重
export const unique = (arr: Array<string | number | bigint | symbol>) => {
  return Array.from(new Set(arr))
}

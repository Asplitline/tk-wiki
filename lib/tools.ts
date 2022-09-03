export function obj2Array(obj, keyName = 'key', valueName = 'value') {
  return Object.entries(obj).map(([key, value]) => {
    return { [keyName]: key, [valueName]: value }
  })
}

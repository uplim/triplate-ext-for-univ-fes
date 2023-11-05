export async function waitQuerySelector(selector, node = document) {
  let obj = null
  while (!obj) {
    obj = await new Promise((resolve) =>
      setTimeout(() => resolve(node.querySelector(selector)), 100)
    )
  }
  return obj
}

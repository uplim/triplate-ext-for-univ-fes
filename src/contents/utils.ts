export async function observeDomChanges<T extends Element>(
  query: string,
  callback: (target: T) => void
) {
  const target = await waitQuerySelector<T>(query)

  const observer = new MutationObserver((_records) => {
    callback(target)
  })

  observer.observe(target, {
    attributes: true
  })
}

export async function waitQuerySelector<T>(
  selector: string,
  node = document
): Promise<T> {
  let obj = null
  while (!obj) {
    obj = await new Promise((resolve) =>
      setTimeout(() => resolve(node.querySelector(selector)), 500)
    )
  }
  return obj
}

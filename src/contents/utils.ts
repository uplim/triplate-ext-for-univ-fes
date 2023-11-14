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

export async function getDescription() {
  return await waitQuerySelector<HTMLParagraphElement>(".LinesEllipsis")
}

export async function getSakaneIcon() {
  return await waitQuerySelector<HTMLImageElement>(".css-bky071 > img")
}

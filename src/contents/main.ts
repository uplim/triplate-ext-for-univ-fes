import { getDescription, getSakaneIcon } from "@/contents/utils"
import type { CheckResultType } from "@/types/type"
import type { PlasmoCSConfig } from "plasmo"

import { descriptionFontSize, sakaneIcon } from "./constants"

export const config: PlasmoCSConfig = {
  matches: ["https://triplate.app/ma_ma_hima**"],
  all_frames: true,
  run_at: "document_end"
}

async function init() {
  // 画像の参照を壊す
  const img = await getSakaneIcon()
  img.srcset = ""
  img.src = ""

  // フォントサイズを壊す
  const description = await getDescription()
  description.style.fontSize = "5rem"
}

async function check(): Promise<CheckResultType> {
  const fontSize = (await getDescription()).style.fontSize
  const src = (await getSakaneIcon()).getAttribute("src")

  return [
    fontSize === descriptionFontSize ? "passed" : "failed",
    src === sakaneIcon ? "passed" : "failed"
  ]
}

async function main() {
  // 初期化
  await init()

  chrome.runtime.onMessage.addListener(({ message }, _, sendResponse) => {
    if (message !== "check") return

    check().then((result) => {
      sendResponse(result)
    })

    return true
  })
}

main().catch((e) => console.error(e))

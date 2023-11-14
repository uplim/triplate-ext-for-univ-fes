import { useState, type MouseEventHandler } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import "@/styles/style.css"

import type { CheckResultType } from "@/types/type"

function IndexPopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [checkResult, setCheckResult] = useStorage<CheckResultType>("check", [
    "failed",
    "failed"
  ])

  const checkContents: MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true)

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const res = (await chrome.tabs.sendMessage(tabs[0].id, {
        message: "check"
      })) as CheckResultType
      setCheckResult(res)
      setIsLoading(false)
    })
  }

  return (
    <div className="h-96 w-96 border-black bg-white">
      <div>
        <h2>チェックポイント</h2>
        <div className="flex items-center">
          <p>①文字サイズが~~であること</p>
          <span>{checkResult[0] === "passed" ? "⭕️" : "❌"}</span>
        </div>

        <div className="flex items-center">
          <p>②画像の参照が適切であること</p>
          <span>{checkResult[1] === "passed" ? "⭕️" : "❌"}</span>
        </div>
      </div>
      <div>{isLoading && <p>くるくる</p>}</div>
      <button onClick={checkContents} disabled={isLoading}>
        チェック
      </button>
    </div>
  )
}

export default IndexPopup

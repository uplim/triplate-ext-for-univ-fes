import * as styles from "@/styles/style.module.css"
import type { CheckResultType } from "@/types/type"
import { useState, type MouseEventHandler } from "react"

import { useStorage } from "@plasmohq/storage/hook"

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
    <div className={styles.content}>
      <div>
        <h2>チェックポイント</h2>
        <div className={styles.checkpoint}>
          <p>①自己紹介欄の文字サイズが1.4remになっていること</p>
          <span>{checkResult[0] === "passed" ? "⭕️" : "❌"}</span>
        </div>

        <div className={styles.checkpoint}>
          <p>②アイコン画像が表示されていること</p>
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

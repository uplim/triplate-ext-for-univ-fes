import * as styles from "@/styles/style.module.css"
import type { CheckResultType } from "@/types/type"
import { useState, type MouseEventHandler } from "react"

import { useStorage } from "@plasmohq/storage/hook"

const failedImage = chrome.runtime.getURL(`assets/failed.svg`)
const successedImage = chrome.runtime.getURL(`assets/successed.svg`)
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
        <h2>テスト項目</h2>
        <div className={styles.checkpoint}>
          <p className={styles.text}>① アイコン画像が表示されていること</p>
          <span>
            {checkResult[0] === "passed" ? (
              <img src={successedImage} alt="" />
            ) : (
              <img src={failedImage} alt="" />
            )}
          </span>
        </div>

        <div className={styles.checkpoint}>
          <p className={styles.text}>
            ② 自己紹介欄の文字サイズが1.4remになっていること
          </p>
          <span>
            {checkResult[1] === "passed" ? (
              <img src={successedImage} alt="" />
            ) : (
              <img src={failedImage} alt="" />
            )}
          </span>
        </div>
      </div>
      <div className={styles.check}>
        <button onClick={checkContents} disabled={isLoading}>
          CHECK
        </button>
        <div>
          {isLoading && <div className={styles.loader}>Loading...</div>}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup

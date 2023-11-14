import { useEffect, useState } from "react"

import "@/styles/style.css"

function IndexPopup() {
  const [checkFontSize, setCheckFontSize] = useState(false)
  const [checkImg, setCheckImg] = useState(false)

  useEffect(() => {
    const handleMessage = (
      request: { message: string },
      _sender: any,
      _sendResponse: any
    ) => {
      if (request.message === "font-size-changed") {
        setCheckFontSize(true)
      }
      if (request.message === "img-changed") {
        setCheckImg(true)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return (
    <div className="h-96 w-96 border-black bg-white">
      <div>
        <h2>チェックポイント</h2>
        <div className="flex items-center">
          <p>①文字サイズが~~であること</p>
          <span>{checkFontSize ? "⭕️" : "❌"}</span>
        </div>

        <div className="flex items-center">
          <p>②画像の参照が適切であること</p>
          <span>{checkImg ? "⭕️" : "❌"}</span>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup

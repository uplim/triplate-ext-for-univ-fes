import { observeDomChanges, waitQuerySelector } from "@/contents/utils"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://k1tikurisu.github.io/**"],
  all_frames: true,
  run_at: "document_end"
}

async function init() {
  // 画像の参照を壊す
  const img = await waitQuerySelector<HTMLObjectElement>(".svg")
  const srcset = `/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=3840&q=75 3840w`
  img.data = srcset.replaceAll("traveli", "aaaaa")

  // フォントサイズを壊す
  const description = await waitQuerySelector<HTMLAnchorElement>(".url")
  description.style.fontSize = "5rem"
}

async function main() {
  // 初期化
  await init()

  // フォントサイズの監視
  observeDomChanges<HTMLImageElement>(".url", async (target) => {
    const fontSize = target.style.fontSize

    if (fontSize === "2rem") {
      await chrome.runtime.sendMessage({ message: "font-size-changed" })
    }
  })

  // 画像の参照の監視
  observeDomChanges<HTMLObjectElement>(".svg", async (target) => {
    const newSrc = target.getAttribute("src")

    if (
      newSrc ===
      "/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=640&q=75 640w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=750&q=75 750w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=828&q=75 828w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1080&q=75 1080w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1200&q=75 1200w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=1920&q=75 1920w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=2048&q=75 2048w, /_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ftraveli-test.appspot.com%2Fo%2Fimages%252Ftriplinks%252F4ac7d37c-6b2c-4a14-832b-ef2e052e7262%252Fthumbnail%3Falt%3Dmedia%26token%3D1861121d-621d-495d-90f8-b953682a4880&w=3840&q=75 3840w"
    ) {
      await chrome.runtime.sendMessage({ message: "img-changed" })
    }
  })
}

main().catch((e) => console.error(e))

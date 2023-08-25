import someCoolImage from "data-base64:~assets/bell.png"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/search*"]
}

function addBell(randomAdvertiser) {
  const banner = document.createElement("img")
  banner.src = someCoolImage

  banner.style.width = "30px"
  banner.style.height = "30px"
  banner.style.cursor = "pointer"
  document.querySelector(".logo").prepend(banner)

  banner.addEventListener("click", () => {
    const modal = document.createElement("div")
    modal.style.position = "absolute"
    modal.style.top = "0"
    modal.style.left = "0"
    modal.style.width = "100vw"
    modal.style.height = "100vh"
    modal.style.backgroundColor = "rgba(0,0,0,0.5)"
    modal.style.color = "white"
    modal.style.display = "flex"
    modal.style.justifyContent = "center"
    modal.style.alignItems = "center"

    const modalContent = document.createElement("div")
    modalContent.style.padding = "20px"
    modalContent.style.backgroundColor = "white"
    modalContent.style.color = "black"
    modalContent.style.borderRadius = "5px"
    modalContent.style.width = "200px"
    modalContent.style.height = "120px"
    modalContent.style.display = "flex"
    modalContent.style.flexDirection = "column"
    modalContent.style.justifyContent = "center"
    modalContent.style.alignItems = "center"

    const message = document.createElement("p")
    message.innerHTML = randomAdvertiser.randomMessage

    const website = document.createElement("p")
    website.innerHTML = randomAdvertiser.randomWebsite

    modalContent.appendChild(website)
    modalContent.appendChild(message)
    modal.appendChild(modalContent)
    document.body.appendChild(modal)

    modal.addEventListener("click", () => {
      modal.remove()
    })
  })
}

chrome.runtime.sendMessage(
  {
    type: "getRandomAdvertiser"
  },
  (response) => {
    addBell(response)
  }
)

export {}

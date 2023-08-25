import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/search*"]
}

function addBorder(websites) {
  let paidAds = document.querySelectorAll(".uEierd")
  let normalSearches = document.querySelectorAll(".srKDX.cvP2Ce")
  let featuredSearch = document.querySelectorAll(".BYM4Nd")
  let allSearches = [...paidAds, ...normalSearches, ...featuredSearch]

  allSearches.forEach((ad) => {
    let link = ad.querySelector("a.sVXRqc") || ad.querySelector("a")
    if (link) {
      let url = link.getAttribute("href")
      let host = new URL(url).host
      if (websites[host]) {
        ad.style.border = "1px solid red"
        ad.style.padding = "2px"
        ad.style.borderRadius = "5px"
      }
    }
  })
}

chrome.runtime.sendMessage(
  {
    type: "getAdvertisers"
  },
  (response) => {
    addBorder(response)
  }
)

export {}

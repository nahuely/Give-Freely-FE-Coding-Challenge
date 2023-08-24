chrome.runtime.sendMessage(
  {
    type: "isAdvertiser",
    url: window.location.href
  },
  (response) => {
    const banner = document.createElement("div")
    banner.style.padding = "15px"
    banner.style.backgroundColor = "grey"
    banner.style.textAlign = "center"
    banner.style.color = "white"
    banner.style.fontWeight = "bold"
    banner.innerHTML = response
    document.body.prepend(banner)
  }
)

export {}

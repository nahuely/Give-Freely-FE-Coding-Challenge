import { Storage } from "@plasmohq/storage"

import { API_TOKEN, API_URL } from "~constants"
import type { Websites } from "~entities/website"
import { getRandomInt } from "~utils"

const storage = new Storage()

chrome.runtime.onInstalled.addListener(async function () {
  const response = await fetch(API_URL, {
    headers: {
      "X-Access-Key": API_TOKEN
    }
  })
  const json = await response.json()
  const {
    record: { websites }
  } = json

  storage.set("websites", websites)
})

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  senderResponse
) {
  const websites = (await storage.get("websites")) as Websites
  if (message.type === "isAdvertiser") {
    const isAdvertiser = websites.find((website) =>
      message.url.includes(website.url)
    )
    if (isAdvertiser) {
      const randomMessage =
        isAdvertiser.messages[getRandomInt(isAdvertiser.messages.length)]
      senderResponse(randomMessage)
    }
  } else if (message.type === "getAdvertisers") {
    const websitesMap = websites.reduce((acc, website) => {
      acc[website.url] = website
      return acc
    }, {})
    senderResponse(websitesMap)
  }
})

export {}

import { BackIcon } from "~components/BackIcon"

import { back, usePopup, websiteDetailSelector } from "."

function PopupDetail() {
  const { state, dispatch } = usePopup()

  const website = websiteDetailSelector(state)

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-md">{website.name}</div>
        <div className="cursor-pointer" onClick={() => back(dispatch)}>
          <BackIcon />
        </div>
      </div>
      <hr className="my-2" />
      <div>
        {website.messages.map((message) => (
          <div className="italic font-bold" key={message}>
            "{message}"
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopupDetail

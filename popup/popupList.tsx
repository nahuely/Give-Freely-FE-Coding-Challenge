import { ChevronRightIcon } from "~components/ChevronRightIcon"

import { selectWebsite, usePopup, websitesSelector } from "."

function PopupList() {
  const { state, dispatch } = usePopup()

  return (
    <div className="flex flex-col gap-y-2">
      {websitesSelector(state).map((website) => (
        <div
          onClick={() => {
            selectWebsite(dispatch, website)
          }}
          key={website.name}
          className="flex justify-between cursor-pointer hover:bg-slate-200 items-center">
          <div>
            <p>{website.name}</p>
            <p>{website.url}</p>
          </div>
          <div>
            <ChevronRightIcon />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PopupList

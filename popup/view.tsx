import { usePopup } from "."
import PopupDetail from "./popupDetail"
import PopupList from "./popupList"

import "../style.css"

function View() {
  const { state } = usePopup()

  if (state.loading) {
    return <div>...loading</div>
  }

  if (state.error) {
    return <div>there was an error</div>
  }

  if (state.currentWebsite) {
    return <PopupDetail />
  }

  return <PopupList />
}

export default View

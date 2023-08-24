import React from "react"

import Container from "~components/Container"
import { API_TOKEN, API_URL } from "~constants"
import type { Website, Websites } from "~entities/website"
import View from "~popup/view"

type State = {
  error: string | null
  loading: boolean
  currentWebsite: Website | null
  websites: Websites
}

type Action =
  | {
      type: "init"
    }
  | {
      type: "init_success"
      websites: Websites
    }
  | {
      type: "init_error"
      error: string
    }
  | {
      type: "select_website"
      website: Website
    }
  | {
      type: "back"
    }

type Dispatch = (action: Action) => void

const Context = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init": {
      return {
        ...state,
        loading: true
      }
    }
    case "init_success": {
      return {
        ...state,
        loading: false,
        websites: action.websites
      }
    }
    case "init_error": {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
    case "select_website": {
      return {
        ...state,
        currentWebsite: action.website
      }
    }
    case "back": {
      return {
        ...state,
        currentWebsite: null
      }
    }
    default: {
      throw new Error("this action doesn't exist")
    }
  }
}

const PopupProvider = () => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    error: null,
    loading: true,
    currentWebsite: null,
    websites: []
  })

  const value = React.useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  )

  React.useEffect(() => {
    ;(async () => {
      dispatch({ type: "init" })
      try {
        const response = await fetch(API_URL, {
          headers: {
            "X-Access-Key": API_TOKEN
          }
        })
        const json = await response.json()
        const {
          record: { websites }
        } = json
        dispatch({ type: "init_success", websites })
      } catch (error) {
        dispatch({ type: "init_error", error })
      }
    })()
  }, [])

  return (
    <Context.Provider value={value}>
      <Container>
        <View />
      </Container>
    </Context.Provider>
  )
}

const back = (dispatch: Dispatch) => {
  dispatch({ type: "back" })
}

const selectWebsite = (dispatch: Dispatch, website: Website) => {
  dispatch({ type: "select_website", website })
}

const websiteDetailSelector = (state: State): Website => {
  return state.currentWebsite
}

const websitesSelector = (state: State): Websites => {
  return state.websites
}

const loadingSelector = (state: State): boolean => {
  return state.loading
}

const errorSelector = (state: State): string | null => {
  return state.error
}

const usePopup = () => {
  const context = React.useContext(Context)
  if (!context) throw new Error(`usePopup must be used within a PopupProvider`)
  return context
}

export {
  usePopup,
  websiteDetailSelector,
  websitesSelector,
  loadingSelector,
  errorSelector,
  selectWebsite,
  back
}

export default PopupProvider

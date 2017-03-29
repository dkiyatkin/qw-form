import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createDebug from 'debug'

import getProfileFormsItem from 'qwForm/utils/getProfileFormsItem'
import configureStore from 'qwForm/configureStore'
import Base from 'qwForm/components/Base'

import 'qwForm/styles/bootstrapOverrides.global.scss'
import 'react-select/dist/react-select.css'
import 'qwForm/styles/app.global.scss'

const debug = createDebug('qwForm:render') // eslint-disable-line no-unused-vars

const initialState = {
  rrf: {
    profile: {
      personalInfo: getProfileFormsItem('personalInfo'),
      gender: getProfileFormsItem('gender'),
      about: getProfileFormsItem('about'),
    }
  }
}

const store = configureStore(initialState)

// DEBUG {{{
window.APP.store = store
// }}}

render(
  React.createElement(
    Provider, { store }, React.createElement(Base)
  ), document.getElementById('app')
)

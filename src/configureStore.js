import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combineForms } from 'react-redux-form'

// NOTE получилось все сделать с помощью одного react-redux-form
// import reducers from 'qwForm/reducers'

export default function configureStore (initialState) {
  const store = createStore(
    combineReducers({
      // ...reducers,
      rrf: combineForms({
        profile: {},
      }, 'rrf'),
    }),
    {
      ...initialState,
      rrf: {
        profile: {
          ...initialState.rrf.profile,
          personalInfo: {
            surname: '',
            name: '',
            patronymic: '',
            ...initialState.rrf.profile.personalInfo,
          },
          gender: initialState.rrf.profile.gender,
          about: initialState.rrf.profile.about,
        }
      }
    },
    applyMiddleware(
      thunkMiddleware,
    )
  )

  return store
}

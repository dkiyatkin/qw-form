import _ from 'lodash'
import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { actions as formActions } from 'react-redux-form'

import getProfileFormsItem from 'qwForm/utils/getProfileFormsItem'
import PersonalInfo from 'qwForm/components/ProfileForms/forms/PersonalInfo'
import Gender from 'qwForm/components/ProfileForms/forms/Gender'
import About from 'qwForm/components/ProfileForms/forms/About'
import Item from 'qwForm/components/ProfileForms/Item'

import styles from 'qwForm/styles/profileForms.scss'

class ProfileForms extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isPersonalInfoEdit: React.PropTypes.bool,
    isGenderEdit: React.PropTypes.bool,
    isAboutEdit: React.PropTypes.bool,
    personalInfoValue: React.PropTypes.string,
    genderValue: React.PropTypes.string,
    aboutValue: React.PropTypes.string,
    isGenderVisible: React.PropTypes.bool,
    isAboutVisible: React.PropTypes.bool,
    toggleVisibility: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    save: React.PropTypes.func,
  }

  render () {
    const { isPersonalInfoEdit, isGenderEdit, isAboutEdit, personalInfoValue, genderValue, aboutValue, isGenderVisible, isAboutVisible, toggleVisibility, onEditClick, onCancelClick, save } = this.props

    return (
      <div className={cn(styles.profileForms, this.props.className)}>
        <Item
          EditComponent={PersonalInfo} name='Персональные данные' isEdit={isPersonalInfoEdit}
          itemType='personalInfo'
          onEditClick={onEditClick}
          onCancelClick={onCancelClick}
          save={save}
        >
          {personalInfoValue}
        </Item>

        <Item
          EditComponent={Gender} name='Пол' isEdit={isGenderEdit} isVisible={isGenderVisible}
          itemType='gender'
          toggleVisibility={toggleVisibility}
          onEditClick={onEditClick}
          onCancelClick={onCancelClick}
          save={save}
        >
          {genderValue}
        </Item>

        <Item
          EditComponent={About} name='О себе' isEdit={isAboutEdit} isVisible={isAboutVisible}
          itemType='about'
          toggleVisibility={toggleVisibility}
          onEditClick={onEditClick}
          onCancelClick={onCancelClick}
          save={save}
        >
          {aboutValue}
        </Item>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { personalInfo, gender, about } = state.rrf.profile

  return {
    isPersonalInfoEdit: personalInfo.isEdit,
    isGenderEdit: gender.isEdit,
    isAboutEdit: about.isEdit,
    personalInfoValue: personalInfo.value,
    genderValue: gender.value,
    aboutValue: about.value,
    isGenderVisible: gender.isVisible,
    isAboutVisible: about.isVisible,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    toggleVisibility: function (itemType) {
      dispatch(formActions.toggle(`rrf.profile[${itemType}].isVisible`))
    },
    onEditClick: function (itemType, event) {
      // можно делать cancel остальным
      dispatch(formActions.change(`rrf.profile[${itemType}].isEdit`, true, {silent: true}))
    },
    onCancelClick: function (itemType, event) {
      let reset = getProfileFormsItem(itemType)
      dispatch(formActions.change(`rrf.profile[${itemType}]`, reset))
    },
    save: function (itemType, value) {
      return dispatch(function (itemType, value) {
        return function (dispatch, getState) {
          if (!_.isNil(value)) {
            dispatch(formActions.change(`rrf.profile[${itemType}].value`, value, {silent: true}))
          }
          dispatch(formActions.change(`rrf.profile[${itemType}].isEdit`, false, {silent: true}))
          const cache = JSON.stringify(_.omit(getState().rrf.profile[itemType], ['isEdit']))
          localStorage.setItem(`rrf.profile.${itemType}`, cache)
        }
      }(itemType, value))
    },
  }
}

const ProfileFormsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileForms)

export default ProfileFormsContainer

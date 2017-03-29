import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { FormGroup, Label, Input } from 'reactstrap'
import {
  Form, Control,
  actions as formActions
} from 'react-redux-form'

import SetVisibiltyFormGroup from 'qwForm/components/ProfileForms/common/SetVisibiltyFormGroup'
import EndButtonsFormGroup from 'qwForm/components/ProfileForms/common/EndButtonsFormGroup'

import styles from 'qwForm/styles/profileForms.item.scss'

class PersonalInfo extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    itemType: React.PropTypes.string,
    onCancelClick: React.PropTypes.func,
    save: React.PropTypes.func,
    isSurnameVisible: React.PropTypes.bool,
    isNameVisible: React.PropTypes.bool,
    isPatronymicVisible: React.PropTypes.bool,
    toggleVisibilitySurname: React.PropTypes.func,
    toggleVisibilityName: React.PropTypes.func,
    toggleVisibilityPatronymic: React.PropTypes.func,
  }

  onSubmit = (values) => {
    const { itemType, save } = this.props
    const { surname = '', name = '', patronymic = '' } = values
    save(itemType, (surname + ' ' + name + ' ' + patronymic).trim())
  }

  render () {
    const { name, itemType, onCancelClick, isSurnameVisible, isNameVisible, isPatronymicVisible, toggleVisibilitySurname, toggleVisibilityName, toggleVisibilityPatronymic } = this.props

    return (
      <Form model='rrf.profile.personalInfo' onSubmit={this.onSubmit} className={cn(styles.about, this.props.className)}>
        <div className={cn(styles.name)}>{name}</div>

        <div>
          <FormGroup className='mb-0'>
            <Label>
              Фамилия
              <Control model='.surname' component={Input} type='text' autoFocus />
            </Label>
          </FormGroup>

          <SetVisibiltyFormGroup toggleVisibility={toggleVisibilitySurname} isVisible={isSurnameVisible} />
        </div>

        <div>
          <FormGroup className='mb-0'>
            <Label>
              Имя
              <Control model='.name' component={Input} type='text' />
            </Label>
          </FormGroup>

          <SetVisibiltyFormGroup toggleVisibility={toggleVisibilityName} isVisible={isNameVisible} />
        </div>

        <div>
          <FormGroup className='mb-0'>
            <Label>
              Отчество
              <Control model='.patronymic' component={Input} type='text' />
            </Label>
          </FormGroup>

          <SetVisibiltyFormGroup toggleVisibility={toggleVisibilityPatronymic} isVisible={isPatronymicVisible} />
        </div>

        <EndButtonsFormGroup onCancelClick={onCancelClick.bind(this, itemType)} />
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { isSurnameVisible, isNameVisible, isPatronymicVisible } = state.rrf.profile.personalInfo

  return {
    isSurnameVisible, isNameVisible, isPatronymicVisible
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    toggleVisibilitySurname: function () {
      dispatch(formActions.toggle(`rrf.profile.personalInfo.isSurnameVisible`))
    },
    toggleVisibilityName: function () {
      dispatch(formActions.toggle(`rrf.profile.personalInfo.isNameVisible`))
    },
    toggleVisibilityPatronymic: function () {
      dispatch(formActions.toggle(`rrf.profile.personalInfo.isPatronymicVisible`))
    },
  }
}

const PersonalInfoContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)

export default PersonalInfoContainer

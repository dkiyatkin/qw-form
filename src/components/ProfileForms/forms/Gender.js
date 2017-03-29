import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { FormGroup } from 'reactstrap'
import {
  Form,
  actions as formActions
} from 'react-redux-form'
import Select from 'react-select'

import SetVisibiltyFormGroup from 'qwForm/components/ProfileForms/common/SetVisibiltyFormGroup'
import EndButtonsFormGroup from 'qwForm/components/ProfileForms/common/EndButtonsFormGroup'

import styles from 'qwForm/styles/profileForms.item.scss'

const options = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

class Gender extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    itemType: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    toggleVisibility: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    save: React.PropTypes.func,
    genderSelectValue: React.PropTypes.string,
    onSelectChange: React.PropTypes.func,
    blur: React.PropTypes.func,
  }

  componentDidMount () {
    this.props.blur()
  }

  onSubmit = (values) => {
    const { itemType, save } = this.props
    save(itemType)
  }

  render () {
    const { name, itemType, isVisible, toggleVisibility, onCancelClick, genderSelectValue, onSelectChange } = this.props

    return (
      <Form model='rrf.profile.about' onSubmit={this.onSubmit} className={cn(styles.about, this.props.className)}>
        {name}

        <FormGroup>
          <Select
            value={genderSelectValue}
            options={options}
            onChange={onSelectChange}
            autofocus
          />
        </FormGroup>

        <SetVisibiltyFormGroup toggleVisibility={toggleVisibility.bind(this, itemType)} isVisible={isVisible} />

        <EndButtonsFormGroup onCancelClick={onCancelClick.bind(this, itemType)} />
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { gender } = state.rrf.profile

  return {
    genderSelectValue: gender.selectValue
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    blur: function () { // readonly error
      dispatch(formActions.blur('rrf.profile.gender.selectValue'))
    },
    onSelectChange: function (option) {
      let value = null
      let label = null
      if (option) {
        value = option.value
        label = option.label
      }
      dispatch(formActions.change('rrf.profile.gender.selectValue', value))
      dispatch(formActions.change('rrf.profile.gender.value', label)) // сохраняем общее значение формы
    }
  }
}

const GenderContainer = connect(mapStateToProps, mapDispatchToProps)(Gender)

export default GenderContainer

import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { FormGroup, Label, Input } from 'reactstrap'
import {
  Form, Control,
} from 'react-redux-form'

import SetVisibiltyFormGroup from 'qwForm/components/ProfileForms/common/SetVisibiltyFormGroup'
import EndButtonsFormGroup from 'qwForm/components/ProfileForms/common/EndButtonsFormGroup'

import styles from 'qwForm/styles/profileForms.item.scss'

class Counter extends React.Component {
  static propTypes = {
    count: React.PropTypes.number,
  }

  render () {
    const count = this.props.count.toString()
    const lastOne = count.slice(-1)
    const lastTwo = count.slice(-2)

    let text = 'символов'
    if (lastOne === '1') {
      text = 'символ'
    }
    if (['2', '3', '4'].includes(lastOne)) {
      text = 'символа'
    }
    if (['11', '12', '13', '14', '15', '16', '17', '18', '19'].includes(lastTwo)) {
      text = 'символов'
    }

    return (
      <div>
        ({ count } { text })
      </div>
    )
  }
}

class About extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    itemType: React.PropTypes.string,
    count: React.PropTypes.number,
    isVisible: React.PropTypes.bool,
    toggleVisibility: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    save: React.PropTypes.func,
  }

  onSubmit = (values) => {
    const { itemType, save } = this.props
    save(itemType, values.text)
  }

  render () {
    const { name, itemType, count, isVisible, toggleVisibility, onCancelClick } = this.props

    return (
      <Form model='rrf.profile.about' onSubmit={this.onSubmit} className={cn(styles.about, this.props.className)}>
        <div className={cn(styles.name)}>{name}</div>

        <FormGroup>
          <Label>
            <Control model='.text' component={Input} type='textarea' autoFocus />
          </Label>
          <Counter count={count} />
        </FormGroup>

        <SetVisibiltyFormGroup toggleVisibility={toggleVisibility.bind(this, itemType)} isVisible={isVisible} />

        <EndButtonsFormGroup onCancelClick={onCancelClick.bind(this, itemType)} />
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { about } = state.rrf.profile

  return {
    count: about.text ? about.text.length : 0,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
  }
}

const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(About)

export default AboutContainer

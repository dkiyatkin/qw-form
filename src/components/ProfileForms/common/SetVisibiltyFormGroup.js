import React from 'react'
import cn from 'classnames'
import { FormGroup, Label } from 'reactstrap'

import VisibilityButton from 'qwForm/components/ProfileForms/common/VisibilityButton'

export default class SetVisibiltyFormGroup extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    toggleVisibility: React.PropTypes.func,
  }

  render () {
    const { isVisible, toggleVisibility } = this.props

    return (
      <FormGroup className={cn(this.props.className)}>
        <Label>
          <VisibilityButton isVisible={isVisible} onClick={toggleVisibility} />
          {' '}
          { isVisible ? 'Показывать в профиле' : 'Не показывать в профиле' }
        </Label>
      </FormGroup>
    )
  }
}

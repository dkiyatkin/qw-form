import React from 'react'
import cn from 'classnames'
import { Button, FormGroup } from 'reactstrap'

import styles from 'qwForm/styles/profileForms.item.scss'

export default class VisibilityButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onCancelClick: React.PropTypes.func,
  }

  render () {
    const { onCancelClick } = this.props

    return (
      <FormGroup className={cn(styles.empty, this.props.className)}>
        <Button color='primary'>Сохранить</Button>
        <Button type='button' color='secondary' onClick={onCancelClick}>Отмена</Button>
      </FormGroup>
    )
  }
}

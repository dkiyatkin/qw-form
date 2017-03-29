import React from 'react'
import cn from 'classnames'
import { Button } from 'reactstrap'

import FaIcon from 'qwForm/components/common/FaIcon'

import styles from 'qwForm/styles/profileForms.item.scss'

export default class VisibilityButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  }

  render () {
    const { isVisible, onClick } = this.props

    return (
      <Button type='button' color='secondary' onClick={onClick} className={cn(styles.empty, this.props.className)}>
        {
          isVisible ? (
            <FaIcon icon='eye' />
          ) : (
            <FaIcon icon='eye-slash' />
          )
        }
      </Button>
    )
  }
}

import React from 'react'
import cn from 'classnames'

import ProfileForms from 'qwForm/components/ProfileForms'

import styles from 'qwForm/styles/base.scss'

export default class Base extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
  }

  render () {
    return (
      <div className={cn(styles.base, this.props.className)}>
        <ProfileForms />
      </div>
    )
  }
}

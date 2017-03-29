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
      <div className={cn('p-5', styles.base, this.props.className)}>
        <ProfileForms className={cn('mx-auto', styles.profileForms)} />
      </div>
    )
  }
}

import React from 'react'

export default class FaIcon extends React.Component {
  static propTypes = {
    icon: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  render () {
    const { icon, className = '', ...other } = this.props

    return (
      <i className={`fa fa-${icon} ${className}`} aria-hidden {...other} />
    )
  }
}

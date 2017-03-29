import React from 'react'
import cn from 'classnames'
import { Button } from 'reactstrap'

import FaIcon from 'qwForm/components/common/FaIcon'
import VisibilityButton from 'qwForm/components/ProfileForms/common/VisibilityButton'

import styles from 'qwForm/styles/profileForms.item.scss'

export default class Item extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    EditComponent: React.PropTypes.func,
    name: React.PropTypes.string,
    itemType: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    toggleVisibility: React.PropTypes.func,
    isEdit: React.PropTypes.bool,
    onEditClick: React.PropTypes.func,
    onCancelClick: React.PropTypes.func,
    save: React.PropTypes.func,
  }

  toggleVisibilityAndSave = () => {
    const { itemType, toggleVisibility, save } = this.props
    toggleVisibility(itemType)
    save(itemType)
  }

  renderDoneItem = () => {
    const { name, itemType, isVisible, toggleVisibility, onEditClick } = this.props

    return (
      <div className={cn(styles.doneItem)}>
        <div className={cn(styles.name)}>{name}</div>

        <div className={cn(styles.value)}>
          {this.props.children}
        </div>

        <div className={cn(styles.itemBtns)}>
          { toggleVisibility ? <VisibilityButton isVisible={isVisible} onClick={this.toggleVisibilityAndSave} /> : null }
          {' '}
          <Button className={cn(styles.itemBtn)} type='button' color='secondary' onClick={onEditClick.bind(this, itemType)}>
            <FaIcon icon='pencil' />
          </Button>
        </div>
      </div>
    )
  }

  renderEmptyItem = () => {
    const { name, itemType, onEditClick } = this.props

    return (
      <div className={cn(styles.emptyItem)} onClick={onEditClick.bind(this, itemType)}>
        <div className={cn(styles.plus)} />
        <div className={cn(styles.name)}>{name}</div>
      </div>
    )
  }

  render () {
    const { EditComponent, name, itemType, isVisible, isEdit, toggleVisibility, onCancelClick, save } = this.props

    let component
    if (isEdit) {
      component = <EditComponent className={cn(styles.editItem)} name={name} itemType={itemType} isVisible={isVisible} toggleVisibility={toggleVisibility} onCancelClick={onCancelClick} save={save} />
    } else {
      if (this.props.children) {
        component = this.renderDoneItem()
      } else {
        component = this.renderEmptyItem()
      }
    }

    return (
      <div className={cn(styles.item, this.props.className)}>
        {component}
      </div>
    )
  }
}

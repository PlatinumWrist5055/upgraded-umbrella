import React, { PureComponent } from 'react'
import { renderToString } from 'react-dom/server'
import CaratDownIcon from './assets/carat-down'
import PlusIcon from './assets/plus'
import styles from './styles'

module.exports = class BraveWalletDropdown extends PureComponent {
  constructor (props) {
    super(props)
  }

  state = {
    dropdownOpen: false
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({ dropdownOpen: nextProps.active })
    }
  }

  handleClick = (event) => {
    const { onSetActive } = this.props
    const target = event.target

    if (onSetActive && target) {
      onSetActive()
    } else {
      return
    }

    const rect = target.getBoundingClientRect()
    const droppo = document.querySelector('.network-droppo')
    const left = Math.ceil(rect.left) + 150

    droppo.innerHTML = renderToString(this.getDropdown(`-${left}px`))
  }

  getDropdown = (left) => {
    const { children } = this.props

    if (!children || children.length === 0) {
      return null
    }

    return (
      <div 
        className="cur-dropdown-container"
        style={
          {
            left,
            ...styles.dropdownContainer
          }
        }
      >
        {children.map((child, i) => {
          return (
            <div
              key={`item-${i}`}
              style={styles.dropdownItem}
            >
              {child}
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    const {
      active,
      connect,
      title
    } = this.props

    const activeKey = active ? 'active' : 'inactive'

    return (
      <div
        onClick={(e) => {this.handleClick(e)}}
        style={
          {
            ...styles.container.general,
            ...styles.container[activeKey]
          }
        }
      >
        <span
          style={
              {
              ...styles.title.general,
              ...styles.title[activeKey]
              }
          }
        >
          {
            connect
            ? <div style={styles.plusContainer}>
                <PlusIcon />
              </div>
            : <div style={styles.leftPadding}></div>
          }
          {title}
          <div style={styles.caratContainer}>
            <CaratDownIcon />
          </div>
        </span>
      </div>
    )
  }
}
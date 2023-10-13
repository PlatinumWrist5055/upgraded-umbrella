const NetworkIndicator = require('../../../../../../ui/app/components/app/network')

import React from 'react'
import classnames from 'classnames'
import {
  CONNECT_HARDWARE_ROUTE
} from '../../../../../../ui/app/helpers/constants/routes'
import AppHeader from '../../../../../../ui/app/components/app/app-header/app-header.component'
import BraveWalletDropdown from '../dropdowns/components/brave-wallet-dropdown/brave-wallet-dropdown.component'

module.exports = class BraveAppHeader extends AppHeader {
  constructor (props) {
    super(props)
  }

  state = {
    activeDropdown: ''
  }

  componentDidMount () {
    window.document.onclick = (e) => {
      const appContainer = document.querySelector('.app-header__logo-container')

      if (!appContainer.contains(e.target)) {
        const currentDropdown = document.querySelector('.cur-dropdown-container')

        if (!currentDropdown.contains(e.target)) {
          currentDropdown.remove()
          this.setState({ activeDropdown: '' })
        }
      }
    }
  }

  get styles () {
    return {
      connectItem: {
        textAlign: 'center',
        padding: '15px 20px 10px 20px'
      },
      connectImg: {
        width: '95px'
      }
    }
  }

  get browserItems () {
    return [
      (<div>{'Test item 1'}</div>),
      (<div>{'Test item 2'}</div>),
      (<div>{'Test item 3'}</div>),
      (<div>{'Test item 4'}</div>)
    ]
  }

  onHardwareConnect = () => {
    const { history } = this.props

    this.setState({ activeDropdown: '' })
    history.push(CONNECT_HARDWARE_ROUTE)
  }

  get connectItems () {
    return [
      (
        <div onClick={this.onHardwareConnect} style={this.styles.connectItem}>
          <img style={this.styles.connectImg} src={'images/ledger-logo.svg'} />
        </div>
      ),
      (
        <div onClick={this.onHardwareConnect} style={this.styles.connectItem}>
          <img style={this.styles.connectImg} src={'images/trezor-logo.svg'} />
        </div>
      )
    ]
  }

  handleDropdownClick = (dropdownKey) => {
    if (!dropdownKey) {
      return
    }

    this.setState({ activeDropdown: dropdownKey })
  }

  render () {
    const {
      network,
      provider,
      hideNetworkIndicator,
      disabled,
      isUnlocked
    } = this.props    

    return (
      <div className={classnames('app-header', { 'app-header--back-drop': isUnlocked })}>
        <div className="app-header__contents">
          <div className="app-header__logo-container">
            <BraveWalletDropdown
              title={'Browser Wallet'}
              children={this.browserItems}
              active={this.state.activeDropdown === 'browser'}
              onSetActive={this.handleDropdownClick.bind(this, 'browser')}
            />
            <BraveWalletDropdown
              connect={true}
              title={'Connect Wallet'}
              children={this.connectItems}
              active={this.state.activeDropdown === 'connectWallet'}
              onSetActive={this.handleDropdownClick.bind(this, 'connectWallet')}
            />
          </div>
          <div className="app-header__account-menu-container">
            {
              !hideNetworkIndicator && (
                <div className="app-header__network-component-wrapper">
                  <NetworkIndicator
                    network={network}
                    provider={provider}
                    onClick={event => this.handleNetworkIndicatorClick(event)}
                    disabled={disabled}
                  />
                </div>
              )
            }
            {this.renderAccountMenu()}
          </div>
        </div>
      </div>
    )
  }
}

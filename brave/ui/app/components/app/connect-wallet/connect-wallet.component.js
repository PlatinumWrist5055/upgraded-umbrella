import React,{ PureComponent } from "react";
import styles from './assets/styles'

module.exports = class ConnectWallet extends PureComponent {

  get text () {
    const { type } = this.props
    const hardwareString = (type) => `Connect your ${type} hardware wallet to interact with dApps and make transfers to other connected wallets.`

    switch (type) {
      case 'browser':
        return {
          title: 'New Browser Wallet',
          subText: 'Create a new Brave browser wallet to access dApps and store crypto and collectibles securely. Trade tokens annonymously with no trading fees.'
        }
      case 'ledger':
        return {
          title: (<div>
                    <img style={styles.hardwareImg} src={'images/ledger-logo.svg'} />
                  </div>),
          subText: hardwareString('Ledger')
        }
      case 'trezor':
        return {
          title: (<div>
                    <img style={styles.hardwareImg} src={'images/trezor-logo.svg'} />
                  </div>),
          subText: hardwareString('Trezor')
        }
      default:
        return { title: '', subText: '' }
    }
  }

  render () {
    const { type, onCreate, onRestore } = this.props
    const innerText = type === 'browser' ? 'Create' : 'Connect'
    const hwButtonStyle = type !== 'browser' ? { marginRight: '-15px' } : {}

    return (
      <div style={styles.container}>
        <div style={styles.controls}>
          {
            onCreate
            ? <button
                style={
                  {
                    ...styles.create,
                    ...hwButtonStyle
                  }
                }
                onClick={onCreate}
              >
                {innerText}
              </button>
            : null  
          }        
          {
            onRestore
            ? <span
                style={styles.restore}
                onClick={onRestore}
              >
                {'Restore'}
              </span>
            : null  
          }
        </div>
        <div style={styles.title}>
          <span>{this.text.title}</span>
        </div>
        <div style={styles.subText}>
          <span>{this.text.subText}</span>
        </div>
      </div>
    )
  }
}
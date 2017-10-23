import React, { Component } from 'react'
import ColorOptions from '../components/ColorOptions'
import Board from '../containers/Board'
import NewGameButton from '../containers/NewGameButton'
import styles from './styles/app.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class App extends Component {
  componentDidMount() {
    document.body.classList.add('app-body') 
  }

  render() {
    return (
      <div className={cx('app')}>
        <ColorOptions />
        <NewGameButton />
        <Board />
      </div>
    )
  }
}
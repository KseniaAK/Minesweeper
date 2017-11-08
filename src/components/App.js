import React, { Component } from 'react'
import Menu from '../components/Menu'
import GameSpace from '../components/GameSpace'
import styles from './styles/app.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class App extends Component {
  componentDidMount() {
    document.body.classList.add('body') 
  }

  render() {
    return (
      <div className={cx('app')}>
        <Menu />
        <GameSpace />
      </div>
    )
  }
}
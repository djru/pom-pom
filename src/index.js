import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import Container from './components/Container'

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission()
}

ReactDOM.render(<Container />, document.getElementById('root'))

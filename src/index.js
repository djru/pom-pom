import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Container from './Container'

if (Notification.permission !== 'granted') {
  Notification.requestPermission()
}

ReactDOM.render(<Container />, document.getElementById('root'))

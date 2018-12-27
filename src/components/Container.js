import React, { useState, useEffect } from 'react'

import TimeView from './TimeView'
import CycleView from './CycleView'
import OnBreakLabel from './OnBreakLabel'
import NotifSettings from './NotifSettings'

import { Provider } from '../context/ctx'
import ClickableCorner from './ClickableCorner'

let Container = props => {
  // set the state vars
  let [active, setActive] = useState(false)
  let [timer, setTimer] = useState(null)
  let [bannerMessage, setBannerMessage] = useState(null)
  let [showNotifs, setShowNotifs] = useState(
    window.localStorage.getItem('showNotifs') === 'true',
  )
  let [workTime, setWorkTime] = useState(
    parseInt(window.localStorage.getItem('workTime')) || 25 * 60,
  )
  let [breakTime, setBreakTime] = useState(
    parseInt(window.localStorage.getItem('breakTime')) || 5 * 60,
  )
  let [count, setCount] = useState((workTime + breakTime) * 4)
  let [bannerMsg, setBannerMsg] = useState('')

  // when the active state changes, create or destroy the interval timer
  useEffect(
    () => {
      if (active) {
        setTimer(setInterval(countDown, 1000))
      } else if (!active) {
        clearInterval(timer)
        setTimer(null)
      }
      return () => {
        clearInterval(timer)
      }
    },
    [active],
  )
  // we want this state to save to localstorage
  useEffect(
    () => {
      console.log('writing to localstorage', workTime, breakTime, showNotifs)
      window.localStorage.setItem('workTime', workTime)
      window.localStorage.setItem('breakTime', breakTime)
      window.localStorage.setItem('showNotifs', showNotifs)
    },
    [showNotifs, workTime, breakTime],
  )

  // when the count hits 0, decrement the cycle and reset the count
  // if we're at 3 seconds, show notificaiton to start break
  useEffect(
    () => {
      if (showNotifs && active && 'Notification' in window) {
        if (count <= breakTime) {
          new Notification("You're all done! Congrats!")
          setBannerMsg('You finished all your cycles!')
          reset(workTime + breakTime)
        } else if (count % (workTime + breakTime) === breakTime) {
          new Notification('Time for your break!')
        } else if (count % (workTime + breakTime) === 0) {
          new Notification('Time to get back to work!')
        }
      }
    },
    [count],
  )

  // helpers
  let countDown = () => {
    setCount(s => s - 1)
  }

  let reset = t => {
    clearTimeout(timer)
    setTimer(null)
    setActive(false)
    setCount(t * 4)
  }

  let set_cycle_number_to = e => {
    if (parseInt(e) % 1 === 0 && parseInt(e) > 0) {
      let g = ((count - 1) % (workTime + breakTime)) + 1
      setCount(g + (parseInt(e) - 1) * (workTime + breakTime))
    }
  }

  return (
    <Provider
      value={{
        count,
        active,
        timer,
        setCount,
        setActive,
        setTimer,
        set_cycle_number_to,
        bannerMessage,
        setBannerMessage,
        showNotifs,
        setShowNotifs,
        workTime,
        setWorkTime,
        breakTime,
        setBreakTime,
        setBannerMsg,
        reset,
      }}>
      <div
        className="bannerMsg"
        style={{ display: bannerMsg.length ? 'block' : 'none' }}>
        {bannerMsg}
      </div>
      <div
        className={
          'App ' +
          (((count - 1) % (workTime + breakTime)) + 1 <= breakTime
            ? 'break'
            : '')
        }>
        <div className="headerGroup">
          <h1 className="header">PomPom</h1>
          <h2 className="subHeader">The Simple Pomodoro Timer</h2>
        </div>
        <div className="timeGroup">
          <TimeView />
          <OnBreakLabel />
        </div>
        <div className="cycleGroup">
          <CycleView />
        </div>
        <NotifSettings />
        <ClickableCorner corner="top left" headerText={'What is Pomodoro?'}>
          <p>
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
              The Pomodoro Technique
            </a>{' '}
            is a time management method developed by Francesco Cirillo. The
            technique uses a timer to break down work into intervals,
            traditionally 25 minutes in length, separated by short breaks. These
            intervals are named pomodoros.
          </p>
        </ClickableCorner>
      </div>
    </Provider>
  )
}

export default Container

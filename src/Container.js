import React, { useState, useEffect } from 'react'

import TimeView from './TimeView'
import CycleView from './CycleView'
import OnBreakLabel from './OnBreakLabel'
import NotifSettings from './NotifSettings'

import { Provider } from './ctx'

let Container = props => {
  let [active, setActive] = useState(false)
  let [timer, setTimer] = useState(null)
  let [bannerMessage, setBannerMessage] = useState(null)
  let [showNotifs, setShowNotifs] = useState(true)
  let cycleTime = 20 * 60
  let breakTime = 5 * 60
  let [count, setCount] = useState(cycleTime * 4)
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

  // when the count hits 0, decrement the cycle and reset the count
  // if we're at 3 seconds, show notificaiton to start break
  useEffect(
    () => {
      if (showNotifs && active) {
        if (count <= breakTime) {
          new Notification("You're all done! Congrats!")
          setBannerMsg('You finished all your cycles!')
          reset(cycleTime)
        } else if (count % cycleTime === breakTime) {
          new Notification('Time for your break!')
        } else if (count % cycleTime === 0) {
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

  let format_time = c => {
    c = ((c - 1) % cycleTime) + 1
    if (c > breakTime) {
      c = c - breakTime
    }
    return Math.floor(c / 60) + ':' + (c % 60 < 10 ? '0' : '') + (c % 60)
  }

  let set_cycle_number_to = e => {
    if (parseInt(e) % 1 === 0 && parseInt(e) > 0) {
      setCount(((count - 1) % cycleTime) + 1 + (parseInt(e) - 1) * cycleTime)
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
        format_time,
        set_cycle_number_to,
        bannerMessage,
        setBannerMessage,
        showNotifs,
        setShowNotifs,
        cycleTime,
        breakTime,
        setBannerMsg,
      }}>
      <div
        className="bannerMsg"
        style={{ display: bannerMsg.length ? 'block' : 'none' }}>
        {bannerMsg}
      </div>
      <div
        className={
          'App ' + (((count - 1) % cycleTime) + 1 <= breakTime ? 'break' : '')
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
      </div>
      <NotifSettings />
    </Provider>
  )
}

export default Container

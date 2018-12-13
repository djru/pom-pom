import React, { useContext } from 'react'
import ctx from '../context/ctx'

let format_time = (c, w, b) => {
  let g = ((c - 1) % (w + b)) + 1
  if (g > b) {
    g = g - b
  }
  return Math.floor(g / 60) + ':' + (g % 60 < 10 ? '0' : '') + (g % 60)
}

let TimeView = props => {
  let c = useContext(ctx)
  return (
    <h1
      className="time"
      onClick={() => {
        c.setActive(!c.active)
        c.setBannerMsg('')
      }}>
      {format_time(c.count, c.workTime, c.breakTime)}
    </h1>
  )
}

export default TimeView

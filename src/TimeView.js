import React, { useContext } from 'react'
import ctx from './ctx'

let TimeView = props => {
  let c = useContext(ctx)
  return (
    <h1
      className="time"
      onClick={() => {
        c.setActive(!c.active)
        c.setBannerMsg('')
      }}>
      {c.format_time(c.count)}
    </h1>
  )
}

export default TimeView

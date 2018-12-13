import React, { useContext } from 'react'
import ctx from '../context/ctx'

let selectMessage = (c, w, b, a) => {
  let g = ((c - 1) % (w + b)) + 1
  if (g <= b) {
    return 'Take a break! You earned it!'
  } else if ((g > b && g < w + b) || a) {
    return "Keep working hard! You're so close!"
  } else {
    return 'Click the time to get started!'
  }
}

let OnBreakLabel = props => {
  let c = useContext(ctx)
  return (
    <h3 className="onBreakLabel">
      {selectMessage(c.count, c.workTime, c.breakTime, c.active)}
    </h3>
  )
}

export default OnBreakLabel

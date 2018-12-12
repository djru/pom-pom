import React, { useContext } from 'react'
import ctx from './ctx'

let OnBreakLabel = props => {
  let c = useContext(ctx)
  return (
    <h3 className="onBreakLabel">
      {c.active
        ? ((c.count - 1) % c.cycleTime) + 1 <= c.breakTime
          ? 'Take a nice little break!'
          : "Keep working hard, you're so close!"
        : 'Tap the time to ' +
          (c.count % c.cycleTime === 0 ? 'get started!' : 'resume!')}
      {}
    </h3>
  )
}

export default OnBreakLabel

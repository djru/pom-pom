import React, { useContext } from 'react'
import ctx from '../context/ctx'

let CycleView = props => {
  let c = useContext(ctx)
  let currentCycleNum = Math.ceil(c.count / (c.workTime + c.breakTime))
  return (
    <h2 className="cycleGroup">
      <button
        className="cycleUp"
        onClick={() => {
          c.set_cycle_number_to(currentCycleNum - 1)
          c.setBannerMsg('')
        }}>
        {'-'}
      </button>
      {currentCycleNum} Cycles Left
      <button
        className="cycleDown"
        onClick={() => {
          c.set_cycle_number_to(currentCycleNum + 1)
          c.setBannerMsg('')
        }}>
        {'+'}
      </button>
    </h2>
  )
}

export default CycleView

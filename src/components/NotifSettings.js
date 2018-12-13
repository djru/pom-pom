import React, { useContext, useEffect } from 'react'
import ctx from '../context/ctx'
import ClickableCorner from './ClickableCorner'

let NotifSettings = props => {
  let c = useContext(ctx)
  useEffect(() => {
    document.querySelector('#workLength').value = c.workTime / 60
    document.querySelector('#breakLength').value = c.breakTime / 60
    document.querySelector('#showNotifs').checked = c.showNotifs ? true : null
  })

  return (
    <ClickableCorner corner="top right" headerText="Settings">
      <div>
        <label htmlFor="showNotifs">Show notifications?</label>
        <input
          id="showNotifs"
          type="checkbox"
          onChange={e => {
            c.setShowNotifs(e.target.checked)
          }}
        />
      </div>
      <div>
        <label htmlFor="workLength">Cycle Length (min)</label>
        <input
          id="workLength"
          placeholder="mins"
          type="number"
          onChange={e => {
            let i = parseInt(e.target.value)
            console.log(i)
            if (i && i > 0) {
              c.setWorkTime(i * 60)
              c.reset(i * 60 + c.breakTime)
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="breakLength">Break Length (min)</label>
        <input
          id="breakLength"
          placeholder="mins"
          type="number"
          onChange={e => {
            let i = parseInt(e.target.value)
            if (i && i < c.workTime + c.breakTime && i > 0) {
              c.setBreakTime(i * 60)
              c.reset(c.workTime + i * 60)
            }
          }}
        />
      </div>
    </ClickableCorner>
  )
}

export default NotifSettings

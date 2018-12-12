import React, { useContext, useState, useEffect } from 'react'
import ctx from './ctx'

let NotifSettings = props => {
  let c = useContext(ctx)
  let [expanded, setExpanded] = useState(false)
  useEffect(
    () => {
      document.querySelector('#showNotif').checked = c.showNotifs
      console.log('notifications are now ' + c.showNotifs)
    },
    [c.showNotifs],
  )
  return (
    <div
      className={'notifSettings ' + (expanded ? 'expanded' : '')}
      onClick={() => {
        setExpanded(true)
      }}
      onMouseLeave={() => {
        setExpanded(false)
      }}>
      <span className="settingsHead">Settings</span>
      <div className="settingsContainer">
        <div>
          <label htmlFor="showNotif">Show notifications?</label>
          <input
            id="showNotif"
            type="checkbox"
            onChange={e => {
              c.setShowNotifs(e.target.checked)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NotifSettings

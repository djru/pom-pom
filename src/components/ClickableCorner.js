import React, { useState } from 'react'

let ClickableCorner = props => {
  let [expanded, setExpanded] = useState(false)
  return (
    <div
      className={'corner ' + props.corner + (expanded ? ' expanded' : '')}
      onClick={() => {
        setExpanded(true)
      }}
      onMouseLeave={() => {
        setExpanded(false)
      }}>
      <span className="cornerHeader">{props.headerText}</span>
      {props.children}
    </div>
  )
}

export default ClickableCorner

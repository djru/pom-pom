import React, { useContext } from 'react'
import ctx from '../context/ctx'

let ButtonsView = props => {
  let c = useContext(ctx)
  return (
    <button onClick={c.reset} className="resetButton">
      reset
    </button>
  )
}

export default ButtonsView

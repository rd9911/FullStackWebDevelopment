import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// change the Toggle so that it uses redux state. take off all the refs froom the app. Refactor the app so that everything was in its own componennt


const Toggable = React.forwardRef((props, ref) => {
  const [formVisible, setFormVisible] = useState(false)

  const handleCreateBlogClick = () => {
    setFormVisible(!formVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      handleCreateBlogClick
    }
  })

  return (
    <div>
      <div style={{ display: formVisible ? 'None' : '' }}>
        <input className={props.btnLabel} type='button' value={props.btnLabel} onClick={handleCreateBlogClick} />
      </div>
      <div style={{ display: formVisible ? '' : 'None' }} className='show-child'>
        {props.children}
        <input type='button' value='cancel' onClick={handleCreateBlogClick} />
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'
Toggable.propTypes = { btnLabel: PropTypes.string.isRequired }

export default Toggable
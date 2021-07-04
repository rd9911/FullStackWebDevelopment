import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
        <input type='button' value={props.btnLabel} onClick={handleCreateBlogClick} />
      </div>
      <div style={{ display: formVisible ? '' : 'None' }} className='show-child'>
        {props.children}
        <input type='button' value='cancel' onClick={handleCreateBlogClick} />
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

export default Toggable
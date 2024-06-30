import { useState, forwardRef, useImperativeHandle } from 'react'

import PropTypes from 'prop-types'

const Togglable = forwardRef((props,refs) =>{

    const [visible,setVisible] = useState(false)

    const showVisible = { display: visible ? 'none' : '' }

    const hideVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible) //event handler which toggles visibility
      }
    
    useImperativeHandle(refs, () => { //for the references. this way thou return toggle visibility.
        return {
        toggleVisibility
        }
    })


    return(
        <div>
        <div style={showVisible}>
            <button id='new-blog-button' onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={hideVisible}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
        </div>
    )

})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  
Togglable.displayName = 'Togglable'

export default Togglable
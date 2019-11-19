import React from 'react'
import './homepage.styles.scss'

import Directory from '../../components/directory/directory.component'

//The main page 
const HomePage = () => {
    return(
        <div className = "homepage">
            <Directory/>
        </div>
    )
    
}

export default HomePage
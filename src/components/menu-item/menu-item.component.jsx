import React from 'react'
import './menu-item.styles.scss'
import {withRouter} from 'react-router-dom'

//This is the individual picture item on the main directory. Therefore will be called 5 different times in the directory component.
const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => {
    return (
        <div className = {`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}> {/*history.push() will just relink the url and therefore redirect the user to another page in our application. match.url = '/' and linkUrl='shop/hats'  For example "/shop/hats" */}
            <div className="background-image" style ={{
                backgroundImage: `url(${imageUrl})`
            }} />
            {/* Below is the div with white opaqe square in the middle. */}
            <div className = "content">
                <h1 className = "title">{title.toUpperCase()}</h1>
                <span className = "subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem)
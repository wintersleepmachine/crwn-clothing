import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'
import {selectDirectorySections} from '../../redux/directory/directory.selectors'

//The part of the homepage which displays the main 5 categories and pictures. Each one of those 5 items are the <MenuItem /> component.
//Directoy component stores state with a property called sections.
const Directory = ({sections}) => {

    //Rendering <MenuItem /> component this.state.sections.length (5) times. Passing in title, imageUrl,size and linkUrl as "otherSectionProps" as props to the MenuItem component.
        return (
            <div className = 'directory-menu'>
                {sections.map(({id, ...otherSectionProps}) => {
                    return (<MenuItem key ={id} {...otherSectionProps}/>)
                })}
            </div>
        )

}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})


export default connect(mapStateToProps)(Directory)
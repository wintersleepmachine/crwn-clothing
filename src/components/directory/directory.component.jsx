import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

//The part of the homepage which displays the main 5 categories and pictures. Each one of those 5 items are the <MenuItem /> component.
//Directoy component stores state with a property called sections.
class Directory extends React.Component {
    constructor(){
        super()

        this.state = {
            sections: [
                {
                  title: 'hats',
                  imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                  id: 1,
                  linkUrl: 'shop/hats'
                },
                {
                  title: 'jackets',
                  imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                  id: 2,
                  linkUrl: 'shop/jackets'
                },
                {
                  title: 'sneakers',
                  imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                  id: 3,
                  linkUrl: 'shop/sneakers'
                },
                {
                  title: 'womens',
                  imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                  size: 'large',
                  id: 4,
                  linkUrl: 'shop/womens'
                },
                {
                  title: 'mens',
                  imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                  size: 'large',
                  id: 5,
                  linkUrl: 'shop/mens'
                }
              ]  
        }
    }

    //Rendering <MenuItem /> component this.state.sections.length (5) times. Passing in title, imageUrl,size and linkUrl as "otherSectionProps" as props to the MenuItem component.
    render(){
        return (
            <div className = 'directory-menu'>
                {this.state.sections.map(({id, ...otherSectionProps}) => {
                    return (<MenuItem key ={id} {...otherSectionProps}/>)
                })}
            </div>
        )
    }

}

export default Directory
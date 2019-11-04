import React from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton  from './../custom-button/custom-button.component'
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends React.Component{
    constructor(){
        super()

        this.state = {
            email:'',
            password: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const {email, password} = this.state
        try {
            //Signs in with email and password into firebase
            await auth.signInWithEmailAndPassword(email, password); //This will trigger auth.onAuthStateChanged() in our app component
            this.setState({email:'', password: ''})
        }catch(e){
            console.log(e)
        }
        
        
    }

    handleChange = (e) => {
        const {value, name} = e.target

        this.setState({[name]: value})
    }

    render(){
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        required 
                        type="email" 
                        name="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="Email" 
                    />
                    <FormInput 
                        required 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label="Password" 
                    />
                    <div className = 'button'>
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign in with Google</CustomButton> {/* Whenever we click this google sign in button, signInWithGoogle will trigger google sign in prompt and firebase will handle authentication.*/}
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn
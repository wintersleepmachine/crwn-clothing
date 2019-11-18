import React, {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import './sign-in.styles.scss'
import CustomButton  from './../custom-button/custom-button.component'
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({email:'', password: ''})
   
    const {email, password} = userCredentials

    const handleSubmit = async (e) => {
        e.preventDefault()

        
        try {
            //Signs in with email and password into firebase
            await auth.signInWithEmailAndPassword(email, password); //This will trigger auth.onAuthStateChanged() in our app component
            setCredentials({email:'', password: ''})
        }catch(e){
            console.log(e)
        }
    }

    const handleChange = (e) => {
        const {value, name} = e.target

        setCredentials({...userCredentials, [name]: value})
    }

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        required 
                        type="email" 
                        name="email" 
                        value={email} 
                        handleChange={handleChange}
                        label="Email" 
                    />
                    <FormInput 
                        required 
                        type="password" 
                        name="password" 
                        value={password} 
                        handleChange={handleChange}
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

export default SignIn
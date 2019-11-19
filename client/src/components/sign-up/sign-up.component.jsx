import React, {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

const SignUp = () => {
    // constructor(){
    //     super()

    //     this.state = {
    //        displayName: '',
    //        email: '',
    //        password: '',
    //        confirmPassword: ''
    //     }
    // }

    const [userCredentials, setUserCredentials] = useState({
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const {displayName, email, password, confirmPassword} = userCredentials

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            alert('Passwords dont match')
            return;
        }

        try {
            //Creates a new user account associated with the specified email address and password.
            //On successful creation of the user account, this user will also be signed into your application. 
            //Gives back a userAuth object, thats why we destructure 'user'
            const {user} = await auth.createUserWithEmailAndPassword(email, password)

            //Create and save user document to the firestore database.
            await createUserProfileDocument(user, {displayName})

            // If it works we reset our form inputs.
            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
             })
        
        }catch (e){
            console.log(e)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserCredentials({...userCredentials, [name]: value})
    }

        return(
            <div className = 'sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />

                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        label= 'Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    
}

export default SignUp
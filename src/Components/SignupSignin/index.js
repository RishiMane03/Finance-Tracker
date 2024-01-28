import React,{useState} from 'react';
import './style.css'
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword,signInAnonymously,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import {setDoc,doc, getDoc} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../../firebase';



const SignupSignin = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [loginForm,setLoginForm] = useState(false)
    const navigate = useNavigate()

    function signupWithEmail(e){
        setLoading(true)

        e.preventDefault()
        console.log('name >> ',name);
        console.log('email >> ',email);
        console.log('password >> ',password);
        console.log('confirmPassword >> ',confirmPassword);
        
        // Authenticate user basically create new user with this data
        if(name!='' && email!='' && password!='' && confirmPassword!=''){
            if(password==confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log('New Signup User >> ',user);

                        // toast.success('New User Created')
                        setLoading(false)
                        setConfirmPassword('')
                        setEmail('')
                        setName('')
                        setPassword('')

                        // Create a doc with user id
                        createDoc(user)
                        navigate('/dashboard')
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoading(false)
                    });
            }else{
                toast.error('Password and Confirm Password should be same')
                setLoading(false)
            }
        }else{
            // show error here using react-toastify
            toast.error('Please fill all details')
            setLoading(false)
        }
    }

    function loginWithEmail(e){
        e.preventDefault()
        // console.log('email >> ',email);
        // console.log('password >> ',password);
        setLoading(true)

        if(email!='' && password!='' ){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Login User >> ',user);
                setLoading(false)

                toast.success('Welcome To Money Affair')
                navigate('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false)
            });
        }else{
            // show error here using react-toastify
            toast.error('Please fill all details')
            setLoading(false)
        }
    }

    async function createDoc(user){
        setLoading(true)
        // Make sure that doc with uid dont exits (if true then create doc)

        if(!user) return

        const userRef = doc(db,'users',user.uid)
        const userData = await getDoc(userRef)

        if(!userData.exists()){
            try {
                await setDoc(doc(db, 'users', user.uid),{
                    name: user.displayName ? user.displayName : name,
                    email : user.email,
                    photoURL: user.photoURL ? user.photoURL : '',
                    createdAt: new Date()
                })
                // toast.success('Doc created!')
                setLoading(false)
            } catch (error) {
                toast.error(error.message)
                setLoading(false)
            }
        }else{
            // toast.error('Doc already exists!')
            setLoading(false)
        }
    }

    function googleAuth(){
        // signIn using google
        setLoading(true)
        try {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('google signin user > ',user);
                createDoc(user)
                setLoading(false)
                navigate('/dashboard')
                // toast.success('User authenticated')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(true)
            });
            
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
        
    }

    function anonymously(){
        // signIn using google
        setLoading(true)
        try {
            signInAnonymously(auth)
            .then(() => {
                // Signed in..
                setLoading(false)
                navigate('/dashboard')
                // toast.success('User authenticated')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(true)
                // ...
            });
            
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
        
    }



    return ( 
    <>
        {
            loginForm ? 
            <div className='signup-wrapper'>
            <div class="box">
                <div class="form">
                    <h2>LogIn with</h2>
                    <form>
                        <Input type={'email'} state={email} setState={setEmail} placeholder={'Email'} />
                        <Input type={'password'} state={password} setState={setPassword} placeholder={'Password'} />

                        <Button disabled={loading} 
                            text={loading?
                            <div class="data-loader">
                                <div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            :'Sign Up With Email'} 
                            onClick={signupWithEmail}
                        />

                        {/* <Button disabled={loading} 
                            text={loading?'Loading...':'Log In With Email'} 
                            onClick={loginWithEmail}
                        /> */}

                        {/* <Button disabled={loading} 
                            text={loading?'Loading...':'Log In Using Google'} 
                            blue={true} 
                            onClick={googleAuth}
                        /> */}

                        <div className='loginoption'>
                            <img 
                                className='googleLogo'
                                src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3"
                                disabled={loading}
                                onClick={googleAuth}
                            />

                            <img 
                                className='googleLogo'
                                src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1705247643~exp=1705248243~hmac=e66024864ef66042bb3ecdc8f9cecea6eef3c9de861f81ef4ad44abbabd95d74"
                                disabled={loading}
                                onClick={anonymously}
                            />
                        </div>

                        <p className='alreadyHaveAcc' onClick={()=>setLoginForm(!loginForm)}>or Don't have account? Click Here</p>

                        {/* disabled={loading} >> So that user wont clicked button again and again */}
                    </form>
                </div>
            </div>
            </div>
            : 
            <div className='signup-wrapper'>
            <div class="box">
                <div class="form">
                    <h2>SignUp with</h2>
                    <form>
                        <Input type={'text'} state={name} setState={setName} placeholder={'Username'} />
                        <Input type={'email'} state={email} setState={setEmail} placeholder={'Email'} />
                        <Input type={'password'} state={password} setState={setPassword} placeholder={'Password'} />
                        <Input type={'password'} state={confirmPassword} setState={setConfirmPassword} placeholder={'Confirm Password'} />


                        <Button disabled={loading} 
                            text={loading?
                            <div class="data-loader">
                                <div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            :'Sign Up With Email'} 
                            onClick={signupWithEmail}
                        />


                        <div className='loginoption'>  
                        
                            <img 
                                className='googleLogo'
                                src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3"
                                disabled={loading}
                                onClick={googleAuth}
                            />

                            <img 
                                className='googleLogo'
                                src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1705247643~exp=1705248243~hmac=e66024864ef66042bb3ecdc8f9cecea6eef3c9de861f81ef4ad44abbabd95d74"
                                disabled={loading}
                                onClick={anonymously}
                            />
                        </div> 


                        <p className='alreadyHaveAcc' onClick={()=>setLoginForm(!loginForm)}>or Already have account? Click Here</p>

                        {/* disabled={loading} >> So that user wont clicked button again and again */}
                    </form>
                </div>
            </div>
            </div>
        }
    </>
        
     );
}
 
export default SignupSignin;
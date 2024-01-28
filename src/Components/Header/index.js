import './style.css'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Header = ({setIsDarkMode,isDarkMode}) => {

    // if i login and close the tab and again open the url then it should directly show me dashboard
    // it should not make me to login again like (kite/upstox)
    // this is react-firebase-hook
    const [user, loading] = useAuthState(auth);
  

    const navigate = useNavigate()


    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }

    },[user,loading])

    function handleLogout(){
        try {
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success('Logout successful')
                navigate('/')
              }).catch((error) => {
                // An error happened.
                toast.error(error.message)
              });
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        document.body.classList.toggle('dark-theme', isDarkMode);
        document.body.classList.toggle('light-theme', !isDarkMode);
    };
    
   
    return ( 
        <div className="navbar">
            <div className='symlogo'>
                <p className='symbol'>₹</p>
                <a href="/" class="logo">Money <b>Affair</b></a>
            </div>

            {
                user && (
                    <div style={{display:'flex', alignItems:'center', gap:'0.8rem'}}>
                        <div>
                            <input type="checkbox" checked={!isDarkMode} onChange={toggleTheme} class="checkbox" id="checkbox"/>
                            <label for="checkbox" class="checkbox-label">
                                <i class="fas fa-moon"></i>
                                <i class="fas fa-sun"></i>
                                <span class="ball"></span>
                            </label>
                            </div>
                            {console.log('user.photoURL > ',user.photoURL)}

                        <img 
                            src={user.photoURL ? user.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}
                            
                            style={{borderRadius:'50%',height:'2rem', width:'2rem'}}
                        />

                        <p className='logo link' onClick={handleLogout}>Logout</p>
                    </div>
                )
            }
        </div>
     );
}
 
export default Header;
import Header from '../Components/Header'
import SignupSignin from '../Components/SignupSignin';


const Signup = () => {
    return ( 
        <div>
            <div className='wrapper'>
                <div style={{display:'none'}}>
                    <Header/>
                </div>
                <SignupSignin/>
            </div>
            
        </div>
     );
}
 
export default Signup;
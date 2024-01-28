import './style.css'



const Input = ({ type,lable,state,setState,placeholder }) => {


    return ( 
        <div>
            <div class="inputBox">
                <input 
                    value={state} onChange={(e)=>setState(e.target.value)} 
                    type={type} required="required"
                />
                <span>{placeholder}</span>
                <i></i>
            </div>


            
        </div>
     );
}
 
export default Input;

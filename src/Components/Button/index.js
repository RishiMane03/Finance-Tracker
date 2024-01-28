import './style.css'


const Button = ({text,onClick,blue,disabled}) => {


    return ( 
        <div>
            
            <button disabled={disabled} className={blue? 'btn btn-blue' : 'btn'} onClick={onClick}>{text}</button>
            
        </div>
     );
}
 
export default Button;
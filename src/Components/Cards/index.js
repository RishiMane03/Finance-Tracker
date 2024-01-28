import { Card, Row } from 'antd';
import './style.css'
import Button from '../Button/';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { firestore } from '../../firebase';
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Cards = ({ income,expense,totalBalance,showExpenseModal,showIncomeModal,userID,newTransactions }) => 
{

    console.log('userID >> ',userID);

    // const handleResetBalance = async () => {
    //     try {
           
    //       // await deleteDoc(doc(db,  `user/${userID}/trasactions`, 'AdcEGeFM9xPsY9jwx9Ml'));

    //        const transactionsRef = doc(db, `user/${userID}/transactions`, 'N8LJwD3x9LPXT8e3o0F4');
        
    //       // Log the document reference for debugging
    //       console.log('Document Reference:', transactionsRef);

    //       // Remove the 'transactions' field from the document
    //       await updateDoc(transactionsRef, {
    //           newTransactions: deleteField ()
    //       });


    //       console.log('Document deleted successfully.');
            
    //     } catch (error) {
    //       console.error('Error deleting document:', error);
    //     }
    // };
    
    return ( 
        <div>
            <Row className='my-row'>
                {/* <Card className='my-card currentBalance' title='Current Balance'>
                    <h1>₹ {totalBalance}</h1>
                </Card> */}
                
                <div class="wrapper">
                    <div class="container">
                        <div class="card">
                        <div class="top">
                            <h2>Current Balance</h2>
                            <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
                        </div>
                        <div class="infos">
                            <h1 className='totalMoney'>₹ {totalBalance}</h1>

                            <section class="card-number">
                            <p>Card Number</p>
                            <h1>5495 9549 **** ****</h1>
                            </section>
                            <div class="bottom">
                                <aside class="infos--bottom">
                                    <section>
                                    <p>Expiry date</p>
                                    <h3>**/**</h3>
                                    </section>
                                    <section>
                                    <p>CVV</p>
                                    <h3>***</h3>
                                    </section>
                                </aside>
                                <aside>
                                    <section>
                                    <img src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png" class="brand" />
                                    </section>
                                </aside>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <Card className='my-card' title='Total Income'>
                    <h2>₹{income}</h2>
                    <Button text='Add Income' onClick={showIncomeModal} />
                </Card>

                <Card className='my-card' title='Total Expense'>
                    <h2>₹{expense}</h2>
                    <Button text='Add Expense' onClick={showExpenseModal} />
                </Card>
            </Row>
        </div>
     );
}
 
export default Cards;
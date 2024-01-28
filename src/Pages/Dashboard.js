import moment from "moment";
import React,{useState,useEffect} from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import { Modal } from "antd";
import AddExpenseModal from '../Components/Modals/addExpense'
import AddIncomeModal from '../Components/Modals/addIncome'
import { addDoc, collection, getDocs, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import TransactionTable from "../Components/TransactionTable";
import ChartComponent from "../Components/Charts";
import NoTransaction from "../Components/NoTransaction";

const Dashboard = ({isDarkMode,setIsDarkMode}) => {

    const [user] = useAuthState(auth)
    const [isExpenseModalVisible,setIsExpenseModalVisible] =useState(false)
    const [isIncomeModalVisible,setIsIncomeModalVisible] =useState(false)
    const [transactions,setTransactions] = useState([])
    const [loading,setLoading] = useState(false)
    

    const [transactionIds, setTransactionIds] = useState([]);

    const [income,setIncome] = useState(0)
    const [expense,setExpense] = useState(0)
    const [totalBalance,setTotalBalance] = useState(0)
    // const [currentBalance,setCurrentBalance] = useState(0)
    const [userUID,setuserUID] = useState('')

    const showExpenseModal = ()=>{
        setIsExpenseModalVisible(true)
    }

    const showIncomeModal = ()=>{
        setIsIncomeModalVisible(true)
    }

    const handleExpenseCancle = ()=>{
        setIsExpenseModalVisible(false)
    }

    const handleIncomeCancle = ()=>{
        setIsIncomeModalVisible(false)
    }

    const onFinish= (values,type)=>{
        const newTransaction = {
            type:type,
            date: values.date.format('YYYY-MM-DD'), //moment is used to create global variable
            amount: parseFloat(values.amount),
            tag: values.tag,
            name: values.name   
        }
        addTransaction(newTransaction)
    }

    // async function addTransaction(transaction,many){
    //     // this will add a doc
    //     try {
    //         const docRef = await addDoc(
    //             collection(db, `user/${user.uid}/trasactions`),
    //             transaction
    //         )
    //         console.log('document written with id > ',docRef.id);
    //         setTransactionIds((prevIds) => [...prevIds, docRef.id]);

    //         if(!many) toast.success('Transaction added')
    //         let newArr = transactions
    //         newArr.push(transaction)
    //         setTransactions(newArr)
    //         calculateBalance()
    //     } catch (error) {
    //         console.log('transaction error > ',error);
    //         if(!many) toast.error("Couldn't add transaction")
    //     }
    // }

    // async function addTransaction(transaction, many) {
    //     try {
    //         const docRef = await addDoc(
    //             collection(db, `user/${user.uid}/transactions`),
    //             transaction
    //         );

    //         // Get the ID of the newly added transaction
    //         const transactionId = docRef.id;
    //         console.log('document written with id > ', transactionId);

    //         // Update the state with the new transaction ID
    //         setTransactionIds((prevIds) => [...prevIds, transactionId]);

    //         if (!many) toast.success('Transaction added');

    //         let newArr = transactions;
    //         newArr.push(transaction);
    //         setTransactions(newArr);
    //         calculateBalance();
    //     } catch (error) {
    //         console.log('transaction error > ', error);
    //         if (!many) toast.error("Couldn't add transaction");
    //     }
    // }


    async function fetchTransaction() {
        setLoading(true);
        if (user) {
            const q = query(collection(db, `user/${user.uid}/transactions`));
            setuserUID(user.uid);
            const querySnapshot = await getDocs(q);
            let transactionsArray = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                transactionsArray.push({ ...data, id: doc.id });
            });
            setTransactions(transactionsArray);
            toast.success('Transaction Fetch');
        }
        setLoading(false);
    }
    
    async function addTransaction(transaction, many) {
        try {
            const docRef = await addDoc(
                collection(db, `user/${user.uid}/transactions`),
                transaction
            );
    
            // Get the ID of the newly added transaction
            const transactionId = docRef.id;
            console.log('document written with id > ', transactionId);
    
            // Include the ID in the new transaction object
            const newTransaction = { ...transaction, id: transactionId };
    
            // Update the state with the new transaction including the ID
            setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    
            // Update the state with the new transaction ID
            setTransactionIds((prevIds) => [...prevIds, transactionId]);
    
            if (!many) toast.success('Transaction added');
            calculateBalance();
        } catch (error) {
            console.log('transaction error > ', error);
            if (!many) toast.error("Couldn't add transaction");
        }
    }
    

    useEffect(()=>{
        calculateBalance()
    },[transactions])

    const calculateBalance = ()=>{
        let incomeTotal = 0;
        let expenseTotal = 0;

        transactions.forEach((transaction) => {
            if(transaction.type === 'income'){
                incomeTotal += transaction.amount
            }
            if(transaction.type === 'expense'){
                expenseTotal += transaction.amount
            }
        });

        setIncome(incomeTotal)
        setExpense(expenseTotal)
        setTotalBalance(incomeTotal-expenseTotal)
    }

    useEffect(() => {
        // storing all the docs in an array
        fetchTransaction()
    }, [user])

    // async function fetchTransaction(){
    //     setLoading(true)
    //     if(user){
    //         const q = query(collection(db, `user/${user.uid}/trasactions`))
    //         setuserUID(user.uid)
    //         const querySnapshot = await getDocs(q);
    //         let transactionsArray = []
    //         querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //             // console.log(doc.id, " => ", doc.data());
    //             transactionsArray.push(doc.data())
    //         });
    //         setTransactions(transactionsArray)
    //         toast.success('Transaction Fetch')
    //     }
    //     setLoading(false)
    // }

    
    let sortedTransactions = transactions.sort((a,b)=>{
        return new Date(a.date) - new Date(b.date)
    })

    const updateTransactions = (updatedTransactions) => {
        setTransactions(updatedTransactions);
    };
    
    

    return ( 
        <div className="dashboard"> 
            <Header setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>

            {
            loading?(<p>Loading...</p>) :
            
                (<>
                    <Cards
                        income={income}
                        expense={expense}
                        totalBalance={totalBalance}
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}
                        userID={userUID}
                    />

                    {
                        transactions && transactions.length !== 0 ? 
                        <ChartComponent sortedTransactions={sortedTransactions}/> 
                        : 
                        <NoTransaction/>

                    }

                    <AddExpenseModal
                        isExpenseModalVisible={isExpenseModalVisible}
                        handleExpenseCancle={handleExpenseCancle}
                        onFinish={onFinish}
                        currentBalance = {totalBalance}
                    />

                    <AddIncomeModal
                        isIncomeModalVisible={isIncomeModalVisible}
                        handleIncomeCancle={handleIncomeCancle}
                        onFinish={onFinish}
                    />

                    <TransactionTable 
                        transactions={transactions} 
                        addTransaction={addTransaction} 
                        fetchTransaction={fetchTransaction} 
                        transactionIds={transactionIds} 
                        updateTransactions={updateTransactions}
                    />
                </>)
            }

        </div>
     );
}
 
export default Dashboard;


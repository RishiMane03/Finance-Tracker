import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react'
import Button from '../Button'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import './style.css'
import { addDoc, collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function TransactionTable({ transactions,addTransaction,fetchTransaction,transactionIds,updateTransactions,onEditFinish    }) {
    
    const [user] = useAuthState(auth)
    const {Option} = Select
    const [search,setSearch] = useState('')
    const [typeFilter,setTypeFilter] = useState('')
    const [sortKey,setSortKey] = useState('')

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          sorter: (a, b) => a.amount - b.amount,
          sortDirections: ['ascend', 'descend'],
          // Add filter properties for Amount column
          filters: [
            { text: 'Greater than 1000', value: 'gt1000' },
            { text: 'Less than 1000', value: 'lt1000' },
            // Add more filter options as needed
          ],
          onFilter: (value, record) => {
            if (value === 'gt1000') {
              return record.amount > 1000;
            } else if (value === 'lt1000') {
              return record.amount < 1000;
            }
            // Add more filter conditions as needed
            return true;
          },  
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <>
              <button 
                style={{border:'none', outline:'none', background: 'transparent', cursor:'pointer', scale:'1.2'}} 
                onClick={() => handleDelete(record)}>
                   <i class="fa-solid fa-trash"></i> 
              </button>
            </>
          ),
        },
    ];


    async function handleDelete(record) {
      try {
          if (user) {
              // Assuming transactions are stored in Firestore under "transactions" collection
              const docRef = doc(db, `user/${user.uid}/transactions/${record.id}`);

              // Delete the document from Firestore
              await deleteDoc(docRef);

              // Update the local state by calling the prop function
              const updatedTransactions = transactions.filter((transaction) => transaction.id !== record.id);
              updateTransactions(updatedTransactions);

              toast.success('Transaction Deleted');
          }
      } catch (error) {
          console.error('Error deleting transaction: ', error);
      }
    }

    
    // let filteredTransactions = transactions.filter((item) =>
    //   item.name.toLowerCase().includes(search.toLowerCase()) &&
    //   (typeFilter === '' || item.type.includes(typeFilter))
    // );

    let filteredTransactions = transactions.filter((item) =>
      item && item.name && item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === '' || (item.type && item.type.includes(typeFilter)))
    );


    let sortedTransactions = filteredTransactions.sort((a,b)=>{
      if (sortKey === 'date'){
          return new Date(a.date) - new Date(b.date)
      }else if(sortKey === 'amount'){
          return a.amount - b.amount
      }else{
          return 0
      }

    })

    function exportCSV() {
      // Extracting only the necessary fields from each transaction
      const data = transactions.map(({ name, type, tag, date, amount }) => [name, type, tag, date, amount]);
    
      // Using unparse with corrected data structure
      const csv = unparse({
        fields: ["name", "type", "tag", "date", "amount"],
        data: data,
      });
    
      // Creating Blob to Download data
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'transaction.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function importCSV(event){
      event.preventDefault()

      try {
        parse(event.target.files[0],{
          header : true,
          complete : async function (results) {
            console.log('RESULTS > ',results);
            // results.data is array of obj representing your CSV row
            for (const transaction of results.data) {
              // write each transcation to fireBase, you can use addTransaction function here
              console.log("transaction",transaction);
              const newTransaction = {
                ...transaction,
                amount : parseFloat(transaction.amount),
              }
              await addTransaction(newTransaction,true)
            }
          }
        })

        toast.success("All Transactions Added")
        fetchTransaction()
        event.target.files = null
      } catch (error) {
        toast.error(error.message)
      }
    }

    return (
      <div className='transactionTable'>
        <div className='inputAndSortingData'>
          
          <div className='inputNall'>
            <div className='input-flex'>
              {/* <img src='' alt='searchBar' width='16' /> */}
              <i class="fa-solid fa-magnifying-glass"></i>
              <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder='Search by name'
              />
            </div>
              
            <Select
              className='select-input'
              onChange={(value)=>setTypeFilter(value)}
              value={typeFilter}
              placeholder='Filter'
              allowClear
            >
              <Option value="">All</Option>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </div>

          {/* Sorting Logic */}
          <div className='sortingList'>
            <h2 > My All Transactions </h2>
            
            <Radio.Group
              className='input-radio'
              onChange={(e)=>setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button className='radio-Btn' value="">No Sort</Radio.Button>
              <Radio.Button className='radio-Btn' value="date">Sort by Date</Radio.Button>
              <Radio.Button className='radio-Btn' value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>

            <div className='exportImport'>
              <button className='btnExport' onClick={exportCSV}>Export to CSV</button>
              {/* <Button text='Export to CSV' onClick={exportCSV} /> */}

              <label htmlFor='file-csv' className='import-csv btn blue-btn'>Import from CSV</label>
              <input
                id='file-csv'
                type='file'
                accept='.csv'
                required
                onChange={importCSV}
                style={{display: 'none'}}
              />
            </div>
          </div>
        </div>

        <div className='tableDiv'>
          <Table 
            dataSource={sortedTransactions} 
            columns={columns}  
          />
        </div>
      </div>
    );
       
}

export default TransactionTable


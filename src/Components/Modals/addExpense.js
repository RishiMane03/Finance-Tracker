import React,{useForm} from "react";
import { Modal,Button,Form,Input,DatePicker,Select } from "antd";


function AddExpenseModal({
        isExpenseModalVisible,
        handleExpenseCancle,
        onFinish,
        currentBalance
    }){
        const [form] = Form.useForm()

        const handleTagChange = (value, option) => {
            if (value === 'custom') {
              form.setFieldsValue({ tag: undefined }); // Clear the tag value
              form.setFields([{ name: 'tag', value: undefined, errors: [] }]);
              form.setFieldsValue({ customTag: undefined }); // Clear the custom input value
              form.setFields([{ name: 'customTag', value: undefined, errors: [] }]); // Clear validation errors
            } else {
              form.setFieldsValue({ customTag: undefined });
              form.setFields([{ name: 'customTag', value: undefined, errors: [] }]);
            }
        };
        
        const handleCustomTagChange = (value) => {
            // Update the tag value to the custom input value
            form.setFieldsValue({ tag: value });
        };

        return ( 
            <Modal
                style={{ fontWeight:600 }}
                title='Add Expense'
                visible={isExpenseModalVisible}
                onCancel={handleExpenseCancle}
                footer = {null}
            >

            
            <Form
                 form={form}
                 layout="Vertical"
                 onFinish={(values)=>{
                     onFinish(values, 'expense')
                     form.resetFields()
                 }}
            >
            
            <Form.Item
                style={{ fontWeight:600 }}
                label='Name'
                name='name'
                rules={[
                    {
                        required : true,
                        message : 'Please the name of the transaction!'
                    }
                ]}
            >
                <Input type="text" className="custom-input"/>
            </Form.Item>

            <Form.Item
                style={{ fontWeight:600 }}
                label='Amount'
                name='amount'
                rules={[
                    {
                        required : true,
                        message : 'Please the expense amount!'
                    }
                ]}
            >
                <Input type="number" className="custom-input"/>
            </Form.Item>

            <Form.Item
                style={{ fontWeight:600 }}
                label='Date'
                name='date'
                rules={[
                    {
                        required : true,
                        message : 'Please the expense Date!'
                    }
                ]}
            >
                <DatePicker className="custom-input" format='YYYY-MM-DD' />
            </Form.Item>

            <Form.Item
                style={{ fontWeight:600 }}
                label='Tag'
                name='tag'
                rules={[
                    {
                        required : true,
                        message : 'Please the tag!'
                    }
                ]}
            >
                <Select
                    className="select-input-2"
                    onChange={handleTagChange}
                    allowClear
                >
                    <Select.Option value='food'>Food</Select.Option>
                    <Select.Option value='education'>Book</Select.Option>
                    <Select.Option value='trip'>Trip</Select.Option>
                    <Select.Option value='movie'>Movie</Select.Option>
                </Select>
            </Form.Item>

             {/* Custom Tag Input */}
             <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Custom Tag"
                    name="customTag"
                    rules={[
                        {
                        required: form.getFieldValue("tag") === "custom",
                        message: "Please add a custom tag!",
                        },
                    ]}
                >
                <Input
                    type="text"
                    className="custom-input"
                    onChange={(e) => handleCustomTagChange(e.target.value)}
                />
                </Form.Item>

            <Form.Item>
            {
                currentBalance > 0 ? (
                    <Button htmlType="submit">Add Expense</Button>
                ) : (
                <p style={
                    { 
                        color: "white",
                        backgroundColor: "red", 
                        padding: '0.7rem', 
                        borderRadius:'10px',
                        textAlign: 'center'
                    }
                }>
                    Insufficient balance
                </p>
            )}
            </Form.Item>


            </Form>
        </Modal>

        );
    }

    


export default AddExpenseModal
 
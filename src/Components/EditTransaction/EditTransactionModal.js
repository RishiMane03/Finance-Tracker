// EditTransactionModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditTransactionModal = ({ isVisible, onCancel, onFinish, transaction }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Reset the form fields when the modal is opened
    form.resetFields();
  }, [isVisible, form, transaction]);

  const handleFinish = (values) => {
    const updatedTransaction = {
      ...transaction,
      ...values,
      date: values.date.format('YYYY-MM-DD'), // Ensure date is formatted correctly
    };
    onFinish(updatedTransaction);
  };

  return (
    <Modal
      title="Edit Transaction"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{
          name: transaction?.name,
          amount: transaction?.amount,
          tag: transaction?.tag,
          type: transaction?.type,
          date: moment(transaction?.date),
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please enter the amount!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Tag" name="tag">
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select the type!' }]}
        >
          <Select>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select the date!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTransactionModal;

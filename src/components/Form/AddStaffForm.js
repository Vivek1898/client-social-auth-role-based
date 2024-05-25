import React from 'react';
import { Button, Table, Modal, Input, Switch, Form } from 'antd';

const AddStaffForm = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();

    const handleAddSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                onAdd(values);
                form.resetFields();
                onCancel();
            })
            .catch((error) => {
                console.error('Validation failed:', error);
            });
    };

    return (
        <Modal
            title="Add Staff"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleAddSubmit}>
                    Add Staff
                </Button>,
            ]}
        >
            <Form form={form} name="addStaffForm">
                {/* Form fields for adding staff */}
            </Form>
        </Modal>
    );
};

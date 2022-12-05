import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from '../../services/categories.service';
import { authenticatedRoutesConstant } from '../../util/constant';

const AddEditCategory = () => {

    const [form] = Form.useForm();
    //const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addCategoryCall = async (values) => {
        setLoading(true);
        const { ok } = await CategoryService.AddCategories(values);
        setLoading(false);
        if (ok) {
            navigate(authenticatedRoutesConstant.Categories);
        }
    }
    const onFinish = async (values) => {
        addCategoryCall(values)
    }
    return (
        <div className="add-category-container">
            <h2>Add Category</h2>

            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="cat_title"
                    rules={[
                        {
                            required: true,
                            message: "Please input your category title!",
                        },
                    ]}
                >
                    <Input placeholder="Category Title" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditCategory;

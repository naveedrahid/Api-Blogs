import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryService } from '../../services/categories.service';
import { authenticatedRoutesConstant } from '../../util/constant';
// import  from 'reac';

const AddEditCategory = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.id) {
            setIsEdit(params?.id);
            CategoryEditByID(params?.id);
        }
    }, [params?.id]);

    const addCategoryCall = async (values) => {
        setLoading(true);
        const { ok } = await CategoryService.AddCategories(values);
        setLoading(false);
        form.resetFields();
        if (ok) {
            navigate(authenticatedRoutesConstant.Home);
        }
    }
    const CategoryEditByID = async (car_ID) => {
        setLoading(true);
        const { ok , data} = await CategoryService.editCategories(car_ID);
        if (ok) {
            setCategory(data?.results);
            const title = data?.results?.cat_title;
            if (title) {
                form.setFieldsValue({cat_title: title,});
            }
        }
        setLoading(false);
    }
    const CategoryUpdate = async (values) => {
        setLoading(true);
        const { ok } = await CategoryService.updateCategories(params?.id , values);
        setLoading(false);
        form.resetFields();
        if (ok) {
           navigate(authenticatedRoutesConstant.Categories);
        }
    }
    const onFinish = async (values) => {
        if (params?.id) {
            CategoryUpdate(values);
        } else {
            addCategoryCall(values)
        }
    }
    return (
        <div className="add-category-container">
            <h2>{isEdit ? 'Edit' : 'Add'}  Category</h2>

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
                       {isEdit ? 'Update' : 'Create'}  Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditCategory;

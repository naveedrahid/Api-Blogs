import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, notification, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { postApiMethod } from '../../services/posts.service';
import { authenticatedRoutesConstant } from '../../util/constant';
import { CategoryService } from '../../services/categories.service';
import CustomUpload from '../../fileUpload/customUpload';

const AddEditPost = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const post_id = id;

    useEffect(() => {
        if (!post_id) {
            apiGetCategories();
        }
    }, []);

    useEffect(() => {
        if (post_id) {
            editPostByID(post_id);
        }
    }, [post_id]);

    const apiGetCategories = async () => {
        setLoading(true);
        const { ok, data } = await CategoryService.getCategories();
        if (ok) {
            setCategories(data?.results);
        }
        setLoading(false);
    }

    const addPostRequest = async (values) => {
        const { ok } = await postApiMethod.addPosts(values);
        if (ok) {
            notification.success('Add Post Successfully');
            navigate(authenticatedRoutesConstant.Posts);
        }
    }

    const editPostByID = async (post_id) => {
        setLoading(true);
        await apiGetCategories();
        const { ok, data } = await postApiMethod.ediPosts(post_id);
        if (ok) {
            const setSinglePostObj = data?.results;
            form.setFieldsValue({
                post_title: setSinglePostObj.post_title,
                post_tags: setSinglePostObj.post_tags,
                post_author: setSinglePostObj.post_author,
                post_status: setSinglePostObj.post_status,
                post_content: setSinglePostObj.post_content,
                post_category_id: setSinglePostObj.post_category_id,
                //image: results?.image ? image: '',
            });
            setSinglePost(setSinglePostObj);
        }
        setLoading(false);
    }
    
    const updatePostsByID = async (values) => {
        const { ok} = await postApiMethod.updatePosts(post_id, values);
        if (ok) {
            notification.success("Post Updated Successfully!");
            navigate(authenticatedRoutesConstant.Posts);
        }
    }

    const onFinish = async (values) => {
        setLoading(true);
        const payload = new FormData();
        console.log(payload);
        payload.append("post_title", values.post_title);
        payload.append("post_tags", values.post_tags);
        payload.append("post_category_id", values.post_category_id);
        payload.append("post_author", values.post_author);
        payload.append("post_date", values.post_date);
        payload.append("post_status", values.post_status);
        payload.append("post_content", values.post_content);
        if (file) {
          payload.append("post_image", file);
        }
        if (post_id) {
            await updatePostsByID(payload);
        } else {
            await addPostRequest(payload);
        }
        setLoading(false);
    }

    const customRequestCallback = async (info) => {
        setFile(info?.file);
    }

    return (
        <div className="add-category-container">
            <h2>{post_id? 'Edit' : 'Create'} User</h2>

            <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
                <Form.Item
                    name="post_title"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post title!",
                        },
                    ]}
                >
                    <Input placeholder="Post Title" />
                </Form.Item>
                <Form.Item
                    name="post_tags"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post Tags!",
                        },
                    ]}
                >
                    <Input placeholder="Post Tags" />
                </Form.Item>
                <Form.Item
                    name="post_category_id"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post Category!",
                        },
                    ]}
                >
                    <Select placeholder="Post Category">
                        {
                            categories.length > 0 &&
                            categories.map((singlCat) => {
                                return (
                                    <Select.Option
                                        value={singlCat?.cat_id}
                                        key={singlCat?.cat_id}
                                    >
                                        {singlCat?.cat_title}
                                    </Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="post_author"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post Author!",
                        },
                    ]}
                >
                    <Input placeholder="Post Author" />
                </Form.Item>
                <Form.Item
                    name="post_status"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post Status!",
                        },
                    ]}
                >
                    <Select placeholder="Post Status">
                        <Select.Option value="draft">Draft</Select.Option>
                        <Select.Option value="publish">Publish</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="post_date"
                    rules={[
                        {
                            required: true,
                            message: "Please select your post date!",
                        },
                    ]}
                >
                    <DatePicker
                        placeholder="Post Date"
                        className="custom-date-picker"
                        format="YYYY/MM/DD"
                    />
                </Form.Item>
                <Form.Item
                    name="post_content"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Post Content!",
                        },
                    ]}
                >
                    <TextArea row={4} placeholder="Post Content" />
                </Form.Item>
                <Form.Item>
                    <CustomUpload customRequestCallback={customRequestCallback} />
                    {singlePost?.image ? (
                        <img
                            src={singlePost?.image}
                            alt={singlePost?.post_title}
                            width={100}
                            style={{ marginTop: 20 }}
                        />
                    ) : (
                        <>{post_id && <p>No Image Found</p>}</>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {post_id ? 'Update' : 'Create'} User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditPost;

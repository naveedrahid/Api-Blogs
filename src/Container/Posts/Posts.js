import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import CustomButton from '../CustomButton/CustomButton';
import { postApiMethod } from '../../services/posts.service';
import { useNavigate } from 'react-router-dom';
import { authenticatedRoutesConstant } from '../../util/constant';


const Posts = () => {

    const [posts, setPosts] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addPostBtnHandler =(e)=>{
        e.preventDefault();
        navigate(authenticatedRoutesConstant.addPosts);
    }

    const getPostall = async () => {
        setLoading(true);
        const { ok, data } = await postApiMethod.getAllPosts();
        if (ok) {
            setPosts(data?.results);
        }
        setLoading(false);
    }

    useEffect(() => {
        function load() {
            getPostall();
        }
        load();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Post Title',
            dataIndex: 'post_title',
            key: 'post_title',
        },
        {
            title: 'Author',
            dataIndex: 'post_author',
            key: 'post_author',
        },
        {
            title: 'Date',
            dataIndex: 'post_date',
            key: 'post_date',
        },
        {
            title: 'Image',
            key: 'image',
            render: (text, record, index) => {
                if (!record?.image)
                    return 'No Image Found!';

                return (
                    <img src={record?.image} width="50" alt={record?.image} />
                );
            }
        },
        {
            title: 'Post Status',
            key: 'post_status',
            dataIndex: 'post_status',
        },
        {
            title: 'Post Tags',
            dataIndex: 'post_tags',
            key: 'post_tags',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: "Edit",
            key: "edit",
            render: (text, record, index) => {
                return <CustomButton type="ghost">Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                return (
                    <CustomButton type="danger">
                        Delete
                    </CustomButton>
                );
            },
        },
    ];


    return (
        <>
            <Row>
                <Col>
                    <CustomButton type="primary" onClick={addPostBtnHandler}>Add Post</CustomButton>
                </Col>
            </Row>
            <Table columns={columns} dataSource={posts} loading={loading} />
        </>
    );
}

export default Posts;
import React, { useEffect, useState } from 'react';
import { Col, Modal, notification, Row, Table } from 'antd';
import CustomButton from '../CustomButton/CustomButton';
import { postApiMethod } from '../../services/posts.service';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { authenticatedRoutesConstant } from '../../util/constant';
import { UtilService } from '../../util/util.service';
const { confirm } = Modal;


const Posts = () => {

    const [posts, setPosts] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addPostBtnHandler =(e)=>{
        e.preventDefault();
        navigate(authenticatedRoutesConstant.addPosts);
    }
    const ediPostBtnHandler =(record)=>{
        const id = record?.id;
        navigate(authenticatedRoutesConstant.editPosts.replace(':id', id));
    }

    const getPostall = async () => {
        setLoading(true);
        const { ok, data } = await postApiMethod.getAllPosts();
        if (ok) {
            setPosts(data?.results);
        }
        setLoading(false);
    }
    const deleteBtnHandler = async(record)=>{
        setLoading(true);
        const {ok} = await postApiMethod.deletePosts(record?.id);
        notification.success({
            message:"Post successfully Deleted",
            placement: "topRight",
        });
        await getPostall();
        setLoading(false);
    }

    const deletePostBtnHandler = async (record) =>{
        confirm({
            title:"Are You Sure Want to Delete This?",
            icon: <ExclamationCircleOutlined />,
            onOk(){
                deleteBtnHandler(record);
            },
            onCancel(){
                console.log('cancel');
            }
        });
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
            title: 'Post Category',
            dataIndex: 'post_category_id',
            key: 'post_category_id',
        },
        {
            title: 'Image',
            key: 'image',
            width: '10%',
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
            key: 'created_at',
            render: (text, record, index) => {
                return UtilService.convertDateToOurFormat(record?.created_at);
            },
        },
        {
            title: 'Updated At',
            key: 'updated_at',
            render: (text, record, index) => {
                return UtilService.convertDateToOurFormat(record?.updated_at);
            },
        },
        {
            title: "Edit",
            key: "edit",
            render: (text, record, index) => {
                return <CustomButton type="ghost" onClick={() => ediPostBtnHandler(record)}>Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                return (
                    <CustomButton type="danger" onClick={() => deletePostBtnHandler(record)}>
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
import React, { useEffect, useState } from 'react';
import { Badge, Col, message, Modal, Row } from 'antd';
import CustomButton from '../CustomButton/CustomButton';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import GridView from '../GridView/GridView';
import { commentApiMethod } from '../../services/comment.service';
const { confirm } = Modal;

const CustomComment = () => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        setLoading(true);
        const { ok, data } = await commentApiMethod.getAllComments();
        if (ok) {
            const dataRecieve = data?.results;
            setComments(dataRecieve);
        }
        setLoading(false);
    }
    const ApproveCommentHandler = async (record) => {
        setLoading(true);
        const { ok } = await commentApiMethod.approvedComments(record?.comment_id)
        if (ok) {
            message.success('comment approved successfully!');
            getComments();
        }
        setLoading(false);
    }

    const unApproveCommentHandler = async (record) => {
        setLoading(true);
        const { ok } = await commentApiMethod.unApprovedComments(record?.comment_id)
        if (ok) {
            message.success('comment Un Approved successfully!');
            getComments();
        }
        setLoading(false);
    }

    const deleteCommentHandler = (record) => {
        confirm({
            title: "Do you want to delete this post?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteComment(record);
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }
    const deleteComment = async (record) => {
        setLoading(true);
        const { ok } = await commentApiMethod.deleteCommentsById(record?.comment_id);
        if (ok) {
            message.success('comment is deleted successfully');
            getComments();
        }
        setLoading(false);
    }

    const columns = [
        {
            title: "Comment Id",
            dataIndex: "comment_id",
            key: "comment_id",
        },
        {
            title: "Comment Content",
            dataIndex: "comment_content",
            key: "comment_content",
        },
        {
            title: "Comment status",
            key: "comment_status",
            render: (comment) => {
                return (
                    <Badge
                        count={comment?.comment_status?.toUpperCase()}
                        showZero
                        color={comment?.comment_status === "unapproved" ? "red" : "green"}
                    />
                );
            },
        },
        {
            title: "User Name",
            key: "username",
            render: (comment) => {
                return `${comment?.user?.user_firstname} ${comment?.user?.user_lastname}`;
            },
        },
        {
            title: "Post Name",
            key: "postname",
            render: (comment) => {
                return `${comment?.post?.post_title}`
            },
        },
        {
            title: "Approve",
            key: "approve",
            render: (text, record, index) => {
                return (
                    <CustomButton type="success" onClick={() => ApproveCommentHandler(record)}>
                        Approve
                    </CustomButton>
                );
            },
        },
        {
            title: "Un Approve",
            key: "unapprove",
            render: (text, record, index) => {
                return (
                    <CustomButton type="primary" danger ghost onClick={() => unApproveCommentHandler(record)}>
                        Un Approve
                    </CustomButton>
                );
            },
        },

        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                return (
                    <CustomButton type="danger" onClick={() => deleteCommentHandler(record)}>Delete</CustomButton>
                );
            },
        },
    ];

    return (
        <div id="comment-container">
            <Row>
                <Col>
                    <h2>Comments</h2>
                </Col>
            </Row>
            <GridView dataSource={comments} columns={columns} loading={loading} />
        </div>
    );
}

export default CustomComment;

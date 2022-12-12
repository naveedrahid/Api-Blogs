import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import { UserService } from '../../services/users.service';
import AuthService from '../../util/auth.service';
import { useNavigate } from "react-router-dom";
import { UtilService } from '../../util/util.service';
import CustomButton from '../CustomButton/CustomButton';
import GridView from '../GridView/GridView';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { authenticatedRoutesConstant } from '../../util/constant';

const { confirm } = Modal;

function Users() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();

    const getUsers = async () => {
        setLoading(true);
        const { ok, data } = await UserService.getUsers();
        if (ok) {
            setUsers(data?.results);
        }
        setLoading(false);
    }

    useEffect(() => {
        function load() {
            getUsers();
        };
        load();
    }, []);

    const deleteUser = async (record) => {
        setLoading(true);
        const { ok } = await UserService.deleteUser(record?.user_id);
        if (ok) {
            getUsers();
        }
        setLoading(false);
    }
    const userDeleteHandler = (record) => {
        confirm({
            title: "Do You Want Delete This User!",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteUser(record);
            },
            onCancel() {
                console.log('cancel');
            },
        });
    }

    const addBtnHandler =(e)=>{
        e.preventDefault();
        navigate(authenticatedRoutesConstant.addUser);
    }
    const editBtnHandler = (e, user_id) =>{
        e.preventDefault();
        navigate(authenticatedRoutesConstant.editUser.replace(':id', user_id));
    }

    const columns = [
        {
            title: "User Id",
            dataIndex: "user_id",
            key: "user_id",
        },
        {
            title: "User Name",
            dataIndex: "username",
            key: "name",
        },
        {
            title: "First Name",
            dataIndex: "user_firstname",
            key: "user_firstname",
        },
        {
            title: "Last Name",
            dataIndex: "user_lastname",
            key: "user_lastname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "User Image",
            key: "user_image",
            render: (text, record, index) => {
                if (!record?.user_image)
                    return 'No Image Found!';

                return (
                    <img src={record?.user_image} width="80" alt={record?.username} />
                );
            }
        },
        {
            title: "User Role",
            dataIndex: "user_role",
            key: "user_role",
        },
        {
            title: "Created At",
            key: "created_at",
            render: (text, record, index) => {
                return UtilService.convertDateToOurFormat(record?.created_at);
            },
        },
        {
            title: "Edit",
            key: "edit",
            render: (text, record, index) => {
                return <CustomButton type="ghost" onClick={(e)=> editBtnHandler(e, record?.user_id)}>Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                const checkLoggedInUser = AuthService.getUserName === record.username ? true : false;
                return <CustomButton
                    disabled={checkLoggedInUser}
                    onClick={() => userDeleteHandler(record)}
                    type="danger"
                >Delete</CustomButton>;
            },
        },
    ];
    return (
        <div id="user-module-container">
            <Row>
                <Col>
                    <CustomButton type="primary" onClick={addBtnHandler}>Add User</CustomButton>
                </Col>
            </Row>
            <GridView dataSource={users} columns={columns} loading={loading} />
        </div>
    );

}
export default Users;
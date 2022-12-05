import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/users.service';
import { UtilService } from '../../util/util.service';
import CustomButton from '../CustomButton/CustomButton';
import GridView from '../GridView/GridView';

function Users() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(null);

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

    const columns = [
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
                return <CustomButton type="ghost">Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                return <CustomButton type="danger">Delete</CustomButton>;
            },
        },
    ]; 
    return (
        <div id="user-module-container">
            <Row>
                <Col>
                    <CustomButton type="primary">Add User</CustomButton>
                </Col>
            </Row>
            <GridView dataSource={users} columns={columns} loading={loading} />
        </div>
    );

}
export default Users;
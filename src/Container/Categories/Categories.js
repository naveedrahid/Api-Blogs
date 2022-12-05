import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import {UserService} from '../../services/users.service'; 
import { UtilService } from '../../util/util.service';
import CustomButton from '../CustomButton/CustomButton';
import GridView from '../GridView/GridView';

const Categories = () => {

    const [loading, setLoading] = useState(false);
    const [Categories, setCategories] = useState(null);

    const getCategories = async () =>{
        setLoading(true);
        const {ok, data} = await UserService.getCategories()
        if(ok){
            setCategories(data?.results);
        }
        setLoading(false);
    }

    useEffect(() => {
        function load(){
            getCategories();
        }
        load();
    }, []);

    const columns = [
        {
            title: "Category Name",
            dataIndex: "cat_title",
            key: "cat_title",
        },
        {
            title: "Created At",
            key: "created_at",
            render:(text,record,index) => {
                return UtilService.convertDateToOurFormat(record?.created_at);
            },
        },
        {
            title: "Edit",
            key: "edit",
            render:(text,record,index) => {
                return <CustomButton type="ghost">Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render:(text, record, index) =>{
                return <CustomButton type="danger">Delete</CustomButton>
            },
        },
    ];
    return (
        <div id="user-module-container">
            <Row>
                <Col>
                    <CustomButton type="primary">Add Category</CustomButton>
                </Col>
            </Row>
            <GridView dataSource={Categories} columns={columns} loading={loading}/>
        </div>
    );
}

export default Categories;

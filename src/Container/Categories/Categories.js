import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { CategoryService } from '../../services/categories.service';
import { authenticatedRoutesConstant } from '../../util/constant';
import { UtilService } from '../../util/util.service';
import CustomButton from '../CustomButton/CustomButton';
import GridView from '../GridView/GridView';
import {useNavigate} from 'react-router-dom';

const Categories = () => {

    const navigate = useNavigate(false)
    const [loading, setLoading] = useState(false);
    const [Categories, setCategories] = useState(null);

    const apiGetCategories = async () => {
        setLoading(true);
        const { ok, data } = await CategoryService.getCategories();
        if (ok) {
            setCategories(data?.results);
        }
        setLoading(false);
    }

    const addCategoryBtnHandler = () =>{
        navigate(authenticatedRoutesConstant.AddCategory);
    }

    useEffect(() => {
        function load() {
            apiGetCategories();
        }
        load();
    }, []);

    const columns = [
        {
            title: "id",
            dataIndex: "cat_id",
            key: "cat_id",
        },
        {
            title: "Category Name",
            dataIndex: "cat_title",
            key: "cat_title",
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
                return <CustomButton type="danger">Delete</CustomButton>
            },
        },
    ];
    return (
        <div id="user-module-container">
            <Row>
                <Col>
                    <CustomButton type="primary" onClick={addCategoryBtnHandler}>Add Category</CustomButton>
                </Col>
            </Row>
            <GridView dataSource={Categories} columns={columns} loading={loading} />
        </div>
    );
}

export default Categories;

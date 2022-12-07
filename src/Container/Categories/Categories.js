import { Col, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CategoryService } from '../../services/categories.service';
import { authenticatedRoutesConstant } from '../../util/constant';
import { UtilService } from '../../util/util.service';
import CustomButton from '../CustomButton/CustomButton';
import GridView from '../GridView/GridView';
import {useNavigate} from 'react-router-dom';
const { confirm } = Modal;

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
    const editCategoryHandler = (record) =>{
        const id = record?.cat_id;
        navigate(authenticatedRoutesConstant.EditCategory.replace(":id", id));
    }

    useEffect(() => {
        function load() {
            apiGetCategories();
        }
        load();
    }, []);

    const categoryDeleteRequest = async(record) =>{
        setLoading(true);
        const {ok} = await CategoryService.deleteCategory(record?.cat_id);
        if(ok){
            notification.success({
                message:"Category successfully Deleted",
                placement: "topRight",
            });
            apiGetCategories();
        }
        setLoading(false);
    }
    const categoryDeleteHandler = async (record) =>{
        confirm({
            title:"Are You Sure Want to Delete This?",
            icon: <ExclamationCircleOutlined />,
            onOk(){
                categoryDeleteRequest(record);
            },
            onCancel(){
                console.log('cancel');
            },
        })
    }

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
                return <CustomButton type="ghost" onClick={() => editCategoryHandler(record)}>Edit</CustomButton>;
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record, index) => {
                return <CustomButton type="danger" onClick={() => categoryDeleteHandler(record)}>Delete</CustomButton>
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

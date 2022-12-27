import { Upload } from 'antd';
import React, { useState } from 'react';
import './customUpload.less';

const CustomUpload = (props) => {
    const { customRequestCallback } = props;
    const [fileName, setFileName] = useState(null);
    const { Dragger } = Upload;

    const customRequest = async (info) => {
        customRequestCallback(info);
        const basesixtyFourFile = await toBase64(info.file);
        setFileName({
            name: info?.file?.name,
            url: basesixtyFourFile
        });
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    const uploadProps = {
        name: "customFile",
        multiple: false,
        isImageUrl: true,
        maxCount: 1,
        showUploadList: false,
        // accept: "application/pdf",
        accept: "*",
        customRequest: customRequest,
        onDrop: customRequest,
        ...props
    };

    return (
        <div>
            <span className="kl-custom-upload-container">
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon"></p>
                    <p className="ant-upload-text">
                        {fileName?.name ? fileName?.name : "Drag & Drop to Upload File"}
                    </p>
                    {fileName?.url && (
                        <img
                        src={fileName?.url}
                        alt={fileName?.name}
                        width={100}
                        style={{ marginTop: 20 }}
                      />
                    )}
                    {props.children}
                </Dragger>
            </span>
        </div>
    );
}

export default CustomUpload;

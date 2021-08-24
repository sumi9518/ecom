import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';


const RatingModal = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <div>
            <div onClick={() => setModalVisible(true)}>
                <StarOutlined className="text-warning" />
                <br />
                {" "}
                {user ? "Leave rating" : "Login to leaving rating"}
            </div>
            <Modal
                title="Leave your Rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                    toast.success("Thanks for your rating, it will appear soon!");
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </div >
    )

};

export default RatingModal;
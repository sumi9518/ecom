import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

//can't use history as this is not main comp (not called in app.js) but child of SingleProduct so using hook to get history

const RatingModal = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);

        } else {
            history.push("/login");
        }
    }


    return (
        <div>
            <div onClick={handleModal}>
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
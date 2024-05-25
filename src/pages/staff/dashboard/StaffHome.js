// import React from 'react';
// import { Card, Button } from 'antd';
// import { useDispatch ,useSelector} from 'react-redux';
// import { logoutUser , updateUserProfile } from '../../../redux/thunk/UserThunk';
//
// const StaffHome = () => {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.user);
//
//     return (
//         <div>
//             <h1>Staff Home</h1>
//             <Card title="User Information">
//                 <p><strong>Name:</strong> {user.firstName}</p>
//                 <p><strong>Email:</strong> {user.emailId}</p>
//                 <p><strong>Role:</strong> {user.role}</p>
//                 <p><strong>Visiblity:</strong> {user.visiblity}</p>
//                 <p><strong>Image:</strong> {user.image}</p>
//
//             </Card>
//             <Button onClick={async () => await dispatch(logoutUser())}>Logout</Button>
//         </div>
//     );
// };
//
// export default StaffHome;

//
// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form, Input, Select } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser, updateUserProfile } from '../../../redux/thunk/UserThunk';
// import {uploadAsset} from "../../../redux/thunk/UserThunk";
//
// const { Option } = Select;
//
// const StaffHome = () => {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.user);
//     const [form] = Form.useForm();
//     const [isEditing, setIsEditing] = useState(false);
//
//     useEffect(() => {
//         if (user) {
//             form.setFieldsValue({
//                 firstName: user.firstName,
//                 emailId: user.emailId,
//                 role: user.role,
//                 visiblity: user.visiblity,
//                 image: user.image,
//             });
//         }
//     }, [user, form]);
//
//     const handleFinish = async (values) => {
//         try {
//             await dispatch(updateUserProfile(values));
//             setIsEditing(false);
//         } catch (error) {
//             console.error('Failed to update profile:', error);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Staff Home</h1>
//             <Card title="User Information">
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     initialValues={{
//                         firstName: user.firstName,
//                         emailId: user.emailId,
//                         role: user.role,
//                         visiblity: user.visiblity,
//                         image: user.image,
//                     }}
//                     onFinish={handleFinish}
//                 >
//                     <Form.Item name="firstName" label="Name">
//                         <Input disabled={!isEditing} />
//                     </Form.Item>
//                     <Form.Item name="emailId" label="Email">
//                         <Input disabled={!isEditing} />
//                     </Form.Item>
//                     <Form.Item name="role" label="Role">
//                         <Input disabled={!isEditing} />
//                     </Form.Item>
//                     <Form.Item name="visiblity" label="Visibility">
//                         <Select disabled={!isEditing}>
//                             <Option value="public">Public</Option>
//                             <Option value="private">Private</Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item name="image" label="Image URL">
//                         <Input disabled={!isEditing} />
//                     </Form.Item>
//                     {isEditing && (
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit">
//                                 Save
//                             </Button>
//                             <Button
//                                 style={{ marginLeft: '10px' }}
//                                 onClick={() => setIsEditing(false)}
//                             >
//                                 Cancel
//                             </Button>
//                         </Form.Item>
//                     )}
//                 </Form>
//                 {!isEditing && (
//                     <Button onClick={() => setIsEditing(true)}>Edit</Button>
//                 )}
//             </Card>
//             <Button onClick={async () => await dispatch(logoutUser())}>
//                 Logout
//             </Button>
//         </div>
//     );
// };
//
// export default StaffHome;


import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Select, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {accessTokenLoginUser, logoutUser, updateUserProfile, uploadAsset} from '../../../redux/thunk/UserThunk';
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;

const StaffHome = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                await dispatch(accessTokenLoginUser());
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        if(!user)
        fetchUser();
    }, [dispatch,user]);
    console.log('User:', user);
console.log(user)

    useEffect( () => {

        if (user) {
            form.setFieldsValue({
                name: user.firstName,
                email: user.emailId,
                role: user.role,
                visiblity: user.visiblity,
                image: user.image,
                password: user.password,

            });
        }
    }, [user, form ,dispatch]);

    const handleFinish = async (values) => {
        try {
            let imageUrl = user.image;
            console.log('File list2:', fileList);
            if (fileList.length > 0) {
                const formData = new FormData();
                formData.append('file', fileList[0].originFileObj);
                console.log('Form data:', formData);
                const response = await dispatch(uploadAsset(formData));
                console.log('Upload response:', response);
                imageUrl = response.payload.url;
            }
            const updatedValues = { ...values, image: imageUrl };
            await dispatch(updateUserProfile(updatedValues));
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleUploadChange = ({ fileList }) => {
        console.log('File list:', fileList);
        setFileList(fileList);
    };

    return (
        <div>
            <h1>Profile Details</h1>

            <Card title="User Information">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: user.firstName,
                        email: user.emailId,
                        role: user.role,
                        visiblity: user.visiblity,
                        image: user.image,
                        password: user.password,
                    }}
                    onFinish={handleFinish}
                >
                    <Form.Item name="name" label="Name">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item name="role" label="Role">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item name="visiblity" label="Visibility">
                        <Select disabled={!isEditing}>
                            <Option value="public">Public</Option>
                            <Option value="private">Private</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    {/*<Form.Item name="image" label="Image URL">*/}
                    {/*    <Input disabled={!isEditing} />*/}
                    {/*</Form.Item>*/}
                    <Form.Item label="Upload Image">
                        <Upload
                            listType="picture"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={() => false}  // Prevent automatic upload
                            onChange={handleUploadChange}
                        >
                            <Button icon={<UploadOutlined />} disabled={!isEditing}>Select File</Button>
                        </Upload>
                    </Form.Item>
                    {isEditing && (
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button
                                style={{ marginLeft: '10px' }}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    )}
                </Form>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                )}
            </Card>
            <Button onClick={async () => await dispatch(logoutUser())}>
                Logout
            </Button>
        </div>
    );
};

export default StaffHome;

import { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import userActions from "../../../redux/actions/UserAction";
import {useSelector} from "react-redux";

const StaffList = () => {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {user} = useSelector(state => state.user);


    useEffect(() => {
        // Fetch user details
        if(user === null) return;
        if(user.role === 'user'){
            const fetchUsers = async (page, limit) => {
                const response = await userActions.getPublicUserList({page, limit})

                console.log(response.data);
                setUsers(response.data?.data?.users);
                setTotal(response.data?.data?.total);
            };
            fetchUsers(currentPage, pageSize);
        }else{
            const fetchAdminUsers = async (page, limit) => {
                const response = await userActions.getAdminUserList({page, limit})

                console.log(response.data);
                setUsers(response.data?.data?.users);
                setTotal(response.data?.data?.total);
            }
            fetchAdminUsers(currentPage, pageSize);
        }

    }, [currentPage, pageSize]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Email',
            dataIndex: 'emailId',
            key: 'emailId',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Visibility',
            dataIndex: 'visiblity',
            key: 'visiblity',
        },
    ];

    return (
        <div>
            <h1>Recommended  Profiles</h1>
            <Table
                columns={columns}
                dataSource={users}
                pagination={false}
                rowKey="_id"
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={[5, 10, 20, 50]}
            />

            <pre>Showing {users.length} of {total} users.
            </pre>
        </div>
    );
};

export default StaffList;

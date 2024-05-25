import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {accessTokenLoginUser} from "../../../redux/thunk/UserThunk";
import {Layout} from "antd";
import StaffNav from "../../nav/StaffNav";
import {useNavigate} from "react-router-dom";
const {Content} = Layout;

const StaffPrivateRoute = ({component: Component, ...rest}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    console.log(user)
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(accessTokenLoginUser());
        };

        fetchData();

        return () => {
            // Cleanup logic (if needed)
        };
    }, [dispatch]);

    useEffect(() => {
        // Logout if user is null
        if (user === null) {
            navigate("/login");
        }

        return () => {
            // Cleanup logic (if needed)
        };
    }, [user, navigate]);

    return (
        <Layout>
            <StaffNav/>
            <Content
                style={{
                    margin: '16px 16px',
                    overflow: 'auto',
                    height: '100vh',
                    marginTop: 54,
                }}
            >
                {user ? <Component/> : <h1>Not Authorized</h1>}
            </Content>

        </Layout>
    );
};

export default StaffPrivateRoute;
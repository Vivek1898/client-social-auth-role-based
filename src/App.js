//Modules
import {Routes, Route, Navigate} from "react-router-dom"
import React from "react";
// Pages
import Home from "./pages/home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import StaffHome from "./pages/staff/dashboard/StaffHome";
import StaffList from "./pages/staff/dashboard/StaffList";
import StaffPrivateRoute from "./components/layout/staff/StaffPrivateRoute";
import Error404 from "./pages/ErrorPages/Error404";
//Components
import TopNav from "./components/header/TopNav";
// Styles
import './App.css';

function App() {
    return (
        <div>
            <TopNav/>
            <Routes>

                <Route path="/" exact  element={<Navigate to={"/home"}/>}/>
                <Route path="/home" exact element={<Home/>}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/dashboard" exact element={<StaffPrivateRoute component={StaffHome} />} />
                <Route path="/staff/home" exact element={<StaffPrivateRoute component={StaffHome} />} />
                <Route path="/staff/list" exact element={<StaffPrivateRoute component={StaffList} />} />
                <Route path="/404" exact element={<Error404/>}/>
                <Route path="*" element={<Navigate to={"/404"}/>}/>
            </Routes>
        </div>

    );
}

export default App;

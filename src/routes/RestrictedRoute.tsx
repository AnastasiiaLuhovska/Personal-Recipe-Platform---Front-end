import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../redux/auth/selectors.ts";
import {Navigate} from "react-router";
import React from "react";

const RestrictedRoute = ({children}: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) return <Navigate to="/" replace />;
    return <>{children}</>;};

export default RestrictedRoute;
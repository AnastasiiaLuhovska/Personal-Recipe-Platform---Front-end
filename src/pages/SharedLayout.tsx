import Header from "../components/Header/Header.tsx";
import {Outlet} from "react-router/internal/react-server-client";
import {Suspense} from "react";
import Loader from "../components/Loader/Loader.tsx";

const SharedLayout = () => {
    return (
        <>
            <Header/>
            <Suspense fallback={<Loader/>}>
                <Outlet />
            </Suspense>
        </>
    );
};

export default SharedLayout;
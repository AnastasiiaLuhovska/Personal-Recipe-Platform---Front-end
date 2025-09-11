import './App.css'
import {Route, Routes} from "react-router";
import SharedLayout from "./pages/SharedLayout.tsx";
import {lazy, useEffect} from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RestrictedRoute from "./routes/RestrictedRoute.tsx";
import PrivateRoute from './routes/PrivateRoute.tsx';
import {useDispatch, useSelector} from "react-redux";
import {refreshThunk} from "./redux/auth/operations.ts";
import type {AppDispatch} from "./redux/store.ts";
import {selectIsLoggedIn, selectIsRefreshing} from "./redux/auth/selectors.ts";
import {Toaster} from 'react-hot-toast';
import DescriptionPage from "./pages/DescriptionPage/DescriptionPage.tsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.tsx"));
// const DescriptionPage = lazy(
//     () => import("./pages/DescriptionPage/DescriptionPage.tsx"),
// );
const NotFoundPage = lazy(
    () => import("./pages/NotFoundPage/NotFoundPage.tsx"),
);

function App() {

    const isRefreshing = useSelector(selectIsRefreshing);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(refreshThunk());
        }
    }, [dispatch, isLoggedIn]);

    if (isRefreshing) return null;

    return <>
        <Toaster position="top-right"/>
        <Routes>
            <Route element={<SharedLayout/>}>
                <Route path='/login' element={<RestrictedRoute><LoginPage/></RestrictedRoute>}/>
                <Route path='/register' element={<RestrictedRoute><RegisterPage/></RestrictedRoute>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/catalog' element={<PrivateRoute><CatalogPage/></PrivateRoute>}/>
                <Route path='/catalog/:recipeId' element={<PrivateRoute><DescriptionPage/></PrivateRoute>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </>

}

export default App

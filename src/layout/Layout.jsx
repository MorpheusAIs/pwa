import React from 'react'
import { Route, Routes } from "react-router-dom"
import routeItems from './Routes.jsx'
import Header from '../components/Header.jsx'

const Layout = () => {
    return (
        <>
            <Header />
            <Routes>
                {routeItems.map((route) => (
                    <Route key={route.id} path={route.path} element={route.element} />
                ))}
            </Routes>
        </>

    )
}

export default Layout
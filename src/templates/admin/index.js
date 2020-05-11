import React from 'react';
import MainLayout from '../../layouts/Main';

import Minimal from '../../layouts/Minimal';
import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

const AdminTemp = (props) => {
    const LoginPage = Loadable({
        loader: () => import("../../pages/admin/Login"),
        loading: MyLoadingComponent
    });

    const comp = (privateComponent, path) => {
        if (localStorage.getItem("session") && ((new Date(JSON.parse(localStorage.getItem("session")).token.expires) - new Date()) >= 0)) {
            return privateComponent
        }
        localStorage.removeItem("session")
        return LoginPage
    }
    const lay = (layout) => {

        if ((localStorage.getItem("session") && ((new Date(JSON.parse(localStorage.getItem("session")).token.expires) - new Date()) >= 0))) {
            return layout
        }
        return 'Minimal'
    }

    let Component = comp(props.component, props.path);
    let route = props.route;
    let layout = lay(props.layout);
    console.log(layout);
    
    return (
        
        <div> 
            {layout === 'Minimal' ? (
            <Minimal>
                <Component route={route} />
            </Minimal>
        ) : (
            <MainLayout>
                <Component route={route} />
            </MainLayout>
        )}
        </div>
        )
}
export default AdminTemp;
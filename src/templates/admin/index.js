import React, { Component } from 'react';
import MainLayout from '../../layouts/Main';

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        
        return (
            <div>
                <MainLayout>
                    <Component route={route} />
                </MainLayout>
            </div>
        );
    }
}

export default index;
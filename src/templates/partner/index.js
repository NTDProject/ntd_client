import React, { Component } from 'react';
import PartnerLayout from '../../layouts/Partner';

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        let layout = this.props.layout;
        console.log(layout);
        
        return (
            <div>
                <PartnerLayout>
                    <Component route={route} />
                </PartnerLayout>
            </div>
        );
    }
}

export default index;
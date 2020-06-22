import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, getDataCP , deleteData} from './actions';
import { TextField, Button, Input, InputLabel, Grid, MenuItem, Select } from "@material-ui/core/";
import { Delete, Create, Details } from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      YeuCauList: [],
    }
  }
  componentDidMount() {
    this.props.getData(this.after);
  }


  after = (resp) => {
    console.log(resp)
    this.setState({
      YeuCauList: resp,
    })

  }



  delete = (value) => {
    this.props.deleteData({GiaiDoan: value._original.yeucau_id, Ten_GiaiDoan:value._original.nd_yeucau, Note:value._original.mo_ta}, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.after);
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
  }


  themChienDich = () => {
      let path = `/yeucauadd`;
      this.props.history.push({ pathname: path, state: {GiaiDoan: "addPage", Ten_GiaiDoan:"", Note:""}});
  }

 
  editChienDich = (value) => {
    let path = `/yeucauadd`;
    this.props.history.push({ pathname: path, state: {GiaiDoan: value._original.yeucau_id, Ten_GiaiDoan:value._original.nd_yeucau, Note:value._original.mo_ta} });
  }

  render() {
    return (
      <div >
        <ToastContainer/>
        <NotificationContainer />
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Quản lý yêu cầu
        </div>

        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          <Button variant="contained" color="secondary" onClick={this.themChienDich}>Thêm yêu cầu mới</Button>{' '}
        </div>


        
        <ReactTable
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.YeuCauList}
          pageSizeDefault={10}
          columns={[
            {
              Header: "Nội dung yêu cầu",
              accessor: "nd_yeucau",
              filterable: true,
            },
            {
              Header: "Ghi chú",
              accessor: "mo_ta",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "yeucau_id",
              Cell: (props) =>
                <div style={{ textAlign: "center" }}>
                  <Delete onClick={() => this.delete(props.row)} />{' '}
                  <Create onClick={() => this.editChienDich(props.row)} />{' '}
                </div>
            }

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>

    );

  }
}


const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (after) => { dispatch(getData(after)) },
    deleteData: (value,after) => { dispatch(deleteData(value,after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
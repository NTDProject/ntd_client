import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, deleteData } from './actions';
import { TextField, Button, InputLabel, Grid, Input, MenuItem, Select } from "@material-ui/core/";
import { Delete, Create, Details } from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GroupList: []
    }
  }
  componentDidMount() {
    this.props.getData(this.after)
    if(this.props.route.location.state != null){
      NotificationManager.success('Success', this.props.route.location.state.resp.message, 3000);
    }
  }

  after = (resp) => {
    console.log(resp)
    this.setState({
      GroupList: resp,
    })

  }

  delete =   (value) => {
    this.props.deleteData(value._original, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.after)
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
    this.props.getData(this.after)
  }


  addGroup = () => {

    let path = `/Group/CreateOrEdit`;
    this.props.history.push({ pathname: path, state: { group_id: "addPage", group_name: ""} });
    
  }

  editGroup = (value) => {
    let path = `/Group/CreateOrEdit`;
    this.props.history.push({ pathname: path, state: value._original });
  }

  render() {
    return (
      <div >
        <NotificationContainer />
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Nhóm quyền
        </div>
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          <Button variant="contained" color="secondary" onClick={this.addGroup}>Thêm mới</Button>{' '}
        </div>

        <ReactTable
          ref={(r) => {this.selectTable = r;}}
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.GroupList}
          pageSizeDefault={10}
          onFilteredChange={this.handleFilterChange}
          defaultFilterMethod={
            (filter, row) =>
            filter.id in row ? row[filter.id].includes(filter.value) : true

          }
          columns={[
            {
              Header: "ID",
              accessor: "group_id",
              filterable: true,
            },
            {
              Header: "Tên nhóm",
              accessor: "group_name",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "group_id",
              Cell: (props) =>
                <div style={{ textAlign: "center" }}>
                  <Delete onClick={() => this.delete(props.row)} />{' '}
                  <Create onClick={() => this.editGroup(props.row)} />{' '}
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: ( after) => { dispatch(getData(after)) },
    deleteData: (value, after) => { dispatch(deleteData(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
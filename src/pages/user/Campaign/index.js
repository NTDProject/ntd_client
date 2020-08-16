import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, toThemChienDich, deleteData } from './actions';
import {TextField, Button, Input, InputLabel, Grid} from "@material-ui/core/";
import {Delete, Create, Details} from '@material-ui/icons/';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';



class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CampaignList: [],
      page: 1,
      limit: 15,
      orderBy: [{ column: "ItemID", value: "desc" }],
      ItemNameFillter: "",
      descriptionFillter: "",
      pageCount:0
    }
  }
  componentDidMount() {
    this.props.getData(this.getParam(), this.after);
    if(this.props.route.location.state != null){
      NotificationManager.success('Success', this.props.route.location.state.resp.message, 3000);
    }
  }

  getParam = () => {
    const { page, limit, orderBy, ItemNameFillter, descriptionFillter } = this.state
    return {
      orderBy: orderBy,
      limit: limit,
      offset: (page - 1) * limit,
      like: [
        { column: "ItemName", value: ItemNameFillter },
        { column: "description", value: descriptionFillter }
      ]
    }
  }

  after = (resp) => {
    this.setState({
      CampaignList: resp,
    })

  }

  delete = (value) => {
    this.props.deleteData(value, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.getParam(), this.after);
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
  }


  onChangeFillter = async (e) => {
    let value = e.target.value
    let name = e.target.name
    await this.setState({
      [name]: value
    })
    this.props.getData(this.getParam(), this.after);
  }
  themChienDich = () => {
    let path = `/campaign/addOrEdit`;
    this.props.history.push({pathname:path,state:{id:null}});
  }
  editChienDich = (value) => {
    let path = `/campaign/addOrEdit`;
    this.props.history.push({pathname:path,state:{id:value._original.chiendich_id}});
  }



  render() {
    return (
      <div >
        <NotificationContainer />
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Chiến dịch tuyển dụng
        </div>
        
        <Button variant="contained" color="secondary" onClick = {this.themChienDich}>Thêm Chiến dịch</Button>
        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={true}
          sortable={false}
          data={this.state.CampaignList}
          pageSizeDefault={this.state.limit}
          columns={[
            {
              Header: "Tên",
              accessor: "ten_chiendich",
              filterable: true,
            },
            {
              Header: "Ngày bắt đầu",
              accessor: "ngay_batdau",
              filterable: true,
            },
            {
              Header: "Ngày kết thúc",
              accessor: "ngay_ketthuc",
              filterable: true,
            },
            {
              Header: "Trạng thái",
              accessor: "trangthai",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "chiendich_id",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <Delete onClick = {() => this.delete(props.row)}/>{' '}
                <Create onClick = {() => this.editChienDich(props.row)}/>{' '}
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
  // const { PartnerManager } = state

  // return {
  //   PartnerList: PartnerManager.PartnerList
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toPage: (value) => {dispatch(toThemChienDich(value))},
    getData: (value, after) => { dispatch(getData(value, after)) },
    deleteData: (value, after) => { dispatch(deleteData(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
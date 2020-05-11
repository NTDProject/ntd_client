import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, getDataCP, deleteData } from './actions';
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
      CostList: [],
      chienDichId: "",
      ListCampaign:[],
      ten_chiendich: ""
    }
  }
  componentDidMount() {
    this.props.getDataCP( this.afterCP);
    
      
  }


  after = (resp) => {
    console.log("a",resp)
    this.setState({
      CostList: resp,
    })

  }

  afterCP = (resp) => {
    console.log("aCP",resp)
    this.setState({
      ListCampaign: resp,
    })
    if(this.props.route.location.state != null){
      let chienDichId = this.props.route.location.state.chienDichId
      let ten_chiendich = resp.filter(Campaign => Campaign.chiendich_id == chienDichId)
      this.props.getData(chienDichId, this.after);
      this.setState({
        chienDichId: chienDichId,
        ten_chiendich: ten_chiendich[0].ten_chiendich
      })
    }
  }

  delete = (value) => {
    console.log(value)
    this.props.deleteData(value._original, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.state.chienDichId, this.after);
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
  }


  themChienDich = () => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    if(chienDichId == "" || chienDichId == undefined || chienDichId== null){
      toast("Vui lòng chọn chiến dịch")
    }
    else{
      let path = `/CostAdd`;
      this.props.history.push({ pathname: path, state: { chiendich_id: chienDichId, id: "addPage", noidung:"", create: new Date(), note: "", sotien: "", ten_chiendich: ten_chiendich} });
    }
  }

 
  editChienDich = (value) => {
    let path = `/costadd`;
    this.props.history.push({ pathname: path, state: {id: value._original.id, chiendich_id: this.state.chienDichId, id: value._original.id, ten_chiendich: value._original.ten_chiendich , note: value._original.note, sotien: value._original.sotien, create: new Date(value._original.create), noidung: value._original.noidung} });
  }

  handleChangeInputText = e => {
    let ListCampaign = [...(this.state.ListCampaign)]
    let value = e.target.value
    let ten_chiendich = ListCampaign.filter(Campaign => Campaign.chiendich_id == value)
    this.setState({
      chienDichId : value,
      ten_chiendich:   ten_chiendich[0].ten_chiendich
    });

    this.props.getData(e.target.value, this.after);
  };

  render() {
    const ListCampaign = this.state.ListCampaign.map(c => {
      return(
      <MenuItem value={c.chiendich_id} key = {c.chiendich_id}>{c.ten_chiendich} </MenuItem>
      )
    })
    return (
      <div >
        <NotificationContainer />
        <ToastContainer/>
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Quản lý chi phí tuyển dụng
        </div>

        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          <Select
            style = {{width: "500px"}}
            value={this.state.chienDichId}
            input={<Input />}
            onChange={this.handleChangeInputText}
          >
            {
                  ListCampaign
            }
          </Select>{' '}
          <Button variant="contained" color="secondary" onClick={this.themChienDich}>Thêm chi phí mới</Button>{' '}

        </div>


        
        <ReactTable
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.CostList}
          pageSizeDefault={10}
          columns={[
            {
              Header: "Nội dung chi phí",
              accessor: "noidung",
              filterable: true,
            },
            {
              Header: "Số tiền",
              accessor: "sotien",
              filterable: true,
            },
            {
              Header: "ngày phát sinh",
              accessor: "createdate",
              filterable: true,
            },
            {
              Header: "Ghi chú",
              accessor: "note",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "ungvien_id",
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
  // const { PartnerManager } = state

  // return {
  //   PartnerList: PartnerManager.PartnerList
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (value, after) => { dispatch(getData(value, after)) },
    getDataCP: (afterCP) => { dispatch(getDataCP( afterCP)) },
    deleteData: (value, after) => { dispatch(deleteData(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, getDataCP } from './actions';
import { TextField, Button, Input, InputLabel, Grid, MenuItem, Select } from "@material-ui/core/";
import { Delete, Create, Details } from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UngVienList: [],
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
      UngVienList: resp,
    })

  }

  afterCP = (resp) => {
    console.log("aCP",resp)
    this.setState({
      ListCampaign: resp,
    })

  }

  delete = (value) => {
    console.log(value)
  }


  themChienDich = () => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    if(chienDichId == "" || chienDichId == undefined || chienDichId== null){
      toast("Vui lòng chọn chiến dịch")
    }
    else{
      let path = `/UngVien/addOrEdit`;
      this.props.history.push({ pathname: path, state: { chiendich_id: chienDichId, ungvien_id: "addPage", ten_chiendich: ten_chiendich} });
    }
  }

  themUngVienCoSan = () => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    let path = `/UngVien/add`;
      this.props.history.push({ pathname: path, state: {chiendich_id: chienDichId, ten_chiendich: ten_chiendich}})
  }
  editChienDich = (value) => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    let path = `/UngVien/addOrEdit`;
    this.props.history.push({ pathname: path, state: { chiendich_id: chienDichId, ungvien_id: value._original.ungvien_id, ten_chiendich: ten_chiendich } });
  }

  handleChangeInputText = e => {

    let ListCampaign = [...(this.state.ListCampaign)]
    console.log("start",e)
    let value = e.target.value
    let ten_chiendich = ListCampaign.filter(Campaign => Campaign.chiendich_id == value)
    this.setState({
      chienDichId : value,
      ten_chiendich:   ten_chiendich[0].ten_chiendich
    });

    this.props.getData(e.target.value, this.after);
    console.log("finish",this.state.ListCampaign)
  };

  render() {
    const ListCampaign = this.state.ListCampaign.map(c => {
      return(
      <MenuItem value={c.chiendich_id} key = {c.chiendich_id}>{c.ten_chiendich} </MenuItem>
      )
    })
    return (
      <div >
        <ToastContainer/>
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Ứng viên
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
          <Button variant="contained" color="secondary" onClick={this.themChienDich}>Thêm ưng viên mới</Button>{' '}
          <Button variant="contained" color="secondary" onClick={this.themUngVienCoSan}>Thêm ứng viên có sẵn</Button>

        </div>


        
        <ReactTable
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.UngVienList}
          pageSizeDefault={10}
          columns={[
            {
              Header: "Tên ứng viên",
              accessor: "tenungvien",
              filterable: true,
            },
            {
              Header: "Email",
              accessor: "email",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "ungvien_id",
              Cell: (props) =>
                <div style={{ textAlign: "center" }}>
                  <Delete onClick={() => this.delete(props.row)} />{' '}
                  <Create onClick={() => this.editChienDich(props.row)} />{' '}
                  <Details />
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
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
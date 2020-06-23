import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, getDataCP, deleteData } from './actions';
import { TextField, Button, InputLabel, Grid, Input, MenuItem, Select } from "@material-ui/core/";
import { Delete, Create, Details } from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      UngVienList: [],
      chienDichId: "",
      ListCampaign:[],
      ten_chiendich: "",
      listDownload: []
    }
  }
  componentDidMount() {
    this.props.getData(this.after)
    this.props.getDataCP( this.afterCP);
    if(this.props.route.location.state != null){
      NotificationManager.success('Success', this.props.route.location.state.resp.message, 3000);
    }
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

  delete =   (value) => {
    console.log("aa", value._original)
    this.props.deleteData(value._original, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.state.chienDichId, this.after);
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
    this.props.getData(this.after)
  }


  themChienDich = () => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    if(chienDichId == "" || chienDichId == undefined || chienDichId== null){
      NotificationManager.error('Error', "Vui lòng chọn chiến dịch", 3000);
    }
    else{
      let path = `/UngVien/Create`;
      this.props.history.push({ pathname: path, state: { chiendich_id: chienDichId, ungvien_id: "addPage", ten_chiendich: ten_chiendich} });
    }
  }

  themUngVienCoSan = () => {
    let chienDichId = this.state.chienDichId
    let ten_chiendich = this.state.ten_chiendich
    if(chienDichId == "" || chienDichId == undefined || chienDichId== null){
      NotificationManager.error('Error', "Vui lòng chọn chiến dịch", 3000);
    }
    else{
      let path = `/UngVien/add`;
      this.props.history.push({ pathname: path, state: {chiendich_id: chienDichId, ten_chiendich: ten_chiendich}})
    }
  }
  editChienDich = (value) => {
    let path = `/UngVien/addOrEdit`;
    this.props.history.push({ pathname: path, state: value._original });
  }

  handleChangeInputText = e => {

    let ListCampaign = [...(this.state.ListCampaign)]
    let value = e.target.value
    let ten_chiendich = ListCampaign.filter(Campaign => Campaign.chiendich_id == value)
    this.setState({
      chienDichId : value,
      ten_chiendich:   ten_chiendich[0].ten_chiendich
    });

  };

  handleFilterChange = () => {
    const listDownload = this.selectTable.getResolvedState().sortedData;
    this.setState({
      listDownload:listDownload
    })
  }
  render() {
    const ListCampaign = this.state.ListCampaign.map(c => {
      return(
      <MenuItem value={c.chiendich_id} key = {c.chiendich_id}>{c.ten_chiendich} </MenuItem>
      )
    })
    return (
      <div >
        <NotificationContainer />
        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
          Ứng viên
        </div>

        <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}><Select
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
          <Button variant="contained" color="secondary" onClick={this.themUngVienCoSan}>Thêm ứng viên có sẵn</Button>{' '}

          <ExcelFile element={<Button variant="contained" color="secondary">Download</Button>}>
                <ExcelSheet data={this.state.listDownload} name={"Ứng viên - " + this.state.ten_chiendich}>
                    <ExcelColumn label="Tên ứng viên" value="tenungvien"/>
                    <ExcelColumn label="Email" value="email"/>
                </ExcelSheet>
            </ExcelFile>
        </div>

        
        
        <ReactTable
          ref={(r) => {this.selectTable = r;}}
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.UngVienList}
          pageSizeDefault={10}
          onFilteredChange={this.handleFilterChange}
          defaultFilterMethod={
            (filter, row) =>
            filter.id in row ? row[filter.id].includes(filter.value) : true

          }
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
              Header: "Chiến dịch",
              accessor: "ten_chiendich",
              filterable: true,
            },
            {
              Header: "Vị trí",
              accessor: "ten_vitri",
              filterable: true,
            },
            {
              Header: "Giai đoạn",
              accessor: "ten_giaidoan",
              filterable: true,
            },
            {
              Header: "Trạng thái",
              accessor: "trangthai",
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
    getData: ( after) => { dispatch(getData(after)) },
    deleteData: (value, after) => { dispatch(deleteData(value, after)) },
    getDataCP: ( after) => { dispatch(getDataCP(after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
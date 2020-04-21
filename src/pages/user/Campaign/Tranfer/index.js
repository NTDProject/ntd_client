import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, tranfer } from './actions';
import { Save } from '@material-ui/icons/';
import { Button, Grid, Typography, Divider, MenuItem, Select, Input } from "@material-ui/core/";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme,   } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListViTri: [],
      tab: 0,
      UngVien:[],
      ListGiaiDoan:[],
      ngayhen: new Date(),
      giaidoanhientai:"",
      giaidoansau:"",
      diadiemhen:"",
      chiendich_id: "",
      ten_chiendich:"",
      giaidoanhientai_id: "",
      diadiemhen_id:"",
      giaidoansau_id:"",
    }
  }
  componentDidMount() {
    let value = this.props.route.location.state
    this.props.getData(value, this.after)
  }


  after = (resp) => {
    this.setState({
      ListViTri: this.props.route.location.state.ListVitri,
      UngVien: resp.chiendich,
      giaidoanhientai: this.props.route.location.state.giaidoanhientai,
      giaidoansau: this.props.route.location.state.giaidoansau,
      giaidoanhientai_id: this.props.route.location.state.giaidoanhientai_id,
      giaidoansau_id: this.props.route.location.state.giaidoansau_id,
      chiendich_id: this.props.route.location.state.chiendich_id,
      ten_chiendich: this.props.route.location.state.ten_chiendich,
      ListGiaiDoan: resp.giaidoan,
    })

    
  }


  handleChangeInputText = e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };

  handleChangeInputText1 = e => {

    let ListGiaiDoan = [...(this.state.ListGiaiDoan)]
    console.log("start",e)
    let value = e.target.value
    let ten_chiendich = ListGiaiDoan.filter(c=> c.GiaiDoan == value)
    this.setState({
      giaidoansau_id : value,
      ten_chiendich:   ten_chiendich[0].Ten_GiaiDoan
    });
  };

  handleChangeInputOnCell = (e,value) => {
    console.log(value)
    let UngVien = this.state.UngVien
    UngVien.map(u => {
      if(u.ungvien_id == value._original.ungvien_id && u.vitri_id == value._original.vitri_id){
          if(u.pass == 0){
            u.pass = 1
          }
          else{
            u.pass = 0
          }
      }
    })
    this.setState({
      UngVien : UngVien
    })
  }

  handleChangeInputOnCell1 = value => {
    console.log(value)
    let UngVien = this.state.UngVien
    UngVien.map(u => {
      if(u.ungvien_id == value._original.ungvien_id && u.vitri_id == value._original.vitri_id){
          u.note = document.getElementById("note -" + u.vitri_id + "-" + u.ungvien_id).value 
      }
    })

    console.log(UngVien)
  }

  save = () => {
    const { ngayhen, diadiemhen } = this.state

    if (ngayhen == null || ngayhen == undefined || ngayhen == "") {
      toast("Không được để trống tên chiến dịch")
    }
    else if (diadiemhen == null || diadiemhen == undefined || diadiemhen == '') {
      toast("Không được để trống ngày bắt đầu")
    }
   
    else {
      const { UngVien, ngayhen, giaidoanhientai, giaidoansau, diadiemhen, chiendich_id, ten_chiendich, giaidoanhientai_id, giaidoansau_id} = this.state
      let value = {
        chiendich_id: chiendich_id,
        ten_chiendich:ten_chiendich,
        giaidoansau: giaidoansau,
        giaidoanhientai: giaidoanhientai,
        giaidoanhientai_id: giaidoanhientai_id,
        giaidoansau_id:giaidoansau_id,
        ngayhen:ngayhen,
        diadiemhen:diadiemhen,
        UngVien:UngVien
      }

      this.props.tranfer(value, this.afterTranfer)
    }
  }

  afterTranfer = (resp) => {
    console.log(resp)
  }

  

  afterSave = (resp) => {
    console.log(resp)
    toast(resp.message)

  }

  handleChangeNgayHen = date => {
    this.setState({
      ngayhen: date
    });
  };

  back = () => {
    let path = `/campaign/addOrEdit`;
    this.props.history.push({pathname:path,state:{id:this.state.chiendich_id}});
  }

  render() {
    const TabListElement = this.state.ListViTri.map(v => {
      return (
        <Tab>{v.ten_vitri}</Tab>
      )
    })

    const ListGiaiDoan = this.state.ListGiaiDoan.map(c => {
      return(
      <MenuItem value={c.GiaiDoan} key = {c.GiaiDoan}>{c.Ten_GiaiDoan} </MenuItem>
      )
    })

    const TabPaneElement = this.state.ListViTri.map(v => {
      return (
        <TabPanel>
          <ReactTable
            style={{ width: "98%", margin: "10px" }}
            showPagination={true}
            sortable={true}
            data={this.state.UngVien.filter(u => u.vitri_id == v.vitri_id)}
            columns={[
              {
                Header: "Tên",
                accessor: "tenungvien",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Pass",
                accessor: "pass",
                Cell: (props) =>
                  <div style={{ textAlign: "center" }}>
                    <input type = "checkbox" checked = {props.value > 0} name = {v.vitri_id + "-" + props.row._original.ungvien_id} id = {v.vitri_id + "-" + props.row._original.ungvien_id} onClick = {(e ) => this.handleChangeInputOnCell(e,props.row)}/>
                  </div>,
              },
              {
                Header: "Nhận xét",
                accessor: "note",
                Cell: (props) =>
                  <div style={{ textAlign: "center" }}>
                    <input type = "text" name = {"note -" + props.row.vitri_id + "-" + props.row._original.ungvien_id} id = {"note -" + v.vitri_id + "-" + props.row._original.ungvien_id}  onBlur = {() => this.handleChangeInputOnCell1(props.row)}  defaultValue = {props.value}/>
                  </div>,
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </TabPanel>
      )
    })

    return (

      <div style={{ margin: "20px" }}>
        <ToastContainer />
        <div style={{ padding: "20px" }}>

            <Typography variant="subtitle1" gutterBottom>
            Thông tin chung:
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Giai đoạn hiện tại:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="giaidoanhientai" value = {this.state.giaidoanhientai}/>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Gian đoạn sau:</span>
            </Grid>
            <Grid item xs={2}>
            <Select
              style = {{width: "150px"}}
              value={this.state.giaidoansau_id}
              input={<Input />}
              onChange={this.handleChangeInputText1}
            >
              {
                    ListGiaiDoan
              }
          </Select>{' '}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Ngày hẹn:</span>
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                name="ngayBatDau"
                selected={this.state.ngayhen}
                onChange={this.handleChangeNgayHen}
                dateFormat="dd/MM/yyyy"
              />
            </Grid>

            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Địa điểm hẹn :</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="diadiemhen" value = {this.state.diadiemhen} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>
        </div>
        <Divider />
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Vị trí tuyển dụng :
          </Typography>
          <Grid container spacing={3}>

          </Grid>
        </div>
        <Divider />
        <Tabs>
          <TabList>
            {TabListElement}
          </TabList>
          {
            TabPaneElement
          }
        </Tabs>
        <Divider />
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Button variant="contained" color="secondary" onClick={this.save}>
            <Save />{' '}Lưu
        </Button> {' '}
          <Button variant="contained" color="secondary" onClick={this.back}>
            Quay lại
        </Button>
        </div>
        <Divider />
      </div>

    );

  }
}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (value, after) => { dispatch(getData(value, after)) },
    tranfer: (value, after) => { dispatch(tranfer(value, after)) },
    
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
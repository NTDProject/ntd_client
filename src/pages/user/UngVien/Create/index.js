import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save, getHistory } from './actions';
import { Save } from '@material-ui/icons/';
import { Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


import "react-datepicker/dist/react-datepicker.css";


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHistory:[],
      ten_chiendich: "",
      tenungvien:"",
      email:"",
      ListViTri: [],
      chiendich_id: "",
      ungvien_id: "",
      open: false
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/UngVien"});
    }
    else{
      let chiendich_id = this.props.route.location.state.chiendich_id
      let ungvien_id = this.props.route.location.state.ungvien_id
      let ten_chiendich = this.props.route.location.state.ten_chiendich
      console.log("ten_chiendich",ten_chiendich)
      this.setState({
        chiendich_id: chiendich_id,
        ungvien_id: ungvien_id,
        ten_chiendich: ten_chiendich
      })

      this.props.getData({chiendich_id: chiendich_id, ungvien_id: ungvien_id}, this.after)
    }
  }


  after = (resp) => {

    this.setState({
      tenungvien: resp.tenungvien,
      email: resp.email,
      ListViTri: resp.ListViTri,
    })

  }

  handleChangeNgayBatDau = date => {
    this.setState({
      ngayBatDau: date
    });
  };
  handleChangeNgayKetThuc = date => {
    this.setState({
      ngayKetThuc: date
    });
  };

  handleChangeInputText= e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };
  handleChangeInputOnCell = value => {
    
    let viTri = this.state.ListViTri
    viTri.map(vt => {
      if(vt.vitri_id == value._original.vitri_id){
        if(document.getElementById(value._original.vitri_id).checked){
          vt.checkapp = 1
        }
        else{
          vt.checkapp = 0
        }
      }
    })
    this.setState({
      ListViTri: viTri
    })
  }

  save = () => {
    const {ten_chiendich, tenungvien, email} = this.state
    let canTuyen = 0

    this.state.ListViTri.map(vt => {
      if(vt.checkapp != null && vt.checkapp != undefined && vt.checkapp != ''){
        canTuyen += vt.checkapp;
      }
    })

    if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      NotificationManager.error('Error', "Không được để trống Tên ứng viên", 3000);
    }
    else if(email == null || email == undefined || email == ''){
      NotificationManager.error('Error', "Không được để trống ngày email", 3000);
    }
    else if(canTuyen <= 0){
      NotificationManager.error('Error',"Bạn phải chọn ít nhất 1 vị trí ứng tuyển", 3000);
    }
    else{
      const {tenungvien,email,ListViTri,chiendich_id,ungvien_id} = this.state 
      let value = {
        chiendich_id:chiendich_id,
        ungvien_id:ungvien_id,
        ten_ungvien:tenungvien,
        email:email,
        ListViTri:ListViTri
      }
      this.props.save(value,this.afterSave)
    }
  }

  afterSave = (resp) => {
    if(resp.status){
      let path = "/UngVien"
      this.props.history.push({pathname:path,state:{resp}});
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
  }

  afterHistory = (resp) => {
    this.setState({
      open: true,
      listHistory: resp
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  back = () => {
    let path = "/UngVien"
    this.props.history.push({pathname:path});
  }

  render() {
    
    return (

      <div style={{ margin: "20px" }}>
        <NotificationContainer />
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin chung:
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Tên chiến dịch:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="ten_chiendich" value = {this.state.ten_chiendich}/>
            </Grid>
            <Grid item xs={7}></Grid>
           
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Tên ứng viên:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="tenungvien" value = {this.state.tenungvien} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Email:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="email" value = {this.state.email} onChange = {this.handleChangeInputText}/>
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
          <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListViTri}
          pageSize={this.state.ListViTri.length>0?this.state.ListViTri.length:5}
          columns={[
            {
              Header: "",
              accessor: "checkapp",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <input type = "checkbox" checked = {props.value > 0} id = {props.row._original.vitri_id} onClick = {() => this.handleChangeInputOnCell(props.row)}/>
              </div>,
              width: 150
            },
            {
              Header: "Tên",
              accessor: "ten_vitri",

            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
          </Grid>
        </div>
        <Divider />
        <div style ={{textAlign: "center", margin: "20px"}}>
        <Button variant="contained" color="secondary" onClick = {this.save}>
          <Save/>{' '}Lưu
        </Button> {' '}
        <Button variant="contained" color="secondary" onClick = {this.back}>
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
    save: (value, after) => { dispatch(save(value, after)) },
    getHistory: (value, after) => { dispatch(getHistory(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
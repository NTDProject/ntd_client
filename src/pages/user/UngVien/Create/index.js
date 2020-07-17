import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save, getHistory } from './actions';
import { Save } from '@material-ui/icons/';
import { TextField, Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from "@material-ui/core/";
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
      sdt:"",
      ListViTri: [],
      chiendich_id: "",
      ungvien_id: "",
      open: false,
      open2: false,
      ListYeuCau: [],
      viTriMax:[]
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
      sdt: resp.sdt,
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

  checksave = () => {
    const {ten_chiendich, tenungvien, email,sdt} = this.state
    let canTuyen = 0
    let viTriMax = []
    this.state.ListViTri.map(vt => {
      if(vt.checkapp != null && vt.checkapp != undefined && vt.checkapp != ''&& vt.checkapp > 0){
        canTuyen += vt.checkapp;
        if(vt.soluong <= vt.dem){
          viTriMax.push(vt.ten_vitri)
        }
      }
    })

    if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      NotificationManager.error('Error', "Không được để trống tên ứng viên", 3000);
    }
    else if(email == null || email == undefined || email == ''){
      NotificationManager.error('Error', "Không được để trống email", 3000);
    }
    else if(sdt == null || sdt == undefined || sdt == ''){
      NotificationManager.error('Error', "Không được để trống số điện thoại", 3000);
    }
    else if(canTuyen <= 0){
      NotificationManager.error('Error',"Bạn phải chọn ít nhất 1 vị trí ứng tuyển", 3000);
    }else if(viTriMax.length > 0){
      this.setState({
        open2: true,
        viTriMax: viTriMax
      })
    }
    else{
      this.save()
    }
  }

  save = () => {
    const {ten_chiendich, tenungvien, email,sdt} = this.state
    let canTuyen = 0

    this.state.ListViTri.map(vt => {
      if(vt.checkapp != null && vt.checkapp != undefined && vt.checkapp != ''){
        canTuyen += vt.checkapp;
      }
    })

    if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      NotificationManager.error('Error', "Không được để trống tên ứng viên", 3000);
    }
    else if(email == null || email == undefined || email == ''){
      NotificationManager.error('Error', "Không được để trống email", 3000);
    }
    else if(sdt == null || sdt == undefined || sdt == ''){
      NotificationManager.error('Error', "Không được để trống số điện thoại", 3000);
    }
    else if(canTuyen <= 0){
      NotificationManager.error('Error',"Bạn phải chọn ít nhất 1 vị trí ứng tuyển", 3000);
    }
    else{
      const {tenungvien,email,ListViTri,chiendich_id,ungvien_id,sdt} = this.state 
      let value = {
        chiendich_id:chiendich_id,
        ungvien_id:ungvien_id,
        ten_ungvien:tenungvien,
        email:email,
        sdt:sdt,
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

  handleChangeInputOnCell2 = value => {
    this.setState({
      open: true,
      ListYeuCau: value._original.yeucau,
      vitriYeuCau: value._original.vitri_id,
    })
  }

  saveYeuCau = () => {
    let vitri  = this.state.ListViTri
    vitri.map(vt => {
      if(vt.yeucau_id == this.state.vitriYeuCau){
        vitri.yeucau = this.state.ListYeuCau
      }
    })
    this.setState({
      open: false,
      ListViTri: vitri
    })
  }

  handleChangeInputOnCell4 = value => {
    let yeuCau = this.state.ListYeuCau
    yeuCau.map(yc => {
      if(yc.yeucau_id == value._original.yeucau_id){
        if(value._original.checkYC == 0){
          yc.checkYC = 1
        }
        else{
          yc.checkYC = 0
        }
      }
    })
    this.setState({
      ListYeuCau: yeuCau
    })
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
            <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Tên chiến dịch"
                      name="ten_chiendich"
                      type="text"
                      value={this.state.ten_chiendich}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={2}></Grid>
           
            <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Tên ứng viên"
                      name="tenungvien"
                      onChange={this.handleChangeInputText}
                      type="text"
                      value={this.state.tenungvien}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      onChange={this.handleChangeInputText}
                      type="text"
                      value={this.state.email}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="sdt"
                      onChange={this.handleChangeInputText}
                      type="number"
                      value={this.state.sdt}
                      variant="outlined"
                    />  
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

            },
            {
              Header: "Yêu cầu",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <Button  variant="contained" color="secondary" onClick = {() => this.handleChangeInputOnCell2(props.row)}>Chỉnh sửa yêu cầu</Button>
              </div>

            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
          </Grid>
        </div>
        <Divider />
        <div style ={{textAlign: "center", margin: "20px"}}>
        <Button variant="contained" color="secondary" onClick = {this.checksave}>
          <Save/>{' '}Lưu
        </Button> {' '}
        <Button variant="contained" color="secondary" onClick = {this.back}>
          Quay lại
        </Button>
        </div>
        <Divider />
        <Dialog
          width = "500px"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Thông tin yêu cầu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListYeuCau}
          pageSize={this.state.ListYeuCau.length>0?this.state.ListYeuCau.length:5}
          columns={[
            {
              Header: "",
              accessor: "checkYC",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <input type = "checkbox" checked = {props.value > 0} id = {props.row._original.yeucau_id} onClick = {() => this.handleChangeInputOnCell4(props.row)}/>
              </div>,
              width: 150
            },
            {
              Header: "Nội dung yêu cầu",
              accessor: "nd_yeucau",
              width: 500
            },
          ]}
          />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.saveYeuCau} color="primary" autoFocus>
            Xong
          </Button>{' '}
        </DialogActions>
      </Dialog>
       

      <Dialog
          width = "500px"
          open={this.state.open2}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
      <DialogTitle id="alert-dialog-title">{"Xác nhận thêm mới"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>Vị trí </span> 
            {
              this.state.viTriMax.map((a,i) => {
                if(i == 0){
                return(
                  a
                )
                }
                else{
                  return(
                    ", " +a
                  )
                }
              })
            }
            <span> đã tuyển đủ số lượng bạn có muốn tiếp tục ?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.save} color="primary">
            Tiếp tục
          </Button>{' '}
          <Button onClick={() => this.setState({open2: false})} color="primary">
            Quay lại
          </Button>{' '}
        </DialogActions>
      </Dialog>
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
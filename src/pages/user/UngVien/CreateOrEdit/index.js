import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save, getHistory, getDataGiaiDoan, tranfer } from './actions';
import { Save } from '@material-ui/icons/';
import { TextField, Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, Input, MenuItem } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";


import "react-datepicker/dist/react-datepicker.css";


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHistory:[],
      tenungvien :"",
      email:"",
      ten_chiendich:"",
      ten_vitri:"",
      ten_giaidoan:"",
      ungvien_id:"",
      vitri_id:"",
      giaidoan:"",
      chiendich_id:"",
      open: false,
      ListGiaiDoan:[],
      giaidoansau:"",
      ngayhen:new Date(),
      giaidoansau_id:"",
      note:"",
      diem:"",
      diadiemhen:"",
      ListYeuCau:[],
      viTriMax:{},
      open2: false,
      quequan:"",
      noiohientai:"",
      truong:"",
      trinhdo:"",
      ngaysinh:new Date(),
      gioitinh:"",
      sdt:""
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/UngVien"});
    }
    else{
      let tenungvien = this.props.route.location.state.tenungvien
      let email = this.props.route.location.state.email
      let sdt = this.props.route.location.state.sdt
      let gioitinh = this.props.route.location.state.gioitinh
      let arrngaysinh = (this.props.route.location.state.ngaysinh).split("-")
      console.log(arrngaysinh)
      let trinhdo = this.props.route.location.state.trinhdo
      let truong = this.props.route.location.state.truong
      let noiohientai = this.props.route.location.state.noiohientai
      let quequan = this.props.route.location.state.quequan
      let ten_chiendich = this.props.route.location.state.ten_chiendich
      let ten_vitri = this.props.route.location.state.ten_vitri
      let ten_giaidoan = this.props.route.location.state.ten_giaidoan
      let ungvien_id = this.props.route.location.state.ungvien_id
      let vitri_id = this.props.route.location.state.vitri_id
      let giaidoan = this.props.route.location.state.giaidoan
      let chiendich_id = this.props.route.location.state.chiendich_id

      
      this.setState({
        tenungvien :tenungvien,
        email:email,
        quequan:quequan,
        noiohientai:noiohientai,
        truong:truong,
        trinhdo:trinhdo,
        ngaysinh:new Date(arrngaysinh[0],arrngaysinh[1]-1,arrngaysinh[2]),
        gioitinh:gioitinh,
        sdt:sdt,
        ten_chiendich:ten_chiendich,
        ten_vitri:ten_vitri,
        ten_giaidoan:ten_giaidoan,
        ungvien_id:ungvien_id,
        vitri_id:vitri_id,
        giaidoan:giaidoan,
        chiendich_id:chiendich_id
      })
      this.props.getDataGiaiDoan({giaidoan:giaidoan},this.afterGetDataGiaiDoan)
      this.props.getHistory({chienDichID : chiendich_id, ungVienID: ungvien_id, viTriID: vitri_id },this.afterHistory)
    }
  }


  handleChangeNgaySinh = date => {
    this.setState({
      ngaysinh: date
    });
  };

  afterGetDataGiaiDoan = (resp) => {
    this.setState({
      ListGiaiDoan: resp
    })
  }

  handleChangeNgayHen = date => {
    this.setState({
      ngayhen: date
    });
  };

  handleChangeInputText= e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };
  

  save = () => {
    const {ungvien_id, sdt, gioitinh, tenungvien, ngaysinh, email, ListYeuCau, trinhdo, vitri_id, chiendich_id, noiohientai, quequan, truong} = this.state

    if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      NotificationManager.error('Error', "Không được để trống Tên ứng viên", 3000);
    }
    else if(email == null || email == undefined || email == ''){
      NotificationManager.error('Error', "Không được để trống ngày email", 3000);
    }
    
    else{
      let value = {
        ungvien_id:ungvien_id,
        vitri_id:vitri_id,
        chiendich_id:chiendich_id,
        ten_ungvien:tenungvien,
        email:email,
        quequan:quequan,
        noiohientai:noiohientai,
        truong:truong,
        trinhdo:trinhdo,
        ngaysinh:((ngaysinh.getDate()).toString().padStart(2, '0'))+"/"+((ngaysinh.getMonth()+1).toString().padStart(2, '0'))+"/"+ngaysinh.getFullYear(),
        gioitinh:gioitinh,
        sdt:sdt,
        yc: ListYeuCau
      }
      this.props.save(value,this.afterSave)
    }
  }

  afterSave = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      
    }
    else
      NotificationManager.error('Error', resp.message, 3000);
  }

  afterHistory = (resp) => {
    console.log(resp)
    const result = resp.ls.filter(r => r.status == 1);
    this.setState({
      viTriMax: resp.viTriMax,
      ListYeuCau:resp.yc,
      listHistory: resp.ls,
      giaidoan: result[0].giaidoan,
      ten_giaidoan: result[0].ten_giaidoan,
      open: false,
      note:"",
      diadiemhen:"",
      ngayhen:new Date(),
      giaidoansau_id:"",
      giaidoansau:""
    })
  }

  afterHistory2 = (resp) => {
    const result = resp.ls.filter(r => r.status == 1);
    this.setState({
      listHistory: resp.ls,
      viTriMax: resp.viTriMax,
      giaidoan: result[0].giaidoan,
      ten_giaidoan: result[0].ten_giaidoan,
      open: false,
      open2:false,
      note:"",
      diadiemhen:"",
      ngayhen:new Date(),
      giaidoansau_id:"",
      giaidoansau:""
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  tranfer = () => {
    this.setState({
      open: true,
      ngayhen:new Date(),
      giaidoansau_id:"",
      note:"",
      diem:"",
      diadiemhen:"",
    })
  }

  checkSaveTranfer = () => {
    
    const { viTriMax, vitri_id, note, email, ungvien_id, ngayhen, ten_giaidoan, giaidoansau, diadiemhen, chiendich_id, ten_chiendich, giaidoan, giaidoansau_id, diem} = this.state
    console.log("check", viTriMax)
    if (giaidoansau_id == 4 && viTriMax.dem >= viTriMax.soluong) {
      this.setState({
        open: false,
        open2: true
      })
    }
    else{
      this.saveTranfer()
    }
  }

  saveTranfer = () => {
    const { vitri_id, note, email, ungvien_id, ngayhen, ten_giaidoan, giaidoansau, diadiemhen, chiendich_id, ten_chiendich, giaidoan, giaidoansau_id, diem} = this.state

    if (giaidoansau_id == null || giaidoansau_id == undefined || giaidoansau_id == "") {
      NotificationManager.error('Error', "Không được để trống giai đoạn sau", 3000);
    }
   
    else {
      let value = {
        chiendich_id: chiendich_id,
        ten_chiendich:ten_chiendich,
        giaidoansau: giaidoansau,
        ten_giaidoan: ten_giaidoan,
        giaidoan: giaidoan,
        giaidoansau_id:giaidoansau_id,
        ngayhen:((ngayhen.getDate()).toString().padStart(2, '0'))+"/"+((ngayhen.getMonth()+1).toString().padStart(2, '0'))+"/"+ngayhen.getFullYear(),
        diadiemhen:diadiemhen,
        ungvien_id:ungvien_id,
        email: email,
        note: note,
        diem:diem,
        vitri_id:vitri_id
      }

      this.props.tranfer(value, this.afterTranfer)
    }
  }

  afterTranfer = (resp) => {
    const {chiendich_id, ungvien_id, vitri_id, giaidoan} = this.state
    let giaidoansau_id = this.state.giaidoansau_id
    let giaidoansau = this.state.giaidoansau
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getDataGiaiDoan({giaidoan:giaidoansau_id},this.afterGetDataGiaiDoan)
      this.props.getHistory({chienDichID : chiendich_id, ungVienID: ungvien_id, viTriID: vitri_id },this.afterHistory2)
    }
    else
      NotificationManager.error('Error', resp.message, 3000);
  }

  back = () => {
    let path = "/UngVien"
    this.props.history.push({pathname:path});
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
    const ListGiaiDoan = this.state.ListGiaiDoan.map(c => {
      return(
      <MenuItem value={c.GiaiDoan} key = {c.GiaiDoan}>{c.Ten_GiaiDoan} </MenuItem>
      )
    })

    const Diem = () => {}
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

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                id="ngaysinh"
                label="Ngày sinh"
                name="ngaysinh"
                value={this.state.ngaysinh}
                onChange={this.handleChangeNgaySinh}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
          </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
            <TextField
                fullWidth
                id="gioitinh"
                name="gioitinh"
                select
                label="Giới tính"
                value={this.state.gioitinh}
                onChange={this.handleChangeInputText}
                variant="outlined"
              >
                <MenuItem value="1" key = "1">Nam</MenuItem>
                <MenuItem value="0" key = "0">Nữ</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
            <TextField
                      fullWidth
                      label="Trường"
                      name="truong"
                      onChange={this.handleChangeInputText}
                      type="text"
                      value={this.state.truong}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
            <TextField
                fullWidth
                id="trinhdo"
                name="trinhdo"
                select
                label="Trình độ"
                value={this.state.trinhdo}
                onChange={this.handleChangeInputText}
                variant="outlined"
              >
                <MenuItem value="1" key = "1">Đại học</MenuItem>
                <MenuItem value="2" key = "2">Cao đẳng</MenuItem>
                <MenuItem value="3" key = "3">Trung cấp</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
            <TextField
                      fullWidth
                      label="Quê quán"
                      name="quequan"
                      onChange={this.handleChangeInputText}
                      type="text"
                      value={this.state.quequan}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
            <TextField
                      fullWidth
                      label="Nơi ở hiện tại"
                      name="noiohientai"
                      onChange={this.handleChangeInputText}
                      type="text"
                      value={this.state.noiohientai}
                      variant="outlined"
                    />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Vị trí"
                name="ten_vitri"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.ten_vitri}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={7}></Grid>
          </Grid>
        </div>

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
              Header: "Tiêu chí đánh giá",
              accessor: "nd_yeucau",
              width: 500
            },
          ]}
          />

        <Divider />

        
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Nhật ký giai đoạn:
          </Typography>
          <Grid container spacing={3}>
          <ReactTable
          style = {{width: "100%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.listHistory}
          pageSize={this.state.listHistory.length>0?this.state.listHistory.length:5}
          columns={[
            {
              Header: "Giai đoạn",
              accessor: "ten_giaidoan",
              width:"200"
            },
            {
              Header: "Thời gian",
              accessor: "createdate",
              width:"200"
            },
            {
              Header: "Điểm",
              accessor: "diem",
              width:"200"
            },
            {
              Header: "Ghi chú",
              accessor: "note",
              width:"200"
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
          </Grid>
        </div>
        <Divider />
        <div style ={{textAlign: "center", margin: "20px"}}>
        <Button variant="contained" color="secondary" onClick = {this.tranfer}>
          Chuyển giai đoạn
        </Button>{' '}
        <Button variant="contained" color="secondary" onClick = {this.save}>
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
        <DialogTitle id="alert-dialog-title">{"Thông tin chuyển giai đoạn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={3}>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Giai đoạn hiện tại"
                  name="ten_giaidoan"
                  onChange={this.handleChangeInputText}
                  type="text"
                  value={this.state.ten_giaidoan}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="ogiaidoansau_id"
                    name="giaidoansau_id"
                    select
                    label="Giai đoạn sau"
                    value={this.state.giaidoansau_id}
                    onChange={this.handleChangeInputText}
                    variant="outlined"
                  >
                    {
                      ListGiaiDoan
                    }
                </TextField>
              </Grid>
          
              
              <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                id="ngayhen"
                label="Ngày hẹn"
                name="ngayhen"
                value={this.state.ngayhen}
                onChange={this.handleChangeNgayHen}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
          </MuiPickersUtilsProvider>
              </Grid>
              {

                this.state.giaidoan == 13?(
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Điểm"
                      name="diem"
                      onChange={this.handleChangeInputText}
                      type="number"
                      value={this.state.diem}
                      variant="outlined"
                    />
                </Grid>) : (<div></div>)
                  
              }
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa điểm hẹn"
                  name="diadiemhen"
                  onChange={this.handleChangeInputText}
                  type="text"
                  value={this.state.diadiemhen}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nhận xét"
                  name="note"
                  onChange={this.handleChangeInputText}
                  type="text"
                  value={this.state.note}
                  variant="outlined"
                />
              </Grid>
              
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.checkSaveTranfer} color="primary" autoFocus>
            Lưu
          </Button>{' '}
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Quay lại
          </Button>
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
                this.state.viTriMax.ten_vitri
            }
            <span> đã tuyển đủ số lượng bạn có muốn tiếp tục ?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.saveTranfer} color="primary">
            Tiếp tục
          </Button>{' '}
          <Button onClick={() => this.setState({open: true, open2: false})} color="primary">
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
    getDataGiaiDoan: (value, after) => { dispatch(getDataGiaiDoan(value, after)) },
    tranfer:  (value, after) => { dispatch(tranfer(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
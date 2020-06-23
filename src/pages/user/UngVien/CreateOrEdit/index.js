import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save, getHistory, getDataGiaiDoan, tranfer } from './actions';
import { Save } from '@material-ui/icons/';
import { Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, Input, MenuItem } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';



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
      diadiemhen:"",
      ngayhen:new Date(),
      giaidoansau_id:"",
      note:"",
      diem:""
      
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
    const {ungvien_id, tenungvien, email} = this.state

    if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      NotificationManager.error('Error', "Không được để trống Tên ứng viên", 3000);
    }
    else if(email == null || email == undefined || email == ''){
      NotificationManager.error('Error', "Không được để trống ngày email", 3000);
    }
    
    else{
      let value = {
        ungvien_id:ungvien_id,
        ten_ungvien:tenungvien,
        email:email,
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
    const result = resp.filter(r => r.status == 1);
    this.setState({
      listHistory: resp,
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

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  tranfer = () => {
    this.setState({
      open: true
    })
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
        ngayhen:ngayhen,
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
      this.props.getHistory({chienDichID : chiendich_id, ungVienID: ungvien_id, viTriID: vitri_id },this.afterHistory)
    }
    else
      NotificationManager.error('Error', resp.message, 3000);
  }

  back = () => {
    let path = "/UngVien"
    this.props.history.push({pathname:path});
  }


  render() {
    const ListGiaiDoan = this.state.ListGiaiDoan.map(c => {
      return(
      <MenuItem value={c.GiaiDoan} key = {c.GiaiDoan}>{c.Ten_GiaiDoan} </MenuItem>
      )
    })
    return (

      <div style={{ margin: "20px" }}>
        <NotificationContainer />
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin chung:
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <span style={{ marginRight: "50px" }}>Tên chiến dịch:</span>
            </Grid>
            <Grid item xs={5}>
              <input style = {{width:"100%"}} type="text" name="ten_chiendich" value = {this.state.ten_chiendich} />
            </Grid>
            <Grid item xs={3}></Grid>
           
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <span style={{ marginRight: "50px" }}>Tên ứng viên:</span>
            </Grid>
            <Grid item xs={5}>
              <input style = {{width:"100%"}} type="text" name="tenungvien" value = {this.state.tenungvien} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <span style={{ marginRight: "50px" }}>Email:</span>
            </Grid>
            <Grid item xs={5}>
              <input style = {{width:"100%"}} type="text" name="email" value = {this.state.email} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <span style={{ marginRight: "50px" }}>Vị trí:</span>
            </Grid>
            <Grid item xs={5}>
              <input style = {{width:"100%"}} type="text" name="ten_vitri" value = {this.state.ten_vitri}/>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
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
              
              <Grid item xs={3}>
                <span>Giai đoạn hiện tại:</span>
              </Grid>
              <Grid item xs={9}>
                <input style={{ width:"100%" }} type="text" name="ten_giaidoan" value = {this.state.ten_giaidoan} />
              </Grid>
              
              <Grid item xs={3}>
                <span>Gian đoạn sau:</span>
              </Grid>
              <Grid item xs={9}>
              <Select
                name = "giaidoansau_id"
                value={this.state.giaidoansau_id}
                input={<Input style={{ width:"100%" }}/>}
                onChange={this.handleChangeInputText}
              >
                {
                      ListGiaiDoan
                }
            </Select>{' '}
              </Grid>
          
              
              <Grid item xs={3}>
                <span>Ngày hẹn:</span>
              </Grid>
              <Grid item xs={9}>
                <DatePicker
                  name="ngayBatDau"
                  selected={this.state.ngayhen}
                  onChange={this.handleChangeNgayHen}
                  dateFormat="dd/MM/yyyy"
                  
                />
              </Grid>

              
              <Grid item xs={3}>
                <span>Địa điểm hẹn :</span>
              </Grid>
              <Grid item xs={9}>
                <input style={{ width:"100%" }} type="text" name="diadiemhen" value = {this.state.diadiemhen} onChange = {this.handleChangeInputText}/>
              </Grid>
              <Grid item xs={3}>
                <span>Nhận xét :</span>
              </Grid>
              <Grid item xs={9}>
                <input style={{ width:"100%" }} type="text" name="note" value = {this.state.note} onChange = {this.handleChangeInputText}/>
              </Grid>
              <Grid item xs={3}>
                <span>Điểm :</span>
              </Grid>
              <Grid item xs={9}>
                <input style={{ width:"100%" }} type="number" name="diem" value = {this.state.diem} onChange = {this.handleChangeInputText}/>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.saveTranfer} color="primary" autoFocus>
            Lưu
          </Button>{' '}
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Quay lại
          </Button>
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
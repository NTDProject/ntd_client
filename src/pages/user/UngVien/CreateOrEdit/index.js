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
    let isAdd = this.state.idChienDich=="addPage"?true:false
    let canTuyen = 0

    this.state.ListViTri.map(vt => {
      if(vt.checkapp != null && vt.checkapp != undefined && vt.checkapp != ''){
        canTuyen += vt.checkapp;
      }
    })


    if(ten_chiendich == null || ten_chiendich == undefined || ten_chiendich == ""){
      toast("Không được để trống tên chiến dịch")
    }
    else if(tenungvien == null || tenungvien == undefined || tenungvien == ''){
      toast("Không được để trống Tên ứng viên")
    }
    else if(email == null || email == undefined || email == ''){
      toast("Không được để trống ngày email")
    }
    else if(canTuyen <= 0){
      toast("Bạn phải chọn ít nhất 1 vị trí ứng tuyển")
    }
    else{
      const {ten_chiendich,tenungvien,email,ListViTri,chiendich_id,ungvien_id} = this.state 
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
    toast(resp.message)
  }

  HistoryDetail = (row) => {
    this.props.getHistory({chienDichID : this.state.chiendich_id, ungVienID: this.state.ungvien_id, viTriID: row._original.vitri_id },this.afterHistory)

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

  render() {
    
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
              <span style={{ marginRight: "50px" }}>Tên chiến dịch:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="ten_chiendich" value = {this.state.ten_chiendich} onChange = {this.handleChangeInputText}/>
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

            },
            {
              Header: "Lịch sử",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <button onClick = {() => this.HistoryDetail(props.row)}>xem chi tiết</button>
              </div>,
            },
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
        <Button variant="contained" color="secondary">
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
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
              Header: "Trạng thái",
              accessor: "Status",
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            quay lại
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
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
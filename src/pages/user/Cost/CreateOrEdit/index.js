import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save } from './actions';
import { Save } from '@material-ui/icons/';
import { TextField, Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
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
      ten_chiendich: "",
      chiendich_id: "",
      create: new Date(),
      noidung:"",
      sotien:"",
      note:"",
      id:"addPage"
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/Cost"});
    }
    else{
      let chiendich_id = this.props.route.location.state.chiendich_id
      let id = this.props.route.location.state.id
      console.log(id)
      let ten_chiendich = this.props.route.location.state.ten_chiendich
      let note = this.props.route.location.state.note
      let sotien = this.props.route.location.state.sotien
      let noidung = this.props.route.location.state.noidung
      let create = this.props.route.location.state.create
      console.log("ten_chiendich",ten_chiendich)
      this.setState({
        ten_chiendich: ten_chiendich,
        chiendich_id: chiendich_id,
        create: create,
        noidung:noidung,
        sotien:sotien,
        note:note,
        id:id
      })
    }
  }


  handleChangeInputText= e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };
  

  handleChangeNgayKetThuc = date => {
    this.setState({
      create: date
    });
  };

  save = () => {
    const {id, chiendich_id, ten_chiendich, create, noidung, sotien, note} = this.state

    if(ten_chiendich == null || ten_chiendich == undefined || ten_chiendich == ""){
      toast("Không được để trống tên chiến dịch")
    }
    else if(noidung == null || noidung == undefined || noidung == ''){
      toast("Không được để trống nội dung")
    }
    else if(sotien == null || sotien == undefined || sotien == ''){
      toast("Không được để trống số tiền")
    }
    else if(create == null || create == undefined || create == ''){
      toast("Không được để trống ngày phát sinh")
    }
    else{
      const {} = this.state 
      let value = {
        chiendich_id: chiendich_id,
        create: document.getElementById("create").value,
        noidung:noidung,
        sotien:sotien,
        note:note,
        id:id
      }
      this.props.save(value,this.afterSave)
    }
  }
  
  back = () => {
    let path = `/cost`;
    this.props.history.push({ pathname: path, state: {chienDichId: this.state.chiendich_id}});
  }

  afterSave = (resp) => {
    if(resp.status == true){
      let path = `/cost`;
      this.props.history.push({ pathname: path, state: {chienDichId: this.state.chiendich_id}});
    }
    else{
      toast(resp.message)
    }
  }

  render() {
    
    return (

      <div style={{ margin: "20px" }}>
        <ToastContainer />
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin chi phí:
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tên chiến dịch"
                name="ten_chiendich"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.ten_chiendich}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={7}></Grid>
           
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Nội dung"
                name="noidung"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.noidung}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Ghi chú"
                name="note"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.note}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
            <TextField
                fullWidth
                label="Số tiền"
                name="sotien"
                onChange={this.handleChangeInputText}
                type="number"
                value={this.state.sotien}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="create"
                label="Ngày phát sinh"
                name="create"
                value={this.state.create}
                onChange={this.handleChangeNgayKetThuc}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
          </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={1}></Grid>
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
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
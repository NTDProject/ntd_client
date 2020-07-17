import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { save } from './actions';
import { Save } from '@material-ui/icons/';
import { TextField, Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from "@material-ui/core/";
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
      vitri_id:"addPage",
      ten_vitri:"",
      mota:""
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/vitri"});
    }
    else{
      let vitri_id = this.props.route.location.state.vitri_id
      let ten_vitri = this.props.route.location.state.ten_vitri
      let mota = this.props.route.location.state.mota
      this.setState({
        vitri_id:vitri_id,
        ten_vitri:ten_vitri,
        mota:mota
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

  save = () => {
    const {vitri_id,ten_vitri,mota} = this.state

    if(ten_vitri == null || ten_vitri == undefined || ten_vitri == ""){
      toast("Không được để trống tên vị trí")

    }
    else{
      let value = {
        vitri_id:vitri_id,
        ten_vitri:ten_vitri,
        mota:mota
      }
      this.props.save(value,this.afterSave)
    }
  }

  back = () => {
    let path = `/vitri`;
    this.props.history.push({ pathname: path, state: {}});
  }

  afterSave = (resp) => {
    if(resp.status == true){
      let path = `/vitri`;
      this.props.history.push({ pathname: path, state: {}});
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
            Thông tin vị trí:
      </Typography>
          <Grid container spacing={3}>
           
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tên vị trí"
                name="ten_vitri"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.ten_vitri}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Ghi chú"
                name="mota"
                onChange={this.handleChangeInputText}
                type="text"
                value={this.state.mota}
                variant="outlined"
              />
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
    save: (value, after) => { dispatch(save(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
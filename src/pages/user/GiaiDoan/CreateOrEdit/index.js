import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { save } from './actions';
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
      Ten_GiaiDoan: "",
      Note:"",
      GiaiDoan:"addPage"
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/giaidoan"});
    }
    else{
      let GiaiDoan = this.props.route.location.state.GiaiDoan
      let Ten_GiaiDoan = this.props.route.location.state.Ten_GiaiDoan
      let Note = this.props.route.location.state.Note
      this.setState({
        GiaiDoan:GiaiDoan,
        Ten_GiaiDoan:Ten_GiaiDoan,
        Note:Note
      })

      console.log(GiaiDoan)
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
    const {GiaiDoan,Ten_GiaiDoan,Note} = this.state

    if(Ten_GiaiDoan == null || Ten_GiaiDoan == undefined || Ten_GiaiDoan == ""){
      toast("Không được để trống tên chiến dịch")
    }
    else{
      let value = {
        GiaiDoan:GiaiDoan,
        Ten_GiaiDoan:Ten_GiaiDoan,
        Note:Note
      }
      this.props.save(value,this.afterSave)
    }
  }
  

  back = () => {
    let path = `/giaidoan`;
    this.props.history.push({ pathname: path, state: {}});
  }

  afterSave = (resp) => {
    if(resp.status == true){
      let path = `/giaidoan`;
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
            Thông tin giai đoạn:
      </Typography>
          <Grid container spacing={3}>
           
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Tên giai đoạn:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="Ten_GiaiDoan" value = {this.state.Ten_GiaiDoan} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Ghi chú:</span>
            </Grid>
            <Grid item xs={2}>
              <input type="text" name="Note" value = {this.state.Note} onChange = {this.handleChangeInputText}/>
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
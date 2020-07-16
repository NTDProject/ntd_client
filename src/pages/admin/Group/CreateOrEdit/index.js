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
      ListPath: [],
      group_id:"",
      group_name:""
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/Group"});
    }
    else{
      let group_name = this.props.route.location.state.group_name
      let group_id = this.props.route.location.state.group_id
      this.setState({
        group_id :group_id,
        group_name:group_name
      })
      this.props.getData({group_id : group_id},this.after)
    }
  }
  

  save = () => {
    const {group_id, group_name, ListPath} = this.state

    if(group_name == null || group_name == undefined || group_name == ''){
      NotificationManager.error('Error', "Không được để trống tên nhóm quyền", 3000);
    }
    else if(ListPath.length < 1){
      NotificationManager.error('Error', "Phải chọn ít nhất 1 chức năng", 3000);
    }
    
    else{
      let value = {
        group_id:group_id,
        group_name:group_name,
        ListPath:ListPath
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

  after = (resp) => {
    console.log(resp)
    this.setState({
      ListPath: resp.ListPath,
      group_id :resp.GroupInfor.group_id,
      group_name:resp.GroupInfor.group_name
    })
  }

  

  

  back = () => {
    let path = "/Group"
    this.props.history.push({pathname:path});
  }

  handleChangeInputText= e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };

  handleChangeInputOnCell4 = value => {
    let path = this.state.ListPath
    path.map(yc => {
      if(yc.path_id == value._original.path_id){
        if(value._original.dem == 0){
          yc.dem = 1
        }
        else{
          yc.dem = 0
        }
      }
    })
    this.setState({
      ListPath: path
    })
  }

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <NotificationContainer />
        <div style={{ padding: "20px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin nhóm quyền
      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Tên nhóm quyền:</span>
            </Grid>
            <Grid item xs={5}>
              <input style = {{width:"100%"}} type="text" name="group_name" value = {this.state.group_name} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
        </div>

        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.ListPath}
          pageSize={this.state.ListPath.length>0?this.state.ListPath.length:5}
          columns={[
            {
              Header: "",
              accessor: "dem",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <input type = "checkbox" checked = {props.value > 0} id = {props.row._original.path_id} onClick = {() => this.handleChangeInputOnCell4(props.row)}/>
              </div>,
              width: 150
            },
            {
              Header: "Chức năng",
              accessor: "title",
              width: 500
            },
          ]}
          />

        <Divider />

        
        
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
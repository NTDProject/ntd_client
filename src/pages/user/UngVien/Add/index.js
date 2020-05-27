import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, save } from './actions';
import { Save } from '@material-ui/icons/';
import { Button, Grid, Typography, Divider } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
import DualListBox from 'react-dual-listbox';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


import "react-datepicker/dist/react-datepicker.css";
import 'react-dual-listbox/lib/react-dual-listbox.css';


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chiendich_id: "",
      UngVien: [],
      ViTriList: [],
      UngVienList:[]
    }
  }
  componentDidMount() {
    console.log(this.props.route.location.state)
    if(this.props.route.location.state == null){
      this.props.history.push({ pathname: "/UngVien"});
    }
    else{
      let chiendich_id = this.props.route.location.state.chiendich_id
      let ten_chiendich = this.props.route.location.state.ten_chiendich
      console.log("ten_chiendich",ten_chiendich)
      this.setState({
        chiendich_id: chiendich_id,
        ten_chiendich: ten_chiendich
      })

      this.props.getData({chiendich_id: chiendich_id}, this.after)
    }
  }


  after = (resp) => {
    console.log(resp)
    let a = []
    let uv = [...resp.ungvien]
    uv.map(u => {
      resp.vitri.map(v => {
        u[v.vitri_id.toString()] = 0
      })
      a.push(u)
    })

    console.log(a)
    
    this.setState({
      UngVien : a,
      UngVienList: resp.ungvien,
      ViTriList: resp.vitri
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
  handleChangeInputOnCell = (e,value) => {
    let UngVien = this.state.UngVien
    UngVien.map(u => {
      if(u.ungvien_id == value._original.ungvien_id){
          if(document.getElementById(e.target.name + "-" + value._original.ungvien_id).checked){
            u[e.target.name] = 1
          }
          else{
            u[e.target.name] = 0
          }
      }
    })
    this.setState({
      UngVien : UngVien
    })
  }

  save = () => {
    const UngVien = [...this.state.UngVien]
    const ViTri = [...this.state.ViTriList]
    const chiendich_id = this.state.chiendich_id
    ViTri.map(v=> {
      let ungvienpost = UngVien.filter(u => u[v.vitri_id] == 1)
      this.props.save({ungvien: ungvienpost, vitri_id: v.vitri_id, chiendich_id: chiendich_id}, this.afterSave)
    })
  }

  afterSave = (resp) => {
     if(resp.status){
      let path = "/UngVien"
      this.props.history.push({pathname:path,state:{resp}});
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
  }

  onChange = (e) => {
    console.log(e)
  }

  back = () => {
    let path = "/UngVien"
      this.props.history.push({pathname:path});
  }

  render() {
    const column = [
      {
        Header: "Tên",
        accessor: "tenungvien",
      },
      {
        Header: "Email",
        accessor: "email",
      }
    ]

    this.state.ViTriList.map(v => {
      column.push(
        {
          Header: v.ten_vitri,
          accessor:v.vitri_id.toString(),
          Cell: (props) => 
          <div style = {{textAlign: "center"}}>
            <input type = "checkbox" checked = {props.value > 0} name = {v.vitri_id } id = {v.vitri_id + "-" + props.row._original.ungvien_id} onClick = {(e ) => this.handleChangeInputOnCell(e,props.row)}/>
          </div>,
          width: 150
        }
      )
    })
    


    
    return (

      <div style={{ margin: "20px" }}>
        <NotificationContainer />
        <h2>Thêm ứng viên</h2>
        <ReactTable
          style = {{width: "98%", margin:"10px"}}
          showPagination={false}
          sortable={false}
          data={this.state.UngVien}
          columns={
            column
          }
          defaultPageSize={10}
          className="-striped -highlight"
        />
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
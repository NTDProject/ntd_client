import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { getData, saveCampaign, checkSaveCampaign, getDataYC } from './actions';
import { deleteData } from '../../UngVien/actions';
import { Save } from '@material-ui/icons/';
import { Button, Grid, Typography, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, MenuItem, Select  } from "@material-ui/core/";
import DatePicker from "react-datepicker";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Delete, Create, Details } from '@material-ui/icons/';
import "react-datepicker/dist/react-datepicker.css";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giaidoanhientai: "",
      giaidoansau:"",
      giaidoanhientai_id: "",
      giaidoansau_id:"",
      ngayBatDau: new Date(),
      ngayKetThuc: new Date(),
      tenChienDich: "",
      ListViTri: [],
      ListYeuCau: [],
      idChienDich: "",
      ListUV: [],
      open: false,
      vitriYeuCau: 0,
      vitri_id : 0,
      ListYeuCauChose:[],
      yeucau_id: 0,
      listSearch:[],
      listDownload:[]
    }
  }
  componentDidMount() {
    let value = this.props.route.location.state.id
    if(value== null){
      value = "addPage"
      
    }
    this.setState({
      idChienDich : value
    })
    this.props.getData(value,this.after)
  }

  handleChangeInputText3 = e => {

    let ListVitri = [...(this.state.ListViTri)]
    let value = e.target.value
    let listYeuCauChose = ListVitri.filter(vt => vt.vitri_id == value)
    console.log(listYeuCauChose)
    this.setState({
      vitri_id : value,
      ListYeuCauChose:   listYeuCauChose[0].yeucau.filter(yc => yc.checkYC > 0)
    });

  };

  handleChangeInputText4 = e => {

    let ListVitri = [...(this.state.ListViTri)]
    let value = e.target.value
    ListVitri.map(vt=>{
      if(vt.vitri_id == this.state.vitri_id){
        vt.yeucau.map(yc => {
          if(yc.yeucau_id == value){
            if(yc.checkYC >0){
              yc.checkYC = 0
            }
            else{
              yc.checkYC = 1
            }
          }
        })
      }
    })
    this.setState({
      ListViTri : ListVitri,
    });

  };

  handleChangeInputText2 = e => {
    let value = e.target.value
    this.setState({
      yeucau_id : value,
    });

  };

  after = (resp) => {
    let ngayBatDau = (resp.ngay_batdau.split("-"))
    let ngayKetThuc = (resp.ngay_ketthuc.split("-"))
    this.setState({
      tenChienDich: resp.ten_chiendich,
      ngayBatDau: new Date(ngayBatDau[0],ngayBatDau[1]-1,ngayBatDau[2]),
      ngayKetThuc: new Date(ngayKetThuc[0],ngayKetThuc[1]-1,ngayKetThuc[2]),
      giaidoanhientai: resp.giaidoanhientai,
      giaidoansau: resp.giaidoansau,
      giaidoanhientai_id: resp.giaidoanhientai_id,
      giaidoansau_id: resp.giaidoansau_id,
      ListViTri: resp.ListViTri,
      ListUV: resp.ListUV,
      listDownload:resp.ListUV
    })
    console.log(resp)
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
        vt.soluong = document.getElementById(value._original.vitri_id).value
      }
    })
    this.setState({
      ListViTri: viTri
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

  handleChangeInputOnCell3 = (e,value) => {
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
    const {tenChienDich, ngayBatDau, ngayKetThuc} = this.state
    let isAdd = this.state.idChienDich=="addPage"?true:false
    let canTuyen = 0

    this.state.ListViTri.map(vt => {
      if(vt.soluong != null && vt.soluong != undefined && vt.soluong != ''){
        canTuyen += vt.soluong;
      }
    })

    if(tenChienDich == null || tenChienDich == undefined || tenChienDich == ""){
      NotificationManager.error('Error', "Không được để trống tên chiến dịch", 3000);
    }
    else if(ngayBatDau == null || ngayBatDau == undefined || ngayBatDau == ''){
      NotificationManager.error('Error', "Không được để trống ngày bắt đầu", 3000);
    }
    else if(ngayKetThuc == null || ngayKetThuc == undefined || ngayKetThuc == ''){
      NotificationManager.error('Error', "Không được để trống ngày kết thúc", 3000);
    }
    else if(canTuyen <= 0){
      NotificationManager.error('Error', "Số lượng cần tuyển phải lớn hơn 0", 3000);
    }
    else{
      const{ngayBatDau, ngayKetThuc, tenChienDich, ListViTri, idChienDich} = this.state
      console.log(document.getElementById("ngay_batdau").value)
      let value = {
        chiendich_id: idChienDich,
        ten_chiendich: tenChienDich,
        ngay_batdau: document.getElementById("ngay_batdau").value,
        ngay_ketthuc: document.getElementById("ngay_ketthuc").value,
        trangthai:"",
        mota:"",
        ListViTri: ListViTri
      }

      this.props.checksave(value,this.afterCheckSave)
    }
  }

  editChienDich = (value) => {
    let path = `/UngVien/addOrEdit`;
    this.props.history.push({ pathname: path, state: value._original });
  }

    delete =   (value) => {
    console.log("aa", value._original)
    this.props.deleteData(value._original, this.afterDelete)
  }

  afterDelete = (resp) => {
    if(resp.status){
      NotificationManager.success('Success', resp.message, 3000);
      this.props.getData(this.state.chienDichId, this.after);
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
    
    this.props.getData(this.state.idChienDich,this.after)
  }

  afterCheckSave = (resp) => {
    const{ngayBatDau, ngayKetThuc, tenChienDich, ListViTri, idChienDich} = this.state
    let value = {
      chiendich_id: idChienDich,
      ten_chiendich: tenChienDich,
      ngay_batdau: document.getElementById("ngay_batdau").value,
        ngay_ketthuc: document.getElementById("ngay_ketthuc").value,
      trangthai:"",
      mota:"",
      ListViTri: ListViTri
    }
    if(!resp.status){
      NotificationManager.error('Error', resp.message, 3000);
    }
    else{
      this.props.save(value,this.afterSave)
      }
  }

  afterSave = (resp) => {
    if(resp.status){
      let path = `/campaign`;
      this.props.history.push({pathname:path,state:{resp}});
    }else{
      NotificationManager.error('Error', resp.message, 3000);
    }
    

  }

  tranfer = () => {
    const vitri = this.state.ListViTri.filter(v => v.soluong > 0);
    this.props.history.push({pathname:'/campaign/tranfer',state:{ListVitri: vitri, chiendich_id: this.state.idChienDich, giaidoanhientai: this.state.giaidoanhientai, giaidoansau: this.state.giaidoansau, giaidoanhientai_id: this.state.giaidoanhientai_id, giaidoansau_id: this.state.giaidoansau_id, ten_chiendich: this.state.tenChienDich}});
  }


  back = () => {
    let path = `/campaign`;
    this.props.history.push({pathname:path});
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  search = () => {
    let YeuCauSearch = []
    var inputs = document.getElementsByClassName('yeucau');
    for(var i = 0, l = inputs.length; i < l; ++i) {
      if(inputs[i].checked) {
        YeuCauSearch.push(inputs[i].id)

      }
    }

    this.props.getDataYC({chiendich_id: this.state.idChienDich, vitri_id: this.state.vitri_id, yeucau: YeuCauSearch}, this.afterSearch)
  }

  afterSearch = (resp) => {
    this.setState({
      ListUV: resp,
      listDownload:resp
    })
  }

  handleFilterChange = () => {
    const listDownload = this.selectTable.getResolvedState().sortedData;
    this.setState({
      listDownload:listDownload
    })
  }

  render() {
    const ListOptionVT = this.state.ListViTri.map(v => {
      return(
      <MenuItem value={v.vitri_id} key = {v.vitri_id}>{v.ten_vitri} </MenuItem>
      )
    })

    const ListOptionYC = this.state.ListYeuCauChose.map(y => {
      return(
        <div style = {{paddingTop:"15px"}}>
        <input type = "checkbox"  id = {y.yeucau_id} className = "yeucau"/>
        <label>{y.nd_yeucau} </label>
        </div>
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
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Tên chiến dịch:</span>
            </Grid>
            <Grid item xs={3}>
              <input type="text" name="tenChienDich" value = {this.state.tenChienDich} onChange = {this.handleChangeInputText}/>
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Ngày bắt đầu:</span>
            </Grid>
            <Grid item xs={3}>
              <DatePicker
              id = "ngay_batdau"
                name="ngayBatDau"
                selected={this.state.ngayBatDau}
                onChange={this.handleChangeNgayBatDau}
                dateFormat="dd/MM/yyyy"
              />
            </Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <span style={{ marginRight: "50px" }}>Ngày kết thúc:</span>
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                id = "ngay_ketthuc"
                name="ngayKetThuc"
                selected={this.state.ngayKetThuc}
                onChange={this.handleChangeNgayKetThuc}
                dateFormat="dd/MM/yyyy"
              />
            </Grid>
            <Grid item xs={2}></Grid>

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
              Header: "Tên",
              accessor: "ten_vitri",

            },
            {
              Header: "Yêu cầu",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <Button  variant="contained" color="secondary" onClick = {() => this.handleChangeInputOnCell2(props.row)}>Chỉnh sửa yêu cầu</Button>
              </div>

            },
            {
              Header: "Số lượng",
              accessor: "soluong",
              Cell: (props) => 
              <div style = {{textAlign: "center"}}>
                <input type = "number" id = {props.row._original.vitri_id} onBlur = {() => this.handleChangeInputOnCell(props.row)}  defaultValue = {props.value}/>
              </div>,
              width: 150
            },

           
            
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
          </Grid>
        </div>
        <Divider />
        <div style={{ padding: "20px" }}>
        <Typography variant="subtitle1" gutterBottom>
            Danh sách ứng viên :
          </Typography>
        <Grid container spacing={3} >
          <Grid item xs={4}>
          <Select
            style = {{width: "300px"}}
            value={this.state.chienDichId}
            input={<Input />}
            onChange={this.handleChangeInputText3}
          >
            {
                  ListOptionVT
            }
          </Select>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
          {
                  ListOptionYC
            }
          </Grid>

          <Grid item xs={3}></Grid>
          </Grid>
          <div style= {{paddingTop:"20px", paddingBottom:"20px"}}>
          <Button  variant="contained" color="secondary" onClick = {() => this.search()}>Tra cứu</Button>{' '}
          <ExcelFile element={<Button variant="contained" color="secondary">Download</Button>}>
                <ExcelSheet data={this.state.listDownload} name={"Ứng viên - " + this.state.ten_chiendich}>
                    <ExcelColumn label="Tên ứng viên" value="tenungvien"/>
                    <ExcelColumn label="Email" value="email"/>
                </ExcelSheet>
            </ExcelFile>
          </div>

        
          
          <Grid container spacing={3}>
          <ReactTable
          ref={(r) => {this.selectTable = r;}}
          style={{ width: "98%", margin: "10px" }}
          showPagination={true}
          sortable={false}
          data={this.state.ListUV}
          pageSizeDefault={10}
          onFilteredChange={this.handleFilterChange}
          defaultFilterMethod={
            (filter, row) =>
            filter.id in row ? row[filter.id].includes(filter.value) : true

          }
          columns={[
            {
              Header: "Tên ứng viên",
              accessor: "tenungvien",
              filterable: true,
            },
            {
              Header: "Email",
              accessor: "email",
              filterable: true,
            },
            {
              Header: "Chiến dịch",
              accessor: "ten_chiendich",
              filterable: true,
            },
            {
              Header: "Vị trí",
              accessor: "ten_vitri",
              filterable: true,
            },
            {
              Header: "Giai đoạn",
              accessor: "ten_giaidoan",
              filterable: true,
            },
            {
              Header: "Trạng thái",
              accessor: "trangthai",
              filterable: true,
            },
            {
              Header: "Thao tác",
              accessor: "ungvien_id",
              Cell: (props) =>
                <div style={{ textAlign: "center" }}>
                  <Delete onClick={() => this.delete(props.row)} />{' '}
                  <Create onClick={() => this.editChienDich(props.row)} />{' '}
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
        <Button variant="contained" color="secondary" onClick = {this.save}>
          <Save/>{' '}Lưu
        </Button> {' '}
        {/* <Button variant="contained" color="secondary" onClick = {this.tranfer}>
          Chuyển giai đoạn
        </Button>{' '} */}
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
      </div>

    );

  }
}


const mapStateToProps = (state) => {
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (value, after) => { dispatch(getData(value, after)) },
    getDataYC: (value, after) => { dispatch(getDataYC(value, after)) },
    save: (value, after) => { dispatch(saveCampaign(value, after)) },
    checksave: (value, after) => { dispatch(checkSaveCampaign(value, after)) },
    deleteData: (value, after) => { dispatch(deleteData(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
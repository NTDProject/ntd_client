import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {Divider,Grid,Button,TextField,Typography,Select,Input,MenuItem} from '@material-ui/core';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { getData } from '../../admin/Group/actions';
import { save } from './actions';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        phone:"",
        email:"",
        GroupList:[],
        group_id:""
    }
  }
  componentDidMount() {
      this.props.getDataGroup(this.after)
  }

  after = (resp) => {
    this.setState({
      GroupList: resp,
    })

  }

  handleChangeInputText = e => {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    });
  };

  handleChangeSelect = e => {
    let value = e.target.value
    this.setState({
      group_id : value,
    });

  };

  save = () => {
    const {name, phone, email, group_id} = this.state
    this.props.save({name: name, phone: phone, email: email, group_id: group_id}, this.afterSave)
  }

  afterSave = (resp) => {
    if (resp.errors) {
        resp.errors.forEach(e => {
          NotificationManager.error('Error', e.msg, 3000);
        });
      } else {
        NotificationManager.success('Success', 'Thông tin đăng ký của bạn đã được ghi nhận! Vui lòng truy cập gmail để xác nhận thông tin!', 3000);
      }
  }

  render() {
    const ListGroup = this.state.GroupList.map(g => {
        return(
        <MenuItem value={g.group_id} key = {g.group_id}>{g.group_name} </MenuItem>
        )
      })
    return (
        <div style={{ margin: "20px" }}>
        <NotificationContainer />
          <Typography variant="subtitle1" gutterBottom>
            Thông tin chung:
      </Typography>
          <Grid container spacing={3}>
              
                    <Grid item xs={2}>
                        <span>Username :</span>
                    </Grid>
                    <Grid item xs={4}>
                        <input style={{ width:"100%" }} type="text" name="name" value = {this.state.name} onChange = {this.handleChangeInputText}/>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    {/* <Grid item xs={2}>
                        <span>Số điện thoại :</span>
                    </Grid>
                    <Grid item xs={4}>
                        <input style={{ width:"100%" }} type="text" name="phone" value = {this.state.phone} onChange = {this.handleChangeInputText}/>
                    </Grid>
                    <Grid item xs={6}></Grid> */}
                    <Grid item xs={2}>
                        <span>Email :</span>
                    </Grid>
                    <Grid item xs={4}>
                        <input style={{ width:"100%" }} type="text" name="email" value = {this.state.email} onChange = {this.handleChangeInputText}/>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={2}>
                        <span>Email :</span>
                    </Grid>
                    <Grid item xs={4}>
                      <Select
                        style = {{width: "100%"}}
                        input={<Input />}
                        input={<Input style={{ width:"100%" }}/>}
                        onChange={this.handleChangeSelect}
                      >
                        {
                              ListGroup
                        }
                      </Select>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    </Grid>

                    <div style ={{textAlign: "center", margin: "20px"}}>
                        <Button variant="contained" color="secondary" onClick = {this.save}>
                         Đăng ký
                        </Button>{' '}
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
    getDataGroup: (value, after) => { dispatch(getData(value, after)) },
    save: (value, after) => { dispatch(save(value, after)) },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manager));
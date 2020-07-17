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
              
                    <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Username"
                          name="name"
                          onChange={this.handleChangeInputText}
                          type="text"
                          value={this.state.name}
                          variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
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
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                    <TextField
                    fullWidth
                    id="group_id"
                    name="group_id"
                    select
                    label="Nhóm quyền"
                    value={this.state.group_id}
                    onChange={this.handleChangeSelect}
                    variant="outlined"
                  >
                    {
                      ListGroup
                    }
                  </TextField>
                    </Grid>
                    <Grid item xs={7}></Grid>
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
import React, { Component } from 'react';
import { checkLogin } from './actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: '',
      txtPass: ''
    }
  }

  componentWillReceiveProps(nextProps) {
     var { history } = this.props;
      console.log(history);
    if (nextProps && nextProps.state.users) {
      var { users } = nextProps.state;

      if (users.success === false) {
        alert(users.msg);
      } else {       
        localStorage.setItem("session", JSON.stringify(users.data))
          history.push({ pathname: '/' })
    
      }

    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });

  }

  onSave = (e) => {
    e.preventDefault();
    var { txtName, txtPass } = this.state;
    let user = {
      username: txtName,
      password: txtPass
    }
    
    const { dispatch } = this.props
    dispatch(checkLogin(user))
  }

  render() {
    var { txtName, txtPass } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">


        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên Đăng Nhập: </label>
            <input type="text" className="form-control" name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Mật Khẩu: </label>
            <input type="password" className="form-control" name="txtPass"
              value={txtPass}
              onChange={this.onChange}
            />


          </div>



          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>

    );
  }
}


function mapStateToProps(state) {

  return {
    state
  }
}


export default withRouter(connect(mapStateToProps)(LoginPage));

import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'
import {
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import {CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import callApiUnAuth from '../../../utils/apis/apiUnAuth';
const schema = {
  // username: {
  //   presence: { allowEmpty: false, message: 'Tên tài khoản không được để trống !' },
  //   length: {
  //     maximum: 64
  //   }
  // },
  name: {
    presence: { allowEmpty: false, message: 'Tên đối tác không được để trống !' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'Email không được để trống !' },
    email: true
  },
  phone: {
    presence: { allowEmpty: false, message: 'Số điện thoại không được để trống !' },
    length: {
      minimum: 10,
      maximum: 11,
      message: 'Số dt không hợp lệ!'
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/change_pass.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  
  

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      username:JSON.parse(localStorage.getItem("username")).username
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();    
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? (event.target.checked ? 1 : 0)
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignUp = async event => {
    event.preventDefault();
    setFormState(formState => ({
      ...formState,
      isValid:false
    }))
    const result = await callApiUnAuth(`user/changpass`, 'POST', formState.values)
    console.log(result);
    if (result.data.errors) {
      result.data.errors.forEach(e => {
        NotificationManager.error('Error', e.msg, 3000);
        setFormState(formState => ({
          ...formState,
          isValid:true
        }))
      });
    } else {
      NotificationManager.success('Success', 'Thông tin đăng ký của bạn đã được ghi nhận! Vui lòng truy cập gmail để xác nhận thông tin!', 3000);
      setFormState({
        isValid: false,
        values: {
        },
        touched: {},
        errors: {}
      });
    }

  };

  const firstUpdate = useRef(true);
  const store = useSelector(state => state);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (store.partnerInfo.token.success === true) {
      localStorage.setItem("sessionpartner", JSON.stringify(store.partnerInfo));
      history.push('/partner');
    } else {
      NotificationManager.error('Error', store.partnerInfo.token.msg, 3000);
    }


  }, [store, history]);


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div style={{ margin: "20px" }}>
      <NotificationContainer />
              <div >
                <div>
                  <form
                    onSubmit={handleSignUp}
                  >
                    <div style={{ padding: "20px 10px 20px 10px", fontWeight: "bold" }}>
                      Chiến dịch tuyển dụng
                    </div>
                    <Grid container spacing={3}>
                    <Grid item xs={5}>
                  <TextField
                      error={hasError('username')}
                      fullWidth
                      disabled={true}
                      helperText={
                        hasError('username') ? formState.errors.username[0] : null
                      }
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.username}
                      variant="outlined"
                    />  
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                    <TextField
                      error={hasError('pass')}
                      fullWidth
                      helperText={
                        hasError('pass') ? formState.errors.pass[0] : null
                      }
                      label="Mật khẩu cũ"
                      name="pass"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.pass || ''}
                      variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                    <TextField
                      error={hasError('newpass')}
                      fullWidth
                      helperText={
                        hasError('newpass') ? formState.errors.newpass[0] : null
                      }
                      label="Mật khẩu mới"
                      name="newpass"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.newpass || ''}
                      variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5}>
                    <TextField
                      error={hasError('renewpass')}
                      fullWidth
                      helperText={
                        hasError('renewpass') ? formState.errors.renewpass[0] : null
                      }
                      label="Nhập lại mật khẩu mới"
                      name="renewpass"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.renewpass || ''}
                      variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={7}></Grid>
                    </Grid>

                    <div style ={{textAlign: "center", margin: "20px"}}>
                        <Button variant="contained" color="secondary" type="submit">
                          Đổi mật khẩu
                        </Button>{' '}
                    </div>
                  <Divider />
                  </form>
                </div>
              </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);

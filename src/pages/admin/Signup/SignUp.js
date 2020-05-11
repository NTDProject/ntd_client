import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'
import {
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
  address: {
    presence: { allowEmpty: false, message: 'Địa chỉ không được để trống !' },
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
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
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
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
      ship:1,
      description:'',
      city:1
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
    const result = await callApiUnAuth(`user/`, 'POST', formState.values)
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
          ship:1,
          description:'',
          city:1
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
    <div className={classes.root}>
      <NotificationContainer />
          <Grid
            className={classes.grid}
            container
          >
            <Grid
              className={classes.quoteContainer}
              item
              lg={5}
            >
              <div className={classes.quote}>
                <div className={classes.quoteInner}>
                  <Typography
                    className={classes.quoteText}
                    variant="h1"
                  >
                    Tạo tài khoản.
              </Typography>
                  <div className={classes.person}>
                    <Typography
                      className={classes.name}
                      variant="body1"
                    >
                      Thông tin mật khẩu sẽ được gửi về mail của trong thông tin đăng ký
                </Typography>
                    <Typography
                      className={classes.bio}
                      variant="body2"
                    >
                      
                </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              className={classes.content}
              item
              lg={7}
              xs={12}
            >
              <div className={classes.content}>
                <div className={classes.contentBody}>
                  <form
                    className={classes.form}
                    onSubmit={handleSignUp}
                  >
                    <Typography
                      className={classes.title}
                      variant="h2"
                    >
                      Tạo tài khoản
                </Typography>
                 
                    <TextField
                      className={classes.textField}
                      error={hasError('name')}
                      fullWidth
                      helperText={
                        hasError('name') ? formState.errors.name[0] : null
                      }
                      label="Username"
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.name || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError('phone')}
                      fullWidth
                      helperText={
                        hasError('phone') ? formState.errors.phone[0] : null
                      }
                      label="Số điện thoại"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      value={formState.values.phone || ''}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      helperText={
                        hasError('email') ? formState.errors.email[0] : null
                      }
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.email || ''}
                      variant="outlined"
                    />
                   

                    <Button
                      className={classes.signInButton}
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Đăng ký ngay
                </Button>
                   
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);

import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import callApiUnAuth from '../../../utils/apis/apiUnAuth';

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
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
    // display: 'flex',
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
    // display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    // flexBasis: 700,
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
  },
  contentText: {
    padding: '10px'
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const firstUpdate = useRef(true);
  const [isSubmit, setIsSubmit] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [signinResponse, setSigninResponse] = useState({});
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // console.log(isSubmit);
    const fetchData = async () => callApiUnAuth(`signin`, 'POST', { username: isSubmit.values.username, password: isSubmit.values.password })
      .then(res => setSigninResponse(res))
      .catch(error => setSigninResponse(error.response));
      fetchData();
  }, [isSubmit]);
  
  const handleSignUp = event => {    
    setIsSubmit(formState);
  };
  // const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if(signinResponse.status===200){
      localStorage.setItem("regPartner", JSON.stringify(signinResponse.data))
      // setRedirect(true);
    }
    
  }, [signinResponse])

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}

      >
        {/* {signinResponse} */}
        <div className={classes.content}>
          <div className={classes.contentHeader}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className={classes.contentBody}>
            <form
              className={classes.form}
            >
              <Typography
                className={classes.title}
                variant="h2"
              >
                Đăng ký
                </Typography>
              
              <Grid
                className={classes.socialButtons}
                container
              >
                <Grid
                  lg={3}
                  sm={6}
                  xl={6}
                  xs={6}
                  item
                >
                  <Typography
                align="center"
                className={classes.sugestion}
                color="textSecondary"
                variant="body1"
              >
                Xác thực tài khoản khách hàng của bạn để trở thành đối tác của chúng tôi !
                </Typography>
                  <div className={classes.contentText}>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      label="Tên đăng nhập"
                      name="username"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.username || ''}
                      variant="outlined"
                    />
                  </div>

                  <div className={classes.contentText}>
                    <TextField
                      className={classes.textField}
                      error={hasError('password')}
                      fullWidth
                      helperText={
                        hasError('password') ? formState.errors.password[0] : null
                      }
                      label="Mật khẩu"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password || ''}
                      variant="outlined"
                    />
                  </div>
                </Grid>

                <Grid
                  lg={3}
                  sm={6}
                  xl={6}
                  xs={6}
                  item
                >
                  
                </Grid>

                <Grid
                  lg={3}
                  sm={6}
                  xl={6}
                  xs={6}
                  item
                >
                  <div className={classes.contentText}>
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="button"
                      variant="contained"
                      onClick={handleSignUp}
                    >
                      Xác nhận
                </Button>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Bạn đã có tài khoản ?{' '}
                      <Link
                        component={RouterLink}
                        to="/partner/login"
                        variant="h6"
                      >
                        Đăng nhập
                  </Link>
                    </Typography>
                  </div>
                </Grid>
              </Grid>


            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
};



SignUp.propTypes = {
  history: PropTypes.object
};

export default SignUp;

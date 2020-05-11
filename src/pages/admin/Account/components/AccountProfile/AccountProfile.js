import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { useStore, useDispatch,useSelector } from 'react-redux';
import {updateImage} from '../../actions';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  // LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const [user, setUser] = useState({
    PartnerName: 'Anonymous',
    PartnerAddress: 'Locate',
    CityName: 'Locate',
    PartnerImage: '/images/avatars/avatar_11.png',
    PartnerDescription: ''
  });

  const store = useStore();
  useEffect(() => {
    setUser(store.getState().partnerInfo.token.user)
  }, [store]);
  const dispatch = useDispatch();
  const [uploadEnable, setUploadEnable] = useState(false);
  const handleChangeFile = file => {
    setUploadEnable(true);
    dispatch(updateImage({PartnerID: user.PartnerID,file:file.target.files[0]}))
    
  };
  const firstUpdate = useRef(true);
  const store2 = useSelector(state => state.partnerInfo.token.user.PartnerImage);
  useEffect(() => {    
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
     setUser(prevUser => ({
       ...prevUser,
       PartnerImage: store2
     }))   
     setUploadEnable(false);
    
  }, [store2]);
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.PartnerName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.PartnerAddress}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Thành phố :  {user.CityName}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {/* {moment().format('hh:mm A')} ({user.timezone}) */}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.PartnerImage}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">
            {/* Profile Completeness: 70% */}
            {user.PartnerDescription}
          </Typography>
          {/* <LinearProgress
            value={70}
            variant="determinate"
          /> */}
        </div>
      </CardContent>
      <Divider />
      <CardActions>

        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          onChange={handleChangeFile}
          type="file"
          disabled={uploadEnable}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" color="primary" className={classes.uploadButton} disabled={uploadEnable}>
            Upload
          </Button>
        </label>
        {/* <Button variant="text">Remove picture</Button> */}
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;

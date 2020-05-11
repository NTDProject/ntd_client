import React, { useState, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { updatePartner } from '../../actions';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const useStyles = makeStyles(() => ({
  root: {}
}));
const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    PartnerName: 'Shen',
    PartnerAddress: 'Zhi',
    PartnerEmail: 'shen.zhi@devias.io',
    PartnerPhone: '0123456789',
    PartnerDescription: 'Alabama',
    CityName: 'USA'
  });

  const [city, setCity] = useState([]);
  
  const store = useStore().getState().partnerInfo;
  useEffect(() => {
    setValues({
      PartnerID: store.token.user.PartnerID,
      PartnerName: store.token.user.PartnerName,
      PartnerAddress: store.token.user.PartnerAddress,
      PartnerEmail: store.token.user.PartnerEmail,
      PartnerPhone: store.token.user.PartnerPhone,
      PartnerDescription: store.token.user.PartnerDescription,
      CityName: store.token.user.CityName,
      ship: store.token.user.ship
    })
    
    setCity(store.city.data)    
  }, [store]);
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]:  
        event.target.type === 'checkbox'
          ? (event.target.checked ? 1 : 0)
          : event.target.value
    });
  };
  const dispatch = useDispatch();
  const handleChangeInfo = () => {
    city.forEach(e => {
      if (e.CityName === values.CityName) {
        values.CityID = e.CityID;
        delete values.CityName;
      }
    });
    dispatch(updatePartner(values));
    NotificationManager.success('Success', 'Done !', 3000);
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <NotificationContainer />
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="!@#$%^&*()_+"
          title="Thông tin đối tác"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText=""
                label="Tên cửa hàng"
                margin="dense"
                name="PartnerName"
                onChange={handleChange}
                required
                value={values.PartnerName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="PartnerEmail"
                onChange={handleChange}
                required
                value={values.PartnerEmail}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Địa chỉ"
                margin="dense"
                name="PartnerAddress"
                onChange={handleChange}
                required
                value={values.PartnerAddress}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Thành Phố"
                margin="dense"
                name="CityName"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.CityName}
                variant="outlined"
              >
                {city.map(option => (
                  <option
                    key={option.CityID}
                    value={option.CityName}
                  >
                    {option.CityName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Số điện thoại"
                margin="dense"
                name="PartnerPhone"
                onChange={handleChange}
                type="number"
                required
                value={values.PartnerPhone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    name="ship" checked={values.ship===0 ? false : true}
                    onChange={handleChange}
                  />
                }
                label="Giao hàng"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mô tả"
                margin="dense"
                name="PartnerDescription"
                onChange={handleChange}
                value={values.PartnerDescription}
                variant="outlined"
                multiline={true}
                rows={4}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleChangeInfo}
          >
            Lưu
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;

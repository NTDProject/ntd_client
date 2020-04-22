import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from '../../../../../theme/palette';

import {  options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const data = {
    labels: props.listVT,
    datasets: [
      {
        label: 'Trúng tuyển',
        backgroundColor: palette.primary.main,
        data: props.listVTTT
      },
      {
        label: 'Nhu cầu',
        backgroundColor: palette.neutral,
        data: props.listVTNC
      }
    ]
  };
  return (

    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Tỷ lệ trúng tuyển / nhu cầu theo vị trí"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;

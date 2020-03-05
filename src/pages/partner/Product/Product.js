import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { ProductsTable, ProductsToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Product = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Product;

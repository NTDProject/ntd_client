import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';
import { getData2 } from './actions';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    LatestSales,
    UsersByDevice,
    LatestProducts,
    LatestOrders
} from './components';


class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sumUngVien: 0,
          sumChienDich: 0,
          Pass: 0,
          passPerSum: 0,
          process: 0,
          false: 0,
          sumCost:0
        }
      }
      componentDidMount() {
        this.props.getData(this.after);
      }
    
    
    
      after = (resp) => {
        console.log(resp)
        this.setState({
          sumUngVien: resp.sumUngVien,
          sumChienDich: resp.sumChienDich,
          pass: resp.pass / resp.sumUngVien *100,
          process: resp.process / resp.sumUngVien *100,
          false: (resp.sumUngVien - resp.process - resp.pass) / resp.sumUngVien *100,
          passPerSum: resp.pass / resp.sumUngVien *100,
          listVT: resp.listVT,
          listVTTT:resp.listVTTT,
          listVTNC:resp.listVTNC,
          sumCost:resp.chiphi
        })
    
      }

    useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(4)
        }
    }));
   

    render() {
        

        return (

            <div className={this.useStyles.root}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Budget value = {this.state.sumChienDich}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalUsers value = {this.state.sumUngVien}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TasksProgress value = {this.state.passPerSum}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <TotalProfit value = {this.state.sumCost}/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <LatestSales listVT = {this.state.listVT} listVTTT={this.state.listVTTT} listVTNC={this.state.listVTNC}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <UsersByDevice pass = {this.state.pass} false = {this.state.false} process = {this.state.process}/>
                    </Grid>
                    
                </Grid>
            </div>

        );

    }
}


const mapStateToProps = (state) => {
    return {
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getData: (after) => { dispatch(getData2(after)) },
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
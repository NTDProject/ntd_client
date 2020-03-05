import React, { useEffect, useState, useRef, forwardRef } from 'react';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  Add
} from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, deleteProduct, updateProduct } from '../../actions';
import ProductAdd from '../ProductAdd';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  dialogContent: {
    overflowX: 'hidden',
    overflowY: 'hidden'
  }
}));

const UsersTable = () => {
  const classes = useStyles();
  const columns = [
    { title: 'Avatar', field: 'ItemImage', render: rowData => <img src={rowData.ItemImage} alt={rowData.ItemName} style={{ width: 40, borderRadius: '50%' }} /> },
    { title: 'Tên sản phẩm', field: 'ItemName' },
    { title: 'Mô tả', field: 'description' },
    { title: 'Trạng thái', field: 'StatusName' },
  ];
  const [data, setData] = useState([]);
  const count = useSelector(state => state);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const firstUpdate = useRef(true);

  useEffect(() => {
    dispatch(fetchProduct('partner0000000000001'));
  }, [dispatch]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setData(count.product.data);
    setIsLoading(false);
  }, [count]);

  const handleDelete = (rowData) => {
    dispatch(deleteProduct(rowData.ItemID));
  }
 
  const [values, setValues] = useState({
    ItemID: '',
    ItemName: '',
    description: '',
    ItemImage: '',
    StatusID:''
  });

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleEdit = (rowData) => {
    setValues(rowData)
    setOpen(true);
  }

  const handleAdd = (rowData) => {
    // setValues(rowData)
    console.log(1);
    ProductAdd.setOpen(true);
    setOpenAdd(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeFile = file => {
    setValues({
      ...values,
      ItemImage: file[0].name
    })
  };
  const handleAccept = () => {
    console.log(values);
    dispatch(updateProduct(values));
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <div>
            <MaterialTable
              title="Sản Phẩm"
              columns={columns}
              data={data}
              icons={tableIcons}
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Sửa',
                  onClick: (event, rowData) => handleEdit(rowData)
                },
                {
                  icon: DeleteOutline,
                  tooltip: 'Xóa',
                  onClick: (event, rowData) => handleDelete(rowData)
                },
                rowData => ({
                  icon: Add,
                  tooltip: 'Thêm',
                  onClick: (event, rowData) => handleAdd(rowData),
                  hidden: rowData.StatusID !==1
                })
              ]}
              options={{
                actionsColumnIndex: -1,
                exportButton: true
              }}
            />

            <Dialog
              fullWidth={true}
              maxWidth={'sm'}
              scroll={'body'}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">{"Thông tin sản phẩm"}</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      helperText=""
                      label="Tên sản phẩm"
                      margin="dense"
                      name="ItemName"
                      onChange={handleChange}
                      required
                      value={values.ItemName}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      helperText=""
                      label="Mô tả"
                      margin="dense"
                      name="description"
                      onChange={handleChange}
                      required
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <DropzoneArea
                      onChange={handleChangeFile}
                      acceptedFiles={['image/*']}
                      filesLimit={1}
                      dropzoneText={'Ảnh sản phẩm'}
                      showPreviews={true}
                      showPreviewsInDropzone={false}
                      initialFiles={[]}
                    />
                    <img src={values.ItemImage} alt={values.ItemName} style={{ width: 40, borderRadius: '50%' }} />
                  </Grid>

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Huỷ
          </Button>
                <Button onClick={handleAccept} color="primary" autoFocus>
                  Xác nhận
          </Button>
              </DialogActions>
            </Dialog>
             {/* Dialog add */}
              <ProductAdd open={openAdd} />
          </div>

        )}
    </div>
  );
};

export default UsersTable;

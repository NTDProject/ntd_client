import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

  const Campaign = Loadable({
    loader: () => import("../../pages/user/Campaign"),
    loading: MyLoadingComponent
  });

  const CampaignCreateOrEdit = Loadable({
    loader: () => import("../../pages/user/Campaign/CreateOrEdit"),
    loading: MyLoadingComponent
  });

  const CampaignTranfer = Loadable({
    loader: () => import("../../pages/user/Campaign/Tranfer"),
    loading: MyLoadingComponent
  });

  const UngVienCreateOrEdit = Loadable({
    loader: () => import("../../pages/user/UngVien/CreateOrEdit"),
    loading: MyLoadingComponent
  });

  const UngVien = Loadable({
    loader: () => import("../../pages/user/UngVien"),
    loading: MyLoadingComponent
  });

  const AddUngVien = Loadable({
    loader: () => import("../../pages/user/UngVien/Add"),
    loading: MyLoadingComponent
  });
const routes = {
  Campaign: {
          path: '/campaign',
          exact: true,
          component: Campaign,
          private: true
      },

  CampaignCreateOrEdit: {
          path: '/campaign/addOrEdit',
          exact: true,
          component: CampaignCreateOrEdit,
          private: true
      },
  UngVien: {
        path: '/UngVien',
        exact: true,
        component: UngVien,
        private: true
    },
    UngVienCreateOrEdit: {
      path: '/UngVien/addOrEdit',
      exact: true,
      component: UngVienCreateOrEdit,
      private: true
  },
  AddUngVien: {
    path: '/UngVien/add',
    exact: true,
    component: AddUngVien,
    private: true
},
CampaignTranfer: {
  path: '/Campaign/tranfer',
  exact: true,
  component: CampaignTranfer,
  private: true
},


  };
  

export default routes;
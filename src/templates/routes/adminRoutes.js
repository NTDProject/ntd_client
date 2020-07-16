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

const UngVienCreate = Loadable({
  loader: () => import("../../pages/user/UngVien/Create"),
  loading: MyLoadingComponent
});

const UngVien = Loadable({
  loader: () => import("../../pages/user/UngVien"),
  loading: MyLoadingComponent
});

const Group = Loadable({
  loader: () => import("../../pages/admin/Group"),
  loading: MyLoadingComponent
});

const GroupCreateOrEdit= Loadable({
  loader: () => import("../../pages/admin/Group/CreateOrEdit"),
  loading: MyLoadingComponent
});

const Analysis = Loadable({
  loader: () => import("../../pages/admin/HomePage"),
  loading: MyLoadingComponent
});

const Cost = Loadable({
  loader: () => import("../../pages/user/Cost"),
  loading: MyLoadingComponent
});

const CostAdd = Loadable({
  loader: () => import("../../pages/user/Cost/CreateOrEdit"),
  loading: MyLoadingComponent
});

const AddUngVien = Loadable({
  loader: () => import("../../pages/user/UngVien/Add"),
  loading: MyLoadingComponent
});

const GiaiDoan = Loadable({
  loader: () => import("../../pages/user/GiaiDoan"),
  loading: MyLoadingComponent
});

const GiaiDoanAdd = Loadable({
  loader: () => import("../../pages/user/GiaiDoan/CreateOrEdit"),
  loading: MyLoadingComponent
});
const YeuCau = Loadable({
  loader: () => import("../../pages/user/YeuCau"),
  loading: MyLoadingComponent
});

const YeuCauAdd = Loadable({
  loader: () => import("../../pages/user/YeuCau/CreateOrEdit"),
  loading: MyLoadingComponent
});
const ViTri = Loadable({
  loader: () => import("../../pages/user/ViTri"),
  loading: MyLoadingComponent
});
const ViTriAdd = Loadable({
  loader: () => import("../../pages/user/ViTri/CreateOrEdit"),
  loading: MyLoadingComponent
});
const LoginPage = Loadable({
  loader: () => import("../../pages/admin/Login"),
  loading: MyLoadingComponent
});
const Signup = Loadable({
  loader: () => import("../../pages/admin/Signup"),
  loading: MyLoadingComponent
});

const ChangePass = Loadable({
  loader: () => import("../../pages/admin/ChangePass"),
  loading: MyLoadingComponent
});



const routes = {
  ChangePass: {
    path: '/changepass',
    exact: true,
    component: ChangePass,
    private: true
  },
  Signup: {
    path: '/signup',
    exact: true,
    component: Signup,
    private: true
  },
  ViTriAdd: {
    path: '/vitriadd',
    exact: true,
    component: ViTriAdd,
    private: true
  },
  ViTri: {
    path: '/vitri',
    exact: true,
    component: ViTri,
    private: true
  },
  GiaiDoanAdd: {
    path: '/giaidoanadd',
    exact: true,
    component: GiaiDoanAdd,
    private: true
  },
  GiaiDoan: {
    path: '/giaidoan',
    exact: true,
    component: GiaiDoan,
    private: true
  },
  YeuCauAdd: {
    path: '/yeucauadd',
    exact: true,
    component: YeuCauAdd,
    private: true
  },
  YeuCau: {
    path: '/yeucau',
    exact: true,
    component: YeuCau,
    private: true
  },
  Cost: {
    path: '/cost',
    exact: true,
    component: Cost,
    private: true
  },
  CostAdd: {
    path: '/costadd',
    exact: true,
    component: CostAdd,
    private: true
  },
  Analysis: {
    path: '/',
    exact: true,
    component: Analysis,
    private: true
  },
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
  Group:{
    path: '/Group',
    exact: true,
    component: Group,
    private: true
  },
  GroupCreateOrEdit:{
    path: '/Group/CreateOrEdit',
    exact: true,
    component: GroupCreateOrEdit,
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
  UngVienCreate: {
    path: '/UngVien/Create',
    exact: true,
    component: UngVienCreate,
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
  LoginPage: {
    path: '/',
    exact: true,
    component: 
        (localStorage.getItem("session") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0) 
            ? Analysis 
            : LoginPage
    ),
    private: false
}

};


export default routes;
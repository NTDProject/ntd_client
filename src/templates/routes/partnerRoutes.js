import Loadable from "react-loadable";
import MyLoadingComponent from "../../components/LoadingComponent";

const HomePage = Loadable({
  loader: () => import("../../pages/partner/HomePage"),
  loading: MyLoadingComponent
});

const AccountPage = Loadable({
  loader: () => import("../../pages/partner/Account"),
  loading: MyLoadingComponent
});

const ProductPage = Loadable({
  loader: () => import("../../pages/partner/Product"),
  loading: MyLoadingComponent
});

const LoginPage = Loadable({
  loader: () => import("../../pages/partner/SignIn"),
  loading: MyLoadingComponent
});

const SignUpPage = Loadable({
  loader: () => import("../../pages/partner/SignUp"),
  loading: MyLoadingComponent
});

const routes = {
  AccountPage: {
    path: '/partner/account',
    exact: true,
    component: AccountPage,
    private: true,
    layout: 'PartnerLayout'
  },
  ProductPage: {
    path: '/partner/product',
    exact: true,
    component: ProductPage,
    private: true,
    layout: 'PartnerLayout'
  },
  HomePage: {
    path: '/partner',
    exact: true,
    component: HomePage,
    private: true,
    layout: 'PartnerLayout'
  },
  LoginPage: {
    path: '/partner/login',
    exact: true,
    component:
      (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
        ? HomePage
        : LoginPage
      ),
    private: false,
    layout: 'LoginLayout'
  },
  SignUpPage: {
    path: '/partner/sign-up',
    exact: true,
    component:
      (localStorage.getItem("sessionpartner") && ((new Date(JSON.parse(localStorage.getItem("session")).expires) - new Date()) >= 0)
        ? HomePage
        : SignUpPage
      ),
    private: false,
    layout: 'LoginLayout'
  }
};

export default routes;
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";
import filter from "./filter";
import axios from "axios";
import qs from "qs";
import "u-reset.css";
import {
  DatePicker,
  Radio,
  Alert,
  Select,
  Space,
  Empty,
  Tag,
  Tabs,
  Button,
  Form,
  Input,
  Icon,
  Checkbox,
  Layout,
  Breadcrumb,
  Menu,
  Drawer,
  Dropdown,
  Cascader,
  Table,
  Pagination,
  Modal,
  Divider,
  Row,
  Col,
  Upload,
  Card,
  InputNumber,
  Descriptions,
  Badge,
  Popconfirm,
  ConfigProvider,
  Avatar,
} from "ant-design-vue";

Vue.use(Avatar);
Vue.use(Popconfirm);
Vue.use(Badge);
Vue.use(Descriptions);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(Cascader);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Empty);
Vue.use(Space);
Vue.use(ConfigProvider);
Vue.use(Select);
Vue.use(Alert);
Vue.use(Radio);
Vue.use(DatePicker);

Vue.use(VueRouter);

Object.keys(filter).forEach((ele) => {
  Vue.filter(ele, filter[ele]);
});

Vue.prototype.$qs = qs;

Vue.prototype.$api = axios;
Vue.prototype.baseURL = "https://dev.qtscm.net/cxa/ever/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

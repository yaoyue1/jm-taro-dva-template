import Taro, { Component, Config } from "@tarojs/taro";
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import "./utils/fxTaroInit.js"
import "./utils/request";
import Index from "./pages/index";
import dva from './utils/dva'
import models from './models'
import './app.scss'
import { globalData } from "./utils/common";


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();


class App extends Component<{}, {}> {
  config: Config = {
    pages: [
      'pages/index/index', // 首页
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
    // tabBar: {
    // color: "#666666",
    // selectedColor: "#FD0133",
    // backgroundColor: "#FFFFFF",
    // borderStyle: "white",
    // list: [
    //   {
    //     pagePath: 'pages/find/find',
    //     text: '发现',
    //     iconPath: './images/icons/find.png',
    //     selectedIconPath: './images/icons/find-select.png'
    //   },
    //   {
    //     pagePath: 'pages/schemeList/schemeList',
    //     text: '方案库',
    //     iconPath: './images/icons/plan.png',
    //     selectedIconPath: './images/icons/plan-select.png'
    //   },
    //   {
    //     pagePath: "pages/mine/mine",
    //     text: "我的",
    //     iconPath: "./images/icons/me.png",
    //     selectedIconPath: "./images/icons/me-select.png"
    //   }
    // ]
    // }
  };

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @author xiangxiang
   * @memberof App
   */
  async componentDidMount() {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo;
    const query = this.$router.params.query;
    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));

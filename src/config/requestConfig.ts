
import index from '../pages/index/config'
import components from '../components/config'
/** 
 * 请求的公共参数
 */
export const conmomPrams = {}

/**
 * 请求映射文件
 */
export const requestConfig = {
  loginUrl: '/wechat/auth', // 微信登录接口
  ...components,
  ...index
}
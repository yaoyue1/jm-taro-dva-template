import Taro from '@tarojs/taro';
import Api from './request'
import Tips from './tips'

/**
 * 支付
 * data {
 * product_id: '',	商品ID
 * num: '', 购买数量  默认1
 * type: '' 下单类型  1微信购买  2小红花购买  3微信拿样  4小红花拿样 
 * }
 */

export const pay = async (data) => {
  Tips.loading('请稍后…')
  // 1.开通会员的服务支付
  if (data.isOpenVip) {
    const res = await VipOpen(data)
    return await wxPay(res) // 支付
  }

  // 2.购买商品订单流程 订单创建
  let res = await OrderCreate(data)

  try {
    // 无订单号 直接返回
    if (!res.data || !res.data.order_sn) {
      Tips.toast('订单初始化失败！')
      throw new Error('no order_sn')
    }

    // 微信购买和微信拿样 || 小红花购买和小红花拿样
    Tips.loaded()
    const result = (data.type === 1 || data.type === 3) ? await wxPay(res) : res
    return result
  } catch (error) {
    Tips.loaded()
    throw new Error('payFail')
  }
}

const OrderCreate = async (data) => {
  return await Api.orderCreated({
    method: 'POST',
    ...data
  })
}

const VipOpen = async (data) => {
  return await Api.openVip({
    method: 'POST',
    ...data
  })
}

const wxPay = async (orderRes) => {
  Tips.loaded()
  try {
    await Taro.requestPayment({
      ...orderRes.data.pay_sign
    })
    return orderRes
  } catch (error) {
    throw error
  }
}

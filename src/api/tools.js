import request from "@/utils/request"

export const captcha =()=> {
    return request({
      url: '/tools/captcha',
      method: 'get',
    })
}

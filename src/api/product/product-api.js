
import request from '@/utils/request'
import axios from 'axios'

const productApi = {

}

/**
 * 获取商品分页列表
 * @param data
 * @returns {AxiosPromise}
 */
productApi.getPageList = data => {
  return request({
    url: '/commodity/getPageList',
    method: 'post',
    data
  })
}

/**
 * 获取商品分页列表 根据device id
 * @param data
 * @returns {AxiosPromise}
 */
productApi.getPageListBydid = (data, did) => {
  return request({
    url: '/commodity/getPageListBydid/' + did,
    method: 'post',
    data
  })
}

/**
 * 商品详情
 * @param data
 * @returns {AxiosPromise}
 */
productApi.detail = id => {
  return request({
    url: '/commodity/info/' + id,
    method: 'get'
  })
}

/**
 * 新增商品
 * @param data
 * @returns {AxiosPromise}
 */
productApi.add = data => {
  return request({
    url: '/commodity/add',
    method: 'post',
    data
  })
}

/**
 * 修改商品
 * @param data
 * @returns {AxiosPromise}
 */
productApi.update = data => {
  return request({
    url: '/commodity/update',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param data
 * @returns {AxiosPromise}
 */
productApi.delete = id => {
  return request({
    url: '/commodity/delete/' + id,
    method: 'post'
  })
}

/**
 * 复制商品
 * @param data
 * @returns {AxiosPromise}
 */
productApi.copy = (did, data) => {
  return request({
    url: '/commodity/copy/' + did,
    method: 'post',
    data
  })
}

/**
 * 上传图片
 * @param data
 * @returns {AxiosPromise}
 */
productApi.upload = data => {
  console.log(data.get('token'), '=-==========')
  return axios({
    method: 'post',
    // todo 地址需要修改
    // url: 'http://api.nykuajing.com:8888/api/commodity/upload',
    url: 'http://116.62.196.62:8888/api/commodity/upload',
    // 利用 transformRequest 进行转换配置
    // transformRequest: [
    //   function(){
    //     // console.log(oldData)
    //     const formdata = data.entries()
    //     let done = true;
    //     let newStr = ''
    //     do {
    //         const result = formdata.next()
    //         done = result.done
    //         if (result.value) {
    //           newStr += encodeURIComponent(result.value[0]) + '=' + encodeURIComponent(result.value[1]) + '&'
    //         }
    //     } while (!done);

    //     newStr = newStr.slice(0, -1)
    //     return newStr
    //   }
    // ],
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}


export default productApi

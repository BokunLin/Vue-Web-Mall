import axios from './axios'

export function signup({
  name,
  pw,
  nick
}) {
  return axios.post('/web/signup', {
    name,
    pw,
    nick
  })
}

export function login({
  name,
  pw
}) {
  return axios.post('/web/login', {
    name,
    pw
  })
}

export function loginOut() {
  return axios.get('/web/login');
}
//帽子轮播
export function getcap(tags) {
  return axios.get('/web/getListByName', {
    params: {
      tags
    }
  });
}
//主页banner
export function heightBanner() {
  return axios.get('/web/banner');
}
//详情页传id
export function postID(id) {
  return axios.post('/web/Product', {
    params: {
      id
    }
  })
}
//购物车传数据
export function add(id, count = 1) {
  return axios.post('/web/cart', {
    id,
    count
  })
}

//获取主页中间三个
export function getNewproduct() {
  return axios.get('/web/getNewProducts');
}

export function getListByTag({
  tags,
  page
}) {
  return axios.get('/web/getListByName', {
    params: {
      tags,
      page
    }
  });
}

export function getProvinces() {
  return axios.get('/web/provinces');
}

export function getCities(val) {
  return axios.get('/web/cities', {
    params: {
      val
    }
  });
}

export function getAreas(val) {
  return axios.get('/web/areas', {
    params: {
      val
    }
  });
}

export function getStreets(val) {
  return axios.get('/web/streets', {
    params: {
      val
    }
  });
}

export function getProvincesLabel(val) {
  return axios.get('/web/provinces/getLabel', {
    params: {
      val
    }
  });
}

export function getCitiesLabel(val) {
  return axios.get('/web/cities/getLabel', {
    params: {
      val
    }
  });
}

export function getAreasLabel(val) {
  return axios.get('/web/areas/getLabel', {
    params: {
      val
    }
  });
}

export function getStreetsLabel(val) {
  return axios.get('/web/streets/getLabel', {
    params: {
      val
    }
  });
}

export function getAddress() {
  return axios.get('/web/address');
}

export function subAddress(data) {
  return axios.post('/web/address', {
    data
  });
}

export function editAddress(data) {
  return axios.post('/web/address/edit', {
    data
  });
}

export function removeAddress(id) {
  return axios.post('/web/address/remove', {
    id
  });
}

export function getProduct(id) {
  return axios.get('/web/getProduct', {
    params: {
      id
    }
  })
}

export function getCar() {
  return axios.get('/web/getCar');
}

export function addToCar(product, count = 1) {
  return axios.post('/web/addToCar', {
    product,
    count
  })
}

export function removeCar(id) {
  return axios.get('/web/removeCar', {
    params: {
      id
    }
  })
}

export function subOrder({ snapShoot, address, total }) {
  return axios.post('/web/order', { snapShoot, address, total })
}

export function getOrder() {
  return axios.get('/web/order');
}

export function getSnapShoot(id) {
  return axios.get('/web/snapShoot', { params: { id } })
}

export function changeOrderState(id) {
  return axios.post('/web/order/confirm', { id })
}

export function removeOrder(id) {
  return axios.post('/web/order/remove', { id })
}
import axios from './axios'

export function signup({
  name,
  pw,
  nick
}) {
  return axios.post('/api/signup', {
    name,
    pw,
    nick
  })
}

export function login({
  name,
  pw
}) {
  return axios.post('/api/login', {
    name,
    pw
  })
}

export function loginOut() {
  return axios.get('/api/login');
}
//帽子轮播
export function getcap(tags) {
  return axios.get('/api/getListByName', {
    params: {
      tags
    }
  });
}
//主页banner
export function heightBanner() {
  return axios.get('/api/banner');
}
//详情页传id
export function postID(id) {
  return axios.post('/api/Product', {
    params: {
      id
    }
  })
}
//购物车传数据
export function add(id, count = 1) {
  return axios.post('/api/cart', {
    id,
    count
  })
}

//获取主页中间三个
export function getNewproduct() {
  return axios.get('/api/getNewProducts');
}

export function getListByTag({
  tags,
  page
}) {
  return axios.get('/api/getListByName', {
    params: {
      tags,
      page
    }
  });
}

export function getProvinces() {
  return axios.get('/api/provinces');
}

export function getCities(val) {
  return axios.get('/api/cities', {
    params: {
      val
    }
  });
}

export function getAreas(val) {
  return axios.get('/api/areas', {
    params: {
      val
    }
  });
}

export function getStreets(val) {
  return axios.get('/api/streets', {
    params: {
      val
    }
  });
}

export function getProvincesLabel(val) {
  return axios.get('/api/provinces/getLabel', {
    params: {
      val
    }
  });
}

export function getCitiesLabel(val) {
  return axios.get('/api/cities/getLabel', {
    params: {
      val
    }
  });
}

export function getAreasLabel(val) {
  return axios.get('/api/areas/getLabel', {
    params: {
      val
    }
  });
}

export function getStreetsLabel(val) {
  return axios.get('/api/streets/getLabel', {
    params: {
      val
    }
  });
}

export function getAddress() {
  return axios.get('/api/address');
}

export function subAddress(data) {
  return axios.post('/api/address', {
    data
  });
}

export function editAddress(data) {
  return axios.post('/api/address/edit', {
    data
  });
}

export function removeAddress(id) {
  return axios.post('/api/address/remove', {
    id
  });
}

export function getProduct(id) {
  return axios.get('/api/getProduct', {
    params: {
      id
    }
  })
}

export function getCar() {
  return axios.get('/api/getCar');
}

export function addToCar(product, count = 1) {
  return axios.post('/api/addToCar', {
    product,
    count
  })
}

export function removeCar(id) {
  return axios.get('/api/removeCar', {
    params: {
      id
    }
  })
}

export function subOrder({ snapShoot, address }) {
  return axios.post('/api/order', { snapShoot, address })
}

export function getOrder() {
  return axios.get('/api/order');
}

export function getSnapShoot(id) {
  return axios.get('/api/snapShoot', { params: { id } })
}

export function changeOrderState(id) {
  return axios.post('/api/order/confirm', { id })
}

export function removeOrder(id) {
  return axios.post('/api/order/remove', { id })
}
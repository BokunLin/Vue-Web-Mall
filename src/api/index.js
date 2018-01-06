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

export function test() {
  return axios.get('/api/getNewProducts')
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

export function getCar(){
  return axios.get('/api/getCar');
}

export function addToCar(product, count = 1) {
  return axios.post('/api/addToCar', { product, count })
}

export function removeCar(id) {
  return axios.get('/api/removeCar', { params: { id } })
}
import axios from 'axios';
import * as Config from '../../constants/Config';


export default function callApiAuthWithHeader(endpoint, method = 'GET', header) {
  let token = JSON.parse(localStorage.getItem("session")).token;
  if (header != null) {
    header.authorization = `Bearer ${token}`;
  } else {
    header = { 'authorization': `Bearer ${token}` };
  }
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    headers: header
  }).catch(err => {
  });
}

export function callApiAuthWithBody(endpoint, method = 'GET', body) {
  let token = JSON.parse(localStorage.getItem("session")).token;
  let uc = JSON.parse(localStorage.getItem("session")).uid;
  body.uc = uc;  
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: { 'authorization': `Bearer ${token}` }
  }).catch(err => {
  });
}
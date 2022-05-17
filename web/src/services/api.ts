import axios, { Method } from 'axios';
import { toast } from 'material-react-toastify';
import { getAuth } from '../utils/storage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;

export function apiGet(
  url: string,
  callback: ApiCallback | Simplecallback,
): void {
  apiRequest(url, null, 'GET', callback);
}

export function apiPost(
  url: string,
  body: any,
  callback: ApiCallback | Simplecallback,
): void {
  apiRequest(url, body, 'POST', callback);
}

export function apiPut(
  url: string,
  body: any,
  callback: ApiCallback | Simplecallback,
): void {
  apiRequest(url, body, 'PUT', callback);
}

export function apiDelete(
  url: string,
  callback: ApiCallback | Simplecallback,
): void {
  apiRequest(url, null, 'DELETE', callback);
}

function apiRequest(
  url: string,
  body: any,
  method: Method,
  callback: ApiCallback | Simplecallback,
) {
  let call = callback as ApiCallback;
  if (!instanceOfApiCallback(call)) call = { then: callback } as ApiCallback;

  const auth = getAuth();
  if (auth) api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;

  api
    .request({ url, method, data: body })
    .then(res => call.then(res.data))
    .catch(err => {
      const message = getMessage(err);
      toast.error(message);
      if (call.catch) call.catch();
    })
    .finally(() => {
      if (call.finally) call.finally();
    });
}

function getMessage(err: any): string | undefined {
  let { message } = err;

  if (message === 'Network Error') return 'O Servidor não foi encontrado!';

  if (message === 'Request failed with status code 404')
    return 'O Endereço não foi encontrado!';

  message = err.response.data.message;

  if (err.response.data.message === 'Invalid JWT token')
    return 'A sua sessão expirou, saia e entre de novo!';

  return message;
}

export interface ApiCallback {
  then: (data: any) => void;
  catch?: () => void;
  finally?: () => void;
}

type Simplecallback = (data: any) => void;

function instanceOfApiCallback(data: any): data is ApiCallback {
  return !('name' in data);
}

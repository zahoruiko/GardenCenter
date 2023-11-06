import axios from '../axios';
import { isJson } from './checkJson';

export const sendPostRequest = async (targetUrl: string, data: any) => {
  if (!targetUrl) return false;
  if (!isJson(data)) return false;
  const stringifiedJson = JSON.stringify(data);
  await axios
    .post(targetUrl, stringifiedJson, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    .then(console.log)
    .catch(console.error);
};

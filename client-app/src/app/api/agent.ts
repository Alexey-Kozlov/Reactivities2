import { act } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import { resolve } from 'dns';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});
const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.post<T>(url).then(responseBody)
}

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const Activities = {
    list: () => request.get<IActivity[]>('/GetActivity'),
    detail: (id: string) => request.get<IActivity>(`/GetActivity/${id}`),
    create: (activity: IActivity) => request.post<void>(`/CreateActivity`, activity),
    edit: (activity: IActivity) => request.post<void>(`EditActivity/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`DeleteActivity/${id}`)
}

const agent = { 
    Activities
}

export default agent; 
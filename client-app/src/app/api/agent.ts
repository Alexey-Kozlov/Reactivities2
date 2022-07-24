import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IActivity } from '../models/activity';
import { ServerError } from '../models/serverError';
import { store } from '../stores/store';

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    if (typeof data === 'string') {
        toast.error(data);
    } else {
        const errorData: string[] = (data as any).errors;
        switch (status) {
            case 400:
                if (config.method === 'get' && errorData.hasOwnProperty('id')) {
                    history.push('/not-found');
                }
                if (errorData) {
                    const errorsList = [];
                    for (const key in errorData) {
                        if (errorData[key]) {
                            errorsList.push(errorData[key]);
                        }
                    }
                    throw errorsList.flat();
                }
                break;
            case 401:
                toast.error('Неавторизовано');
                break;
            case 404:
                history.push('/not-found');
                break;
            case 500:
                store.commonStore.setServerErros(data as ServerError);
                history.push('/server-error');
                break;
        }
    }
    return Promise.reject(error);
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
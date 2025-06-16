import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FetchResponse {
    data: any;
    loading: boolean;
    error: string | null;
    getRequest: (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    postRequest: (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    putRequest: (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    deleteRequest: (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
}

const BASE_URL = window.location.origin;

const useFetch = (): FetchResponse => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = async (url: string, method: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => {
        setLoading(true);
        try {
            let response;
            if (method === 'GET') {
                response = await fetch(`${BASE_URL}${url}`);
            } else {
                response = await fetch(`${BASE_URL}${url}`, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                });
            }
            if (!response.ok) {
                if(response.status === 401) {
                    navigate('/login');
                    throw new Error('Unauthorized');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            const responseData = await response.json();
            setData(responseData);
            onSuccess(responseData);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            onError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    const getRequest = async (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => {
        await fetchData(url, 'GET', null, onSuccess, onError);
    }
    
    const postRequest = async (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => {
        await fetchData(url, 'POST', data, onSuccess, onError);
    }

    const putRequest = async (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => {
        await fetchData(url, 'PUT', data, onSuccess, onError);
    }
    
    const deleteRequest = async (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => {
        await fetchData(url, 'DELETE', null, onSuccess, onError);
    }

    return { data, loading, error, getRequest, postRequest, putRequest, deleteRequest };
}

export default useFetch;
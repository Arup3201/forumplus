import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FetchResponse {
    data: any;
    loading: boolean;
    error: string | null;
    getRequest: (url: string) => Promise<void>;
    postRequest: (url: string, data: any) => Promise<void>;
    putRequest: (url: string, data: any) => Promise<void>;
    deleteRequest: (url: string) => Promise<void>;
}

const BASE_URL = window.location.origin;

const useFetch = (): FetchResponse => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = async (url: string, method: string, data: any) => {
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
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    const getRequest = async (url: string) => {
        return await fetchData(url, 'GET', null);
    }
    
    const postRequest = async (url: string, data: any) => {
        return await fetchData(url, 'POST', data);
    }

    const putRequest = async (url: string, data: any) => {
        return await fetchData(url, 'PUT', data);
    }
    
    const deleteRequest = async (url: string) => {
        return await fetchData(url, 'DELETE', null);
    }

    return { data, loading, error, getRequest, postRequest, putRequest, deleteRequest };
}

export default useFetch;
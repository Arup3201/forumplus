interface FetchResponse {
    data: any;
    loading: boolean;
    error: string | null;
    getRequest: (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    postRequest: (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    putRequest: (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    patchRequest: (url: string, data: any, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
    deleteRequest: (url: string, onSuccess: (data: any) => void, onError: (error: string) => void) => Promise<void>;
};

export type { FetchResponse };
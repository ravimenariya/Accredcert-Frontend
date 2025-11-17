import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import type { BlogPost } from "@shared/schema";

interface Service {
    _id: string;
    [key: string]: any;
}

interface Certificate {
    _id: string;
    [key: string]: any;
}

interface AppContextType {
    services: Service[];
    callservices: () => Promise<void>;
    blogs: BlogPost[];
    callblogs: () => Promise<void>;
    certificates: Certificate[];
    callcertificates: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const Backend_url = import.meta.env.VITE_BACKEND_URL;

interface ContextProps {
    children: ReactNode;
}

const Context = ({ children }: ContextProps) => {
    const [services, setServices] = useState<Service[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    const callservices = async () => {
        try {
            const response = await axios.get(`${Backend_url}/user/getservices`);
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
        }
    };

    // Fetch blogs
    const callblogs = async () => {
        try {
            const response = await axios.get(`${Backend_url}/user/getblogs`);
            setBlogs(response.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    const callcertificates = async () => {
        try {
            const response = await axios.get(
                `${Backend_url}/user/getcertificates`,
            );
            setCertificates(response.data);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        }
    };

    // Initial load
    useEffect(() => {
        callservices();
        callblogs();
        callcertificates();
    }, []);

    return (
        <AppContext.Provider
            value={{
                services,
                callservices,
                blogs,
                callblogs,
                certificates,
                callcertificates,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default Context;

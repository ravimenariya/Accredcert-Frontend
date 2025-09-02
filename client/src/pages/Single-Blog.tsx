// src/pages/single-blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";
import { useRoute } from "wouter";

const SingleBlog = () => {
    const [match, params] = useRoute("/blog/:id");
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogNotFound, setBlogNotFound] = useState(false);
    const [error, setError] = useState(null);
    const id = params?.id;

    const Backend_url =
        import.meta.env.VITE_BACKEND_URL ;

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setBlogNotFound(true);
            return;
        }

        const fetchBlog = async () => {
            setLoading(true);
            setBlogNotFound(false);
            setError(null);
            try {
                const response = await axios.get(
                    `${Backend_url}/user/getblog/${id}`,
                );
                setBlog(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setBlogNotFound(true);
                } else {
                    setError(err.message || "An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    return (
        <>
            {loading && (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-lg font-semibold text-gray-700">
                        Loading...
                    </div>
                </div>
            )}

            {blogNotFound && (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-lg font-semibold text-gray-500">
                        Blog not found. nahi mila
                        <p>
                            <a
                                href="/blogs"
                                className="text-blue-500 underline"
                            >
                                Go back to blogs
                            </a>
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-lg font-semibold text-red-600">
                        Error: {error}
                    </div>
                </div>
            )}

            {blog && !loading && !blogNotFound && (
                <div className="container mx-auto max-w-4xl p-4 md:p-8 ">
                    <div className="w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
                        <div className="Header flex content-center mt-8">
                            <Link href="/blogs" className="mr-8 ml-4 mt-2">
                                <img
                                    className="h-8 mb-3" // Reduced from h-10 mb-4
                                    src="https://static.vecteezy.com/system/resources/previews/017/784/917/non_2x/left-arrow-icon-on-transparent-background-free-png.png"
                                />
                            </Link>
                            <div>
                                <h1 className="mb-3 text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                                    {blog.title}
                                </h1>
                                <div className="mb-3 font-medium text-green-600">
                                    <span className="text-xs uppercase tracking-wide">
                                        Author:{" "}
                                    </span>
                                    <span className="text-gray-600">
                                        {blog.author}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="h-80 w-full object-cover"
                        />
                        <div className="p-6 md:p-10">
                            <p className="mb-4 text-base leading-relaxed text-gray-700">
                                {blog.description}
                            </p>

                            <div className="prose max-w-none leading-relaxed text-gray-800">
                                <p>{blog.body}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleBlog;

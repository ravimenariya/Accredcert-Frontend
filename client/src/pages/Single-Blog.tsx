// src/pages/single-blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";
import { useRoute } from "wouter";
import SEO from "@/components/seo";

const SingleBlog = () => {
    const [match, params] = useRoute("/blog/:id");
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [blogNotFound, setBlogNotFound] = useState(false);
    const [error, setError] = useState<any>(null);
    const id = params?.id;

    const Backend_url =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

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
            } catch (err: any) {
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
                <div className="flex min-h-screen items-center justify-center section-gradient">
                    <div className="text-lg font-semibold text-gray-700" data-animate="reveal">
                        Loading...
                    </div>
                </div>
            )}

            {blogNotFound && (
                <div className="flex min-h-screen items-center justify-center section-gradient">
                    <div className="text-lg font-semibold text-gray-500" data-animate="reveal">
                        Blog not found.
                        <p className="mt-4">
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
                <div className="flex min-h-screen items-center justify-center section-gradient">
                    <div className="text-lg font-semibold text-red-600" data-animate="reveal">
                        Error: {error}
                    </div>
                </div>
            )}

            {blog && !loading && !blogNotFound && (
                <div className="container mx-auto max-w-4xl p-4 md:p-8 section-gradient min-h-screen relative overflow-hidden">
                    <SEO 
                        title={blog.title}
                        description={blog.description}
                        keywords={`${blog.category}, AccredCert blog, FDA compliance update`}
                        ogImage={blog.imageUrl}
                        ogTitle={blog.title}
                        ogDescription={blog.description}
                    />
                    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float-y pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-float-x pointer-events-none" />
                    
                    <div className="w-3xl overflow-hidden rounded-lg bg-white shadow-xl surface-glass relative z-10" data-animate="reveal">
                        <div className="Header flex content-center mt-8" data-animate="reveal">
                            <Link href="/blogs" className="mr-8 ml-4 mt-2">
                                <img
                                    className="h-8 mb-3" // Reduced from h-10 mb-4
                                    src="https://static.vecteezy.com/system/resources/previews/017/784/917/non_2x/left-arrow-icon-on-transparent-background-free-png.png"
                                    alt="Back"
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
                            data-animate="parallax"
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="h-96 w-full object-cover"
                        />
                        <div className="p-6 md:p-10">
                            <p className="mb-4 text-base leading-relaxed text-gray-700 font-semibold border-l-4 border-blue-500 pl-4">
                                {blog.description}
                            </p>

                            <div className="prose max-w-none leading-relaxed text-gray-800">
                                <p className="whitespace-pre-line">{blog.body}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleBlog;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Home Component
const Home = () => (
  <div className="p-4 max-w-2xl mx-auto text-left">
    <h1 className="text-white text-3xl font-bold mb-4">Welcome to Surya's Blogging Website</h1>
    <p className="text-lg mb-4">Share your thoughts, read amazing blogs, and connect with others.</p>
    <Link className="bg-blue-200 px-4 py-2 rounded" to="/create">Create Your First Blog</Link>
  </div>
);

// Blog List Component with improved UI
const BlogList = ({ blogs, deleteBlog, openBlog }) => (
  <div className="p-4 max-w-4xl mx-auto text-left">
    <h1 className="text-3xl font-bold mb-6 text-center">Recent Blogs</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
          <img src={blog.image} alt="" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-3">
              <Link to={`/blog/${blog.id}`} className="text-blue-500">Read More</Link>
              <button className="text-red-500" onClick={() => deleteBlog(blog.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Create Blog Component
const CreateBlog = ({ addBlog, title, setTitle, image, setImage, content, setContent }) => (
  <div className="p-4 max-w-2xl mx-auto text-left">
    <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
    <input className="border p-2 mb-4 w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" />
    <input className="border p-2 mb-4 w-full" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
    <textarea className="border p-2 mb-4 w-full" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Blog Content" />
    <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={addBlog}>Add Blog</button>
  </div>
);

// Edit Blog Component
const EditBlog = ({ blogs, updateBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [image, setImage] = useState(blog ? blog.image : "");
  const [content, setContent] = useState(blog ? blog.content : "");

  const navigate = useNavigate();

  const handleEdit = () => {
    const updatedBlog = { ...blog, title, image, content };
    updateBlog(updatedBlog);
    navigate(`/blogs`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-left">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <input className="border p-2 mb-4 w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" />
      <input className="border p-2 mb-4 w-full" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <textarea className="border p-2 mb-4 w-full" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Blog Content" />
      <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={handleEdit}>Save Changes</button>
    </div>
  );
};

// View Blog Component (Shows full content, and allows likes & views increment)
const ViewBlog = ({ blogs, incrementViews, likeBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  useEffect(() => {
    if (blog) {
      incrementViews(blog.id); // Increment views when page is loaded
    }
  }, [blog, incrementViews]);

  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto text-left">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt="" className="w-full h-60 object-cover mt-4" />
      <p className="mt-4">{blog.content}</p>
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => likeBlog(blog.id)}>
          Like ({blog.likes})
        </button>
        <p>Views: {blog.views}</p>
      </div>
    </div>
  );
};

// Blog Overlay for Viewing (When modal is triggered)
const BlogOverlay = ({ blog, onClose, likeBlog, incrementViews }) => {
  useEffect(() => {
    incrementViews(blog.id); // Increment views when the modal is opened
  }, [blog.id, incrementViews]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <img src={blog.image} alt="" className="w-full h-60 object-cover mt-2" />
        <p className="mt-4">{blog.content}</p>
        <div className="flex justify-between mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => likeBlog(blog.id)}>
            Like ({blog.likes})
          </button>
          <p>Views: {blog.views}</p>
        </div>
        <button className="mt-4 text-red-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Header Component
export const Header = () => (
  <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full shadow-md">
    <ul className="flex justify-center space-x-6">
      <li><Link className="text-white hover:text-gray-300" to="/">Home</Link></li>
      <li><Link className="text-white hover:text-gray-300" to="/blogs">Blogs</Link></li>
      <li><Link className="text-white hover:text-gray-300" to="/create">Create Blog</Link></li>
    </ul>
  </nav>
);

const BlogApp = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  const saveToLocalStorage = (blogs) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  };

  const addBlog = () => {
    const newBlog = {
      id: Date.now(),
      title,
      image,
      content,
      views: 0,
      likes: 0,
      comments: [],
    };
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
    setTitle("");
    setImage("");
    setContent("");

    toast.success('Blog added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);

    toast.error('Blog deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
  };

  const incrementViews = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, views: blog.views + 1 } : blog
    );
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
  };

  const likeBlog = (id) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
    );
    setBlogs(updatedBlogs);
    saveToLocalStorage(updatedBlogs);
  };

  const openBlog = (blog) => {
    setCurrentBlog(blog);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Router>
      <Header />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList blogs={blogs} deleteBlog={deleteBlog} openBlog={openBlog} />} />
          <Route path="/create" element={<CreateBlog addBlog={addBlog} title={title} setTitle={setTitle} image={image} setImage={setImage} content={content} setContent={setContent} />} />
          <Route path="/edit/:id" element={<EditBlog blogs={blogs} updateBlog={updateBlog} />} />
          <Route path="/blog/:id" element={<ViewBlog blogs={blogs} incrementViews={incrementViews} likeBlog={likeBlog} />} />
        </Routes>
      </div>

      {isOverlayOpen && currentBlog && (
        <BlogOverlay blog={currentBlog} onClose={closeOverlay} likeBlog={likeBlog} incrementViews={incrementViews} />
      )}

      <ToastContainer />
    </Router>
  );
};

export default BlogApp;

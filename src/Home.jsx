import React from 'react'

const Home = () => (
    <div className="p-4 max-w-2xl mx-auto text-left">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Blogging Website</h1>
      <p className="text-lg mb-4">Share your thoughts, read amazing blogs, and connect with others.</p>
      <Link className="bg-blue-200 text-white px-4 py-2 rounded" to="/create">Create Your First Blog</Link>
    </div>
  );
  

export default Home

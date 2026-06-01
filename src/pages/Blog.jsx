import React, { useState, useEffect } from "react";
import { useSEO } from "@/lib/useSEO";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "IQ Basics", "Science & Research", "Test Tips", "Brain Health", "Child Development", "Career & Success"];

export default function Blog() {
  useSEO({ title: 'IQ & Intelligence Blog', description: 'Science-backed articles on intelligence, IQ testing, cognitive performance, brain health, and child development from the Academic IQ Test team.' });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    base44.entities.BlogPost.filter({ is_published: true }, "-created_date", 100)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.find(p => p.is_featured);
  const filtered = posts.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.excerpt || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && (!featured || p.id !== featured.id || category !== "All" || search);
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/Home">
            <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png" alt="Academic IQ" className="h-10 w-10 object-contain" />
          </Link>
          <Link to="/IQTest">
            <button className="bg-[#F5921B] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-[#e0830f] transition-colors">
              Take the IQ Test
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#0C3547] mb-3">IQ & Intelligence Blog</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Science-backed articles on intelligence, IQ testing, and cognitive performance.</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0C3547]"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-[#0C3547] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#0C3547]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : (
          <>
            {/* Featured post */}
            {featured && category === "All" && !search && (
              <Link to={`/Blog/${featured.slug}`} className="block mb-10">
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow">
                  {featured.banner_image_url && (
                    <img src={featured.banner_image_url} alt={featured.title} className="w-full md:w-96 h-56 md:h-auto object-cover" />
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-[#F5921B] uppercase tracking-wide mb-2">{featured.category} · Featured</span>
                    <h2 className="text-2xl font-black text-[#0C3547] mb-3">{featured.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{featured.read_time_minutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Link key={post.id} to={`/Blog/${post.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    {post.banner_image_url && (
                      <img src={post.banner_image_url} alt={post.title} className="w-full h-44 object-cover" />
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-[#F5921B] uppercase tracking-wide mb-2">{post.category}</span>
                      <h3 className="text-base font-bold text-[#0C3547] mb-2 leading-snug">{post.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                        <span>{post.read_time_minutes} min read</span>
                        {post.views > 0 && <><span>·</span><span>{post.views} views</span></>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-16">No articles found.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Clock, ArrowLeft, Tag, Share2, ChevronRight } from "lucide-react";
import Footer from "@/components/home/Footer";
import ReactMarkdown from "react-markdown";

export default function BlogArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const all = await base44.entities.BlogPost.filter({ is_published: true }, "-created_date", 100);
      const found = (all || []).find(p => p.slug === slug);
      if (!found) { navigate("/Blog"); return; }
      setPost(found);
      // Increment view count
      base44.entities.BlogPost.update(found.id, { views: (found.views || 0) + 1 }).catch(() => {});
      // Related posts (same category, excluding current)
      const rel = (all || []).filter(p => p.id !== found.id && p.category === found.category).slice(0, 3);
      setRelated(rel.length ? rel : (all || []).filter(p => p.id !== found.id).slice(0, 3));
      // SEO
      document.title = `${found.title} | Academic IQ Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", found.meta_description || found.excerpt || "");
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-lg">Loading article...</div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/Home">
            <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png" alt="Academic IQ" className="h-10 w-10 object-contain" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#0C3547]">
            <Link to="/Home" className="hover:text-[#F5921B] transition-colors">Home</Link>
            <Link to="/Blog" className="hover:text-[#F5921B] transition-colors">Blog</Link>
          </nav>
          <Link to="/IQTest">
            <button className="bg-[#F5921B] text-white px-5 py-2 text-sm font-bold rounded-md hover:bg-[#e0830f] transition-colors">
              Take IQ Test
            </button>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Link to="/Blog" className="hover:text-[#F5921B] flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate">{post.category}</span>
        </div>
      </div>

      {/* Article Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {post.category && (
          <span className="inline-block bg-[#F5921B]/10 text-[#F5921B] text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-black text-[#0C3547] leading-tight mb-4">{post.title}</h1>
        <p className="text-gray-500 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
          <span className="font-medium text-gray-600">{post.author || "Academic IQ Team"}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.read_time_minutes || 8} min read</span>
          {post.views > 0 && <span>{post.views.toLocaleString()} views</span>}
          <button
            onClick={() => { navigator.share?.({ title: post.title, url: window.location.href }) || navigator.clipboard?.writeText(window.location.href); }}
            className="ml-auto flex items-center gap-1 text-[#0C3547] hover:text-[#F5921B] transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Banner Image */}
      {post.banner_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <img
            src={post.banner_image_url}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="prose prose-lg max-w-none prose-headings:text-[#0C3547] prose-headings:font-bold prose-a:text-[#F5921B] prose-strong:text-[#0C3547]">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#0C3547] to-[#1a5c7a] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Ready to Discover Your IQ?</h3>
          <p className="text-blue-100 mb-6">Take our scientifically-designed IQ test and get your certified score in under 30 minutes.</p>
          <Link to="/IQTest">
            <button className="bg-[#F5921B] hover:bg-[#e0830f] text-white font-bold px-8 py-3 rounded-xl transition-colors text-lg">
              Take the Free IQ Test →
            </button>
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#0C3547] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/Blog/${p.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  {p.banner_image_url && (
                    <img src={p.banner_image_url} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="p-4">
                    <h4 className="font-bold text-[#0C3547] group-hover:text-[#F5921B] transition-colors line-clamp-2">{p.title}</h4>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock className="w-3 h-3" />{p.read_time_minutes || 8} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const posts = await base44.entities.BlogPost.filter({ slug, is_published: true }, "-created_date", 1);
      const article = posts[0];
      if (article) {
        setPost(article);
        document.title = article.title + " | Academic IQ Blog";
        // Update view count
        base44.entities.BlogPost.update(article.id, { views: (article.views || 0) + 1 });
        // Load related
        const rel = await base44.entities.BlogPost.filter({ is_published: true }, "-created_date", 20);
        setRelated(rel.filter(p => p.id !== article.id && p.category === article.category).slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center text-gray-400">Article not found.</div>;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
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

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
          <Link to="/Blog" className="hover:text-[#0C3547]">Blog</Link>
          <span>›</span>
          <span className="text-gray-500">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#0C3547] mb-4 leading-tight">{post.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          <span className="font-medium text-[#F5921B]">{post.category}</span>
          <span>·</span>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.read_time_minutes} min read</span>
          {post.views > 0 && <><span>·</span><span>{post.views} views</span></>}
        </div>

        {/* Banner */}
        {post.banner_image_url && (
          <img src={post.banner_image_url} alt={post.title} className="w-full rounded-xl mb-8 object-cover max-h-80" />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-[#0C3547] prose-a:text-[#F5921B]">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 bg-[#0C3547] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-black mb-2">Ready to Test Your IQ?</h3>
          <p className="text-blue-200 text-sm mb-5">Take our 30-question scientifically validated IQ assessment and get your score in minutes.</p>
          <Link to="/IQTest">
            <button className="bg-[#F5921B] text-white px-8 py-3 rounded-md font-bold hover:bg-[#e0830f] transition-colors">
              Start Free IQ Test
            </button>
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#0C3547] mb-5">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/Blog/${r.slug}`}>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                    {r.banner_image_url && <img src={r.banner_image_url} alt={r.title} className="w-full h-28 object-cover rounded-lg mb-3" />}
                    <p className="text-sm font-bold text-[#0C3547] leading-snug">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{r.read_time_minutes} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link to="/Blog" className="text-sm text-[#0C3547] font-medium hover:underline">← Back to Blog</Link>
        </div>
      </main>
    </div>
  );
}
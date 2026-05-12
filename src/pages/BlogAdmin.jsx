import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, X, Save, ExternalLink } from "lucide-react";

const CATEGORIES = ["IQ Basics", "Science & Research", "Test Tips", "Brain Health", "Child Development", "Career & Success"];
const EMPTY_POST = {
  title: "", slug: "", excerpt: "", meta_description: "", meta_keywords: "",
  banner_image_url: "", category: "IQ Basics", author: "Academic IQ Team",
  read_time_minutes: 8, content: "", is_published: true, is_featured: false, tags: []
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list, object = edit form
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await base44.entities.BlogPost.list("-created_date", 200);
    setPosts(data || []);
    setLoading(false);
  }

  function openNew() { setEditing({ ...EMPTY_POST }); setTagInput(""); }
  function openEdit(post) { setEditing({ ...post }); setTagInput(""); }
  function cancel() { setEditing(null); }

  async function save() {
    if (!editing.title || !editing.slug || !editing.content) return alert("Title, slug, and content are required.");
    setSaving(true);
    if (editing.id) {
      await base44.entities.BlogPost.update(editing.id, editing);
    } else {
      await base44.entities.BlogPost.create(editing);
    }
    setSaving(false);
    setEditing(null);
    loadPosts();
  }

  async function togglePublish(post) {
    await base44.entities.BlogPost.update(post.id, { is_published: !post.is_published });
    loadPosts();
  }

  async function toggleFeatured(post) {
    // Unfeature others if featuring this one
    if (!post.is_featured) {
      const featured = posts.filter(p => p.is_featured && p.id !== post.id);
      await Promise.all(featured.map(p => base44.entities.BlogPost.update(p.id, { is_featured: false })));
    }
    await base44.entities.BlogPost.update(post.id, { is_featured: !post.is_featured });
    loadPosts();
  }

  async function deletePost(post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await base44.entities.BlogPost.delete(post.id);
    loadPosts();
  }

  function autoSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !(editing.tags || []).includes(t)) {
      setEditing(e => ({ ...e, tags: [...(e.tags || []), t] }));
    }
    setTagInput("");
  }

  if (editing) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={cancel} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            <h1 className="font-bold text-[#0C3547] text-lg">{editing.id ? "Edit Article" : "New Article"}</h1>
          </div>
          <div className="flex items-center gap-3">
            {editing.id && editing.slug && (
              <a href={`/Blog/${editing.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#F5921B]">
                <ExternalLink className="w-4 h-4" /> Preview
              </a>
            )}
            <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-[#F5921B] hover:bg-[#e0830f] text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-60">
              <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Article"}
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide">Article Content</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title *</label>
                <input
                  value={editing.title}
                  onChange={e => setEditing(d => ({ ...d, title: e.target.value, slug: d.slug || autoSlug(e.target.value) }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                  placeholder="e.g. What Is IQ? A Complete Guide"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Slug (URL) *</label>
                <input
                  value={editing.slug}
                  onChange={e => setEditing(d => ({ ...d, slug: autoSlug(e.target.value) }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#F5921B]"
                  placeholder="e.g. what-is-iq"
                />
                <p className="text-xs text-gray-400 mt-1">URL: /Blog/{editing.slug || "..."}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Excerpt (shown in card)</label>
                <textarea
                  value={editing.excerpt}
                  onChange={e => setEditing(d => ({ ...d, excerpt: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B] h-20 resize-none"
                  placeholder="2-3 sentence summary of the article..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Content * (Markdown supported)</label>
                <textarea
                  value={editing.content}
                  onChange={e => setEditing(d => ({ ...d, content: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B] h-80 resize-y font-mono text-xs"
                  placeholder="Write your article in Markdown..."
                />
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide">SEO Settings</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Description (150-160 chars recommended)</label>
                <textarea
                  value={editing.meta_description}
                  onChange={e => setEditing(d => ({ ...d, meta_description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B] h-20 resize-none"
                  placeholder="SEO meta description for search engines..."
                />
                <p className={`text-xs mt-1 ${(editing.meta_description || "").length > 160 ? "text-red-400" : "text-gray-400"}`}>
                  {(editing.meta_description || "").length}/160
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Keywords (comma-separated)</label>
                <input
                  value={editing.meta_keywords}
                  onChange={e => setEditing(d => ({ ...d, meta_keywords: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                  placeholder="IQ test, intelligence quotient, cognitive ability..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide">Settings</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                <select
                  value={editing.category}
                  onChange={e => setEditing(d => ({ ...d, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Author</label>
                <input
                  value={editing.author}
                  onChange={e => setEditing(d => ({ ...d, author: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Read Time (minutes)</label>
                <input
                  type="number" min="1" max="60"
                  value={editing.read_time_minutes}
                  onChange={e => setEditing(d => ({ ...d, read_time_minutes: parseInt(e.target.value) || 8 }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500">Published</label>
                <button onClick={() => setEditing(d => ({ ...d, is_published: !d.is_published }))}
                  className={`w-10 h-5 rounded-full transition-colors ${editing.is_published ? "bg-green-500" : "bg-gray-300"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${editing.is_published ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500">Featured</label>
                <button onClick={() => setEditing(d => ({ ...d, is_featured: !d.is_featured }))}
                  className={`w-10 h-5 rounded-full transition-colors ${editing.is_featured ? "bg-[#F5921B]" : "bg-gray-300"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${editing.is_featured ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide">Banner Image</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Image URL</label>
                <input
                  value={editing.banner_image_url}
                  onChange={e => setEditing(d => ({ ...d, banner_image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5921B]"
                  placeholder="https://..."
                />
              </div>
              {editing.banner_image_url && (
                <img src={editing.banner_image_url} alt="preview" className="w-full h-32 object-cover rounded-lg border border-gray-100" />
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
              <h2 className="font-bold text-[#0C3547] text-sm uppercase tracking-wide">Tags</h2>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#F5921B]"
                  placeholder="Add tag..."
                />
                <button onClick={addTag} className="bg-[#0C3547] text-white px-3 py-1.5 rounded-lg text-sm font-bold">+</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(editing.tags || []).map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tag}
                    <button onClick={() => setEditing(d => ({ ...d, tags: d.tags.filter(t => t !== tag) }))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/Home">
              <img src="https://media.base44.com/images/public/69b1aedc5a0abb358cd40ec0/cbc52774d_AIQlogo-Square.png" alt="Academic IQ" className="h-8 w-8 object-contain" />
            </Link>
            <h1 className="font-bold text-[#0C3547] text-lg">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/Blog" target="_blank" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#F5921B]">
              <ExternalLink className="w-4 h-4" /> View Blog
            </Link>
            <button onClick={openNew} className="flex items-center gap-2 bg-[#F5921B] hover:bg-[#e0830f] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
              <Plus className="w-4 h-4" /> New Article
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#0C3547]">Articles</h2>
            <p className="text-gray-500 text-sm">{posts.length} total · {posts.filter(p => p.is_published).length} published</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="bg-white rounded-xl h-20 animate-pulse border border-gray-100" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-4">No articles yet.</p>
            <button onClick={openNew} className="bg-[#F5921B] text-white px-6 py-2 rounded-lg font-bold">Create your first article</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Article</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Views</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {post.banner_image_url ? (
                          <img src={post.banner_image_url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">🧠</div>
                        )}
                        <div>
                          <p className="font-semibold text-[#0C3547] line-clamp-1">{post.title}</p>
                          <p className="text-xs text-gray-400">/Blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{post.category || "—"}</span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden lg:table-cell">{(post.views || 0).toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.is_published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                        {post.is_featured && <span className="text-xs bg-[#F5921B]/10 text-[#F5921B] px-2 py-0.5 rounded-full font-medium">Featured</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <a href={`/Blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-[#0C3547] rounded-lg hover:bg-gray-100 transition-colors" title="View">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button onClick={() => toggleFeatured(post)} className="p-1.5 text-gray-400 hover:text-[#F5921B] rounded-lg hover:bg-gray-100 transition-colors" title="Toggle featured">
                          {post.is_featured ? <Star className="w-4 h-4 fill-[#F5921B] text-[#F5921B]" /> : <StarOff className="w-4 h-4" />}
                        </button>
                        <button onClick={() => togglePublish(post)} className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100 transition-colors" title="Toggle publish">
                          {post.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button onClick={() => openEdit(post)} className="p-1.5 text-gray-400 hover:text-[#0C3547] rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => deletePost(post)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
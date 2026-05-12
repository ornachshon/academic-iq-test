import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const CATEGORIES = ["IQ Basics", "Science & Research", "Test Tips", "Brain Health", "Child Development", "Career & Success"];

const EMPTY = {
  title: "", slug: "", excerpt: "", content: "", category: "IQ Basics",
  author: "Academic IQ Team", read_time_minutes: 7, meta_description: "",
  meta_keywords: "", banner_image_url: "", tags: [], is_published: true, is_featured: false
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list view
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    const data = await base44.entities.BlogPost.list("-created_date", 100);
    setPosts(data || []);
    setLoading(false);
  }

  function startNew() { setEditing({ ...EMPTY }); setTagInput(""); }
  function startEdit(post) { setEditing({ ...post }); setTagInput(""); }

  async function save() {
    setSaving(true);
    if (editing.id) {
      await base44.entities.BlogPost.update(editing.id, editing);
    } else {
      await base44.entities.BlogPost.create(editing);
    }
    setSaving(false);
    setEditing(null);
    fetchPosts();
  }

  async function deletePost(id) {
    if (!confirm("Delete this article?")) return;
    await base44.entities.BlogPost.delete(id);
    fetchPosts();
  }

  async function toggle(post, field) {
    await base44.entities.BlogPost.update(post.id, { [field]: !post[field] });
    fetchPosts();
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !editing.tags.includes(t)) {
      setEditing({ ...editing, tags: [...editing.tags, t] });
    }
    setTagInput("");
  }

  function autoSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  if (editing) return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#0C3547]">{editing.id ? "Edit Article" : "New Article"}</h1>
          <button onClick={() => setEditing(null)} className="text-sm text-gray-400 hover:text-gray-600">← Back</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Title *</label>
            <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : autoSlug(e.target.value) })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0C3547]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Slug *</label>
            <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0C3547] font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
              <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Read Time (min)</label>
              <input type="number" value={editing.read_time_minutes} onChange={e => setEditing({ ...editing, read_time_minutes: +e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Banner Image URL</label>
            <input value={editing.banner_image_url} onChange={e => setEditing({ ...editing, banner_image_url: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            {editing.banner_image_url && <img src={editing.banner_image_url} alt="" className="mt-2 h-28 rounded-lg object-cover" />}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Excerpt *</label>
            <textarea value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
              rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Content (Markdown) *</label>
            <textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
              rows={14} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none font-mono resize-y" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Description</label>
            <textarea value={editing.meta_description} onChange={e => setEditing({ ...editing, meta_description: e.target.value })}
              rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Meta Keywords</label>
            <input value={editing.meta_keywords} onChange={e => setEditing({ ...editing, meta_keywords: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(editing.tags || []).map(t => (
                <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {t}
                  <button onClick={() => setEditing({ ...editing, tags: editing.tags.filter(x => x !== t) })} className="text-gray-400 hover:text-red-400">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTag()}
                placeholder="Add tag..." className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" />
              <button onClick={addTag} className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">Add</button>
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} />
              Featured
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button onClick={save} disabled={saving} className="bg-[#0C3547] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#0a2d3d] disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0C3547]">Blog Admin</h1>
            <Link to="/Blog" className="text-xs text-[#F5921B] hover:underline">View Blog →</Link>
          </div>
          <button onClick={startNew} className="bg-[#F5921B] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#e0830f]">
            + New Article
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Published</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Featured</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Views</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-[#0C3547] max-w-xs truncate">{post.title}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{post.category}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggle(post, "is_published")}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {post.is_published ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggle(post, "is_featured")}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.is_featured ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-400"}`}>
                        {post.is_featured ? "★ Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">{post.views || 0}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => startEdit(post)} className="text-xs text-[#0C3547] hover:underline">Edit</button>
                        <button onClick={() => deletePost(post.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No articles yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
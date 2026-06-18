"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCategories() {

    const [categories, setCategories] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [categoryName, setCategoryName] = useState("");
    const [creatingCategory, setCreatingCategory] = useState(false);

    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [subName, setSubName] = useState("");
    const [creatingSub, setCreatingSub] = useState(false);

    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState("");

    const [editingSubId, setEditingSubId] = useState<string | null>(null);
    const [editingSubName, setEditingSubName] = useState("");

    const fetchAll = async () => {

        try {

            setLoading(true);

            const [catRes, subRes] = await Promise.all([
                axios.get("/api/categories"),
                axios.get("/api/subcategories"),
            ]);

            setCategories(catRes.data);
            setSubcategories(subRes.data);

        } catch (error: any) {

            console.error("Failed to fetch categories/subcategories:", error);
            toast.error(error?.response?.data?.error || "Failed to load data");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchAll();
    }, []);

    const subsFor = (categoryId: string) =>
        subcategories.filter(s => s.category?._id === categoryId);

    // ---- Category actions ----

    const createCategory = async () => {

        if (!categoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {

            setCreatingCategory(true);

            await axios.post("/api/categories", { name: categoryName.trim() });

            toast.success("Category created");
            setCategoryName("");
            fetchAll();

        } catch (error: any) {

            console.error("Create category failed:", error);
            toast.error(error?.response?.data?.error || "Failed to create category");

        } finally {

            setCreatingCategory(false);

        }

    };

    const saveCategoryEdit = async (id: string) => {

        if (!editingCategoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {

            await axios.put(`/api/categories/${id}`, { name: editingCategoryName.trim() });

            toast.success("Category updated");
            setEditingCategoryId(null);
            fetchAll();

        } catch (error: any) {

            console.error("Update category failed:", error);
            toast.error(error?.response?.data?.error || "Failed to update category");

        }

    };

    const deleteCategory = async (id: string) => {

        const hasSubs = subsFor(id).length > 0;

        const message = hasSubs
            ? "This category has subcategories under it. Deleting it won't delete those subcategories, but they'll become orphaned. Delete anyway?"
            : "Delete this category?";

        if (!confirm(message)) return;

        try {

            await axios.delete(`/api/categories/${id}`);

            toast.success("Category deleted");
            fetchAll();

        } catch (error: any) {

            console.error("Delete category failed:", error);
            toast.error(error?.response?.data?.error || "Failed to delete category");

        }

    };

    // ---- SubCategory actions ----

    const createSubCategory = async (categoryId: string) => {

        if (!subName.trim()) {
            toast.error("SubCategory name is required");
            return;
        }

        try {

            setCreatingSub(true);

            await axios.post("/api/subcategories", {
                name: subName.trim(),
                category: categoryId,
            });

            toast.success("SubCategory created");
            setSubName("");
            fetchAll();

        } catch (error: any) {

            console.error("Create subcategory failed:", error);
            toast.error(error?.response?.data?.error || "Failed to create subcategory");

        } finally {

            setCreatingSub(false);

        }

    };

    const saveSubEdit = async (id: string) => {

        if (!editingSubName.trim()) {
            toast.error("SubCategory name is required");
            return;
        }

        try {

            await axios.put(`/api/subcategories/${id}`, { name: editingSubName.trim() });

            toast.success("SubCategory updated");
            setEditingSubId(null);
            fetchAll();

        } catch (error: any) {

            console.error("Update subcategory failed:", error);
            toast.error(error?.response?.data?.error || "Failed to update subcategory");

        }

    };

    const deleteSubCategory = async (id: string) => {

        if (!confirm("Delete this subcategory?")) return;

        try {

            await axios.delete(`/api/subcategories/${id}`);

            toast.success("SubCategory deleted");
            fetchAll();

        } catch (error: any) {

            console.error("Delete subcategory failed:", error);
            toast.error(error?.response?.data?.error || "Failed to delete subcategory");

        }

    };

    return (

        <div className="min-h-screen bg-[#0a0a0a] px-6 py-12">

            <div className="max-w-2xl mx-auto">

                <p className="text-orange-500 text-xs font-medium tracking-[3px] uppercase mb-2">
                    Catalog
                </p>

                <h1 className="text-white text-3xl font-bold mb-1">
                    Categories
                </h1>

                <p className="text-white/40 text-sm mb-10">
                    Create top-level categories (e.g. Men, Women), then add subcategories under each (e.g. T-Shirts, Jeans).
                </p>

                <div className="flex gap-3 mb-8">

                    <input
                        value={categoryName}
                        placeholder="e.g. Men"
                        className="flex-1 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.05] focus:border-orange-500/60"
                        onChange={e => setCategoryName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") createCategory();
                        }}
                    />

                    <button
                        onClick={createCategory}
                        disabled={creatingCategory}
                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-3 rounded-xl text-white text-sm font-medium whitespace-nowrap"
                    >
                        {creatingCategory ? "Adding..." : "Add category"}
                    </button>

                </div>

                {loading && (
                    <p className="text-center text-white/30 text-sm py-10">
                        Loading...
                    </p>
                )}

                {!loading && categories.length === 0 && (
                    <p className="text-center text-white/30 text-sm py-10">
                        No categories yet. Add your first one above.
                    </p>
                )}

                <div className="space-y-3">

                    {categories.map(category => {

                        const isExpanded = expandedCategory === category._id;
                        const subs = subsFor(category._id);

                        return (

                            <div
                                key={category._id}
                                className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden"
                            >

                                <div className="flex items-center justify-between px-5 py-4">

                                    {editingCategoryId === category._id ? (

                                        <input
                                            value={editingCategoryName}
                                            autoFocus
                                            className="flex-1 mr-3 rounded-lg bg-white/[0.05] border border-orange-500/40 px-3 py-2 text-sm text-white outline-none"
                                            onChange={e => setEditingCategoryName(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === "Enter") saveCategoryEdit(category._id);
                                                if (e.key === "Escape") setEditingCategoryId(null);
                                            }}
                                        />

                                    ) : (

                                        <button
                                            onClick={() =>
                                                setExpandedCategory(isExpanded ? null : category._id)
                                            }
                                            className="flex items-center gap-2 text-white text-sm font-medium"
                                        >
                                            <span className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                                                ›
                                            </span>
                                            {category.name}
                                            <span className="text-white/30 text-xs font-normal">
                                                ({subs.length})
                                            </span>
                                        </button>

                                    )}

                                    <div className="flex items-center gap-4 text-sm">

                                        {editingCategoryId === category._id ? (

                                            <>
                                                <button
                                                    onClick={() => saveCategoryEdit(category._id)}
                                                    className="text-green-400 hover:text-green-300 transition-colors"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => setEditingCategoryId(null)}
                                                    className="text-white/40 hover:text-white/70 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </>

                                        ) : (

                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditingCategoryId(category._id);
                                                        setEditingCategoryName(category.name);
                                                    }}
                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => deleteCategory(category._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>

                                        )}

                                    </div>

                                </div>

                                {isExpanded && (

                                    <div className="border-t border-white/5 px-5 py-4 bg-black/20">

                                        <div className="flex gap-2 mb-4">

                                            <input
                                                value={subName}
                                                placeholder="e.g. T-Shirts"
                                                className="flex-1 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-500/60"
                                                onChange={e => setSubName(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") createSubCategory(category._id);
                                                }}
                                            />

                                            <button
                                                onClick={() => createSubCategory(category._id)}
                                                disabled={creatingSub}
                                                className="bg-orange-500/90 hover:bg-orange-500 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg text-white text-xs font-medium whitespace-nowrap"
                                            >
                                                {creatingSub ? "Adding..." : "Add"}
                                            </button>

                                        </div>

                                        {subs.length === 0 && (
                                            <p className="text-white/30 text-xs">
                                                No subcategories yet.
                                            </p>
                                        )}

                                        <div className="space-y-2">

                                            {subs.map(sub => (

                                                <div
                                                    key={sub._id}
                                                    className="flex items-center justify-between bg-white/[0.02] rounded-lg px-3 py-2"
                                                >

                                                    {editingSubId === sub._id ? (

                                                        <input
                                                            value={editingSubName}
                                                            autoFocus
                                                            className="flex-1 mr-3 rounded bg-white/[0.05] border border-orange-500/40 px-2 py-1 text-xs text-white outline-none"
                                                            onChange={e => setEditingSubName(e.target.value)}
                                                            onKeyDown={e => {
                                                                if (e.key === "Enter") saveSubEdit(sub._id);
                                                                if (e.key === "Escape") setEditingSubId(null);
                                                            }}
                                                        />

                                                    ) : (

                                                        <span className="text-white/70 text-sm">
                                                            {sub.name}
                                                        </span>

                                                    )}

                                                    <div className="flex items-center gap-3 text-xs">

                                                        {editingSubId === sub._id ? (

                                                            <>
                                                                <button
                                                                    onClick={() => saveSubEdit(sub._id)}
                                                                    className="text-green-400 hover:text-green-300 transition-colors"
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    onClick={() => setEditingSubId(null)}
                                                                    className="text-white/40 hover:text-white/70 transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>

                                                        ) : (

                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingSubId(sub._id);
                                                                        setEditingSubName(sub.name);
                                                                    }}
                                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    onClick={() => deleteSubCategory(sub._id)}
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>

                                                        )}

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {

    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        comparePrice: "",
        stock: "",
        sizes: "",
        colors: "",
        images: [] as string[],
        featured: false,
        newArrival: false
    });

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await axios.get(`/api/products/${id}`);
                const data = res.data;

                setProduct({
                    name: data.name || "",
                    description: data.description || "",
                    category: data.category || "",
                    price: data.price?.toString() || "",
                    comparePrice: data.comparePrice?.toString() || "",
                    stock: data.stock?.toString() || "",
                    sizes: Array.isArray(data.sizes) ? data.sizes.join(", ") : "",
                    colors: Array.isArray(data.colors) ? data.colors.join(", ") : "",
                    images: data.images || [],
                    featured: !!data.featured,
                    newArrival: !!data.newArrival
                });

            } catch (error: any) {

                console.error("Failed to load product:", error);
                toast.error("Could not load product");
                router.push("/admin/products");

            } finally {

                setFetching(false);

            }

        };

        if (id) fetchProduct();

    }, [id]);

    const uploadImage = async (e: any) => {

        const file = e.target.files[0];

        if (!file) return;

        const form = new FormData();
        form.append("file", file);

        try {

            setUploading(true);

            const res = await axios.post("/api/upload", form);

            setProduct(prev => ({
                ...prev,
                images: [...prev.images, res.data.url]
            }));

            toast.success("Image uploaded");

        } catch (error: any) {

            console.error("Image upload failed:", error);
            toast.error(error?.response?.data?.error || "Image upload failed");

        } finally {

            setUploading(false);
            e.target.value = "";

        }

    }

    const removeImage = (index: number) => {
        setProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    }

    const validate = () => {

        const next: Record<string, string> = {};

        if (!product.name.trim()) next.name = "Product name is required";
        if (!product.category.trim()) next.category = "Category is required";

        if (!product.price.trim()) {
            next.price = "Price is required";
        } else if (Number.isNaN(Number(product.price)) || Number(product.price) < 0) {
            next.price = "Price must be a valid number";
        }

        if (product.comparePrice.trim() && Number.isNaN(Number(product.comparePrice))) {
            next.comparePrice = "Compare price must be a valid number";
        }

        if (!product.stock.trim()) {
            next.stock = "Stock is required";
        } else if (Number.isNaN(Number(product.stock)) || Number(product.stock) < 0) {
            next.stock = "Stock must be a valid number";
        }

        setErrors(next);

        return Object.keys(next).length === 0;

    }

    const toList = (value: string) =>
        value
            .split(",")
            .map(v => v.trim())
            .filter(Boolean);

    const submit = async () => {

        if (!validate()) {
            toast.error("Please fix the highlighted fields");
            return;
        }

        try {

            setLoading(true);

            await axios.put(`/api/products/${id}`, {
                ...product,
                price: Number(product.price),
                comparePrice: product.comparePrice.trim()
                    ? Number(product.comparePrice)
                    : 0,
                stock: Number(product.stock),
                sizes: toList(product.sizes),
                colors: toList(product.colors)
            });

            toast.success("Product updated");

            router.push("/admin/products");

        } catch (error: any) {

            console.error("Product update failed:", error);

            const serverMessage =
                error?.response?.data?.error ||
                error?.response?.data?.message;

            toast.error(serverMessage || "Failed to update product");

        } finally {

            setLoading(false);

        }

    }

    const fieldClass = (field: string) =>
        `w-full rounded-xl bg-white/[0.03] border px-4 py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.05] ${
            errors[field]
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-orange-500/60"
        }`;

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <p className="text-white/40 text-sm">Loading product...</p>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#0a0a0a] px-6 py-12">

            <div className="max-w-2xl mx-auto">

                <p className="text-orange-500 text-xs font-medium tracking-[3px] uppercase mb-2">
                    Catalog
                </p>

                <h1 className="text-white text-3xl font-bold mb-1">
                    Edit product
                </h1>

                <p className="text-white/40 text-sm mb-10">
                    Update the details below. Fields marked are required.
                </p>

                <div className="space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="sm:col-span-2">
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Product name *
                            </label>
                            <input
                                value={product.name}
                                placeholder="e.g. Classic Cotton Tee"
                                className={fieldClass("name")}
                                onChange={e =>
                                    setProduct({ ...product, name: e.target.value })
                                }
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                value={product.description}
                                placeholder="Materials, fit, care instructions..."
                                className={`${fieldClass("description")} h-28 resize-none`}
                                onChange={e =>
                                    setProduct({ ...product, description: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Category *
                            </label>
                            <input
                                value={product.category}
                                placeholder="e.g. T-Shirts"
                                className={fieldClass("category")}
                                onChange={e =>
                                    setProduct({ ...product, category: e.target.value })
                                }
                            />
                            {errors.category && (
                                <p className="text-red-400 text-xs mt-1.5">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Stock *
                            </label>
                            <input
                                value={product.stock}
                                placeholder="0"
                                inputMode="numeric"
                                className={fieldClass("stock")}
                                onChange={e =>
                                    setProduct({ ...product, stock: e.target.value })
                                }
                            />
                            {errors.stock && (
                                <p className="text-red-400 text-xs mt-1.5">{errors.stock}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Price (₹) *
                            </label>
                            <input
                                value={product.price}
                                placeholder="0.00"
                                inputMode="decimal"
                                className={fieldClass("price")}
                                onChange={e =>
                                    setProduct({ ...product, price: e.target.value })
                                }
                            />
                            {errors.price && (
                                <p className="text-red-400 text-xs mt-1.5">{errors.price}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Compare-at price (₹)
                            </label>
                            <input
                                value={product.comparePrice}
                                placeholder="0.00"
                                inputMode="decimal"
                                className={fieldClass("comparePrice")}
                                onChange={e =>
                                    setProduct({ ...product, comparePrice: e.target.value })
                                }
                            />
                            {errors.comparePrice && (
                                <p className="text-red-400 text-xs mt-1.5">{errors.comparePrice}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Sizes
                            </label>
                            <input
                                value={product.sizes}
                                placeholder="S, M, L, XL"
                                className={fieldClass("sizes")}
                                onChange={e =>
                                    setProduct({ ...product, sizes: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-white/60 text-xs font-medium mb-2">
                                Colors
                            </label>
                            <input
                                value={product.colors}
                                placeholder="Black, White"
                                className={fieldClass("colors")}
                                onChange={e =>
                                    setProduct({ ...product, colors: e.target.value })
                                }
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block text-white/60 text-xs font-medium mb-2">
                            Images
                        </label>

                        <label
                            className={`flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-6 cursor-pointer transition-colors hover:border-orange-500/40 hover:bg-white/[0.02] ${
                                uploading ? "opacity-50 pointer-events-none" : ""
                            }`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={uploadImage}
                                className="hidden"
                                disabled={uploading}
                            />
                            <span className="text-white/50 text-sm">
                                {uploading ? "Uploading..." : "Click to upload an image"}
                            </span>
                        </label>

                        {product.images.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {product.images.map((url, i) => (
                                    <div
                                        key={i}
                                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 group"
                                    >
                                        <img
                                            src={url}
                                            className="w-full h-full object-cover"
                                            alt={`Product image ${i + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute inset-0 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-6 pt-1">

                        <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={product.featured}
                                className="accent-orange-500 w-4 h-4"
                                onChange={e =>
                                    setProduct({ ...product, featured: e.target.checked })
                                }
                            />
                            Featured
                        </label>

                        <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={product.newArrival}
                                className="accent-orange-500 w-4 h-4"
                                onChange={e =>
                                    setProduct({ ...product, newArrival: e.target.checked })
                                }
                            />
                            New arrival
                        </label>

                    </div>

                    <div className="flex items-center gap-3 pt-4">

                        <button
                            onClick={submit}
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-7 py-3 rounded-xl text-white text-sm font-medium"
                        >
                            {loading ? "Saving..." : "Save changes"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/admin/products")}
                            className="text-white/50 hover:text-white/80 transition-colors px-4 py-3 text-sm"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}
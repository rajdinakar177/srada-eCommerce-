"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);

      toast.success("Product deleted");
      fetchProducts();
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden p-8">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-orange-400 tracking-[5px] text-xs">
              SRADA ADMIN
            </p>

            <h1 className="text-white text-5xl font-black mt-2">
              Products
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin/products/new")}
            className="bg-orange-500 hover:bg-orange-400 transition px-8 py-4 rounded-2xl text-white font-bold shadow-lg shadow-orange-500/30"
          >
            + Add Product
          </button>
        </div>

        {/* Glass Table */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full">
            <thead>
              <tr className="bg-white/10">
                <th className="p-5 text-left text-gray-300">Image</th>
                <th className="p-5 text-left text-gray-300">Name</th>
                <th className="p-5 text-left text-gray-300">Category</th>
                <th className="p-5 text-left text-gray-300">Price</th>
                <th className="p-5 text-left text-gray-300">Stock</th>
                <th className="p-5 text-left text-gray-300">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-400"
                  >
                    No products found
                  </td>
                </tr>
              )}

              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-white/10 hover:bg-white/10 transition"
                >
                  <td className="p-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-5 text-white font-semibold">
                    {product.name}
                  </td>

                  <td className="p-5 text-gray-300">
                    {product.category}
                  </td>

                  <td className="p-5 text-orange-400 font-bold">
                    ₹{product.price}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        product.stock > 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="p-5 flex gap-4">
                    <button
                      onClick={() =>
                        router.push(`/admin/products/${product._id}/edit`)
                      }
                      className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/40"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/40"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminProducts() {

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {

    try {

      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data);

    } catch (error: any) {

      console.error("Failed to fetch products:", error);
      toast.error(error?.response?.data?.error || "Failed to load products");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {

    if (!confirm("Delete this product? This can't be undone.")) return;

    try {

      await axios.delete(`/api/products/${id}`);

      toast.success("Product deleted");

      fetchProducts();

    } catch (error: any) {

      console.error("Delete failed:", error);
      toast.error(error?.response?.data?.error || "Delete failed");

    }

  };

  return (
    <div className="min-h-screen bg-black p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <p className="text-orange-500 uppercase tracking-[4px] text-xs">
              SRADA ADMIN
            </p>

            <h1 className="text-white text-4xl font-black">
              Products
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin/products/new")}
            className="bg-orange-500 px-6 py-3 rounded-xl text-white"
          >
            Add Product
          </button>

        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr>
                <th className="p-4 text-left text-gray-400">Image</th>
                <th className="p-4 text-left text-gray-400">Name</th>
                <th className="p-4 text-left text-gray-400">Category</th>
                <th className="p-4 text-left text-gray-400">Price</th>
                <th className="p-4 text-left text-gray-400">Stock</th>
                <th className="p-4 text-left text-gray-400">Actions</th>
              </tr>

            </thead>

            <tbody>

              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    No products yet. Add your first one to get started.
                  </td>
                </tr>
              )}

              {products.map((product: any) => (

                <tr
                  key={product._id}
                  className="border-t border-white/5"
                >

                  <td className="p-4">

                    <img
                      src={product.images?.[0]}
                      className="w-16 h-16 rounded-lg object-cover bg-white/5"
                      alt={product.name}
                    />

                  </td>

                  <td className="p-4 text-white">
                    {product.name}
                  </td>

                  <td className="p-4 text-gray-400">
                    {product.category}
                  </td>

                  <td className="p-4 text-orange-400">
                    ₹{product.price}
                  </td>

                  <td className="p-4">

                    <span
                      className={
                        product.stock > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td className="p-4 flex gap-3">

                    <button
                      onClick={() =>
                        router.push(`/admin/products/${product._id}/edit`)
                      }
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="text-red-400 hover:text-red-300 transition-colors"
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
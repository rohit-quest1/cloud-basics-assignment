import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { TextInput, Divider, Textarea, Button, Dialog, DialogPanel } from '@tremor/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast, Toaster } from 'sonner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}


export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null as File | null,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    }
  };

  // Create product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.post(`${apiUrl}/api/products`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
      setFormData({ name: "", description: "", price: "", stock: "", image: null });
      toast.success('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    }
  };

  // Update product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.put(`${apiUrl}/api/products/${editingProduct.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", stock: "", image: null });
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${apiUrl}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster closeButton expand={false} richColors position="top-center" />

      <div className="p-4">
        <div className="flex justify-end items-center mb-4 ">
          <Button className="bg-[#F8AD6A] hover:bg-[#F2360A] border-none" onClick={() => setIsOpen(true)}>Add Product</Button>
        </div>

        {/* Move the form into a Modal */}
        <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setEditingProduct(null);
            setFormData({ name: "", description: "", price: "", stock: "", image: null });
          }}
          
        >

          <DialogPanel>
          <div className="p-4">
            <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="mt-8">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Product Name
                    <span className="text-red-500">*</span>
                  </label>
                  <TextInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="image"
                    className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleFileChange}
                    className="mt-2 w-full text-tremor-default p-2 border rounded"
                  />
                </div>
            

                <div className="flex flex-col">
                  <label
                    htmlFor="price"
                    className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Price
                    <span className="text-red-500">*</span>
                  </label>
                  <TextInput
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="stock"
                    className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Stock
                    <span className="text-red-500">*</span>
                  </label>
                  <TextInput
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>
                <div className="col-span-full flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Description
                    <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-2"
                    required
                  />
                </div>
              
              </div>
              <Divider />
              <div className="flex items-center justify-end space-x-4">
                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({ name: "", description: "", price: "", stock: "", image: null });
                    }}
                    className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className=" bg-[#F8AD6A] hover:bg-[#F2360A] border-none whitespace-nowrap rounded-tremor-default  px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
          </DialogPanel>
      
        </Dialog>

        {/* Products List */}
        <div className="grid grid-cols-4 gap-6 p-4">
          {products.length === 0 ? (
            <div className="text-gray-500">
              Go ahead and add a product.
            </div>
          ) : (
            Array.isArray(products) && products.map((product) => (
              <div key={product.id} className="group flex w-full flex-col overflow-hidden  border border-gray-100 bg-white hover:shadow-md duration-300">
                <div className="relative flex h-52 overflow-hidden ">
                  <img
                    src={product.image_url || 'placeholder-image-url.jpg'}
                    alt={product.name}
                    className="absolute top-0 right-0 h-full w-full object-cover"
                  />
                </div>
                
                <div className="text-left mt-4 px-5 pb-5">
                  <h3 className="text-[18px] tracking-tight text-[#F2360A] font-bold">{product.name}</h3>
                  <p className="mt-2 text-gray-600 text-[14px] line-clamp-2">{product.description}</p>
                  
                  <div className="mt-4 text-[14px] flex items-center justify-between">
                    <div>
                      <span className="font-semibold  text-slate-900">Rs.{product.price}</span>
                      <p className="text-sm text-[#1AA771] font-medium">{product.stock} Stocks left!</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setFormData({
                            name: product.name,
                            description: product.description,
                            price: product.price.toString(),
                            stock: product.stock.toString(),
                            image: null,
                          });
                          setIsOpen(true);
                        }}
                        className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 
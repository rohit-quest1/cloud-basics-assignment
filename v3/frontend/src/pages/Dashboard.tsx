import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { toast, Toaster } from 'sonner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const userId = useSelector((state: any) => state.auth.user.id);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Expected array of products, received:', response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (productId: number) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token+" "+userId+" "+productId)
      await axios.post(`${apiUrl}/api/orders`, {
        userId,
        productId,
        quantity: 1
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Toaster closeButton expand={false} richColors position="top-center" />

      <div className="p-4">
       

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-6 p-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="group flex w-full flex-col overflow-hidden border border-gray-100 bg-white hover:shadow-md duration-300">
                <div className="relative flex h-52 overflow-hidden">
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
                      <span className="font-semibold text-slate-900">Rs.{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleOrder(product.id)}
                      className="p-2 text-gray-600 hover:text-gray-800"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
  
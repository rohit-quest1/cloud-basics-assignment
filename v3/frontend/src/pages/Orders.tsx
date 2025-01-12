import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

interface Order {
  id: number;
  product_name: string;
  quantity: number;
  user_email: string;
  order_date: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Add new state to track input values
  const [quantityInputs, setQuantityInputs] = useState<{ [key: number]: number }>({});

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (orderId: number, newQuantity: number) => {
    try {
        const token = localStorage.getItem('token');
    
      await axios.put(`${apiUrl}/api/orders/${orderId}`, {
        quantity: newQuantity
      },{
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      fetchOrders(); // Refresh orders after update
      toast.success('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  // Add handler for input changes
  const handleQuantityInputChange = (orderId: number, value: number) => {
    setQuantityInputs(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchOrders(); // Refresh orders after deletion
      toast.success('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Toaster closeButton expand={false} richColors position="top-center" />

      <div className="container mx-auto p-4">    
        {orders.length === 0 ? (
          <div className="text-gray-500">No Orders Yet.</div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell className="font-bold text-[#1AA771]">NAME</TableHeaderCell>
                <TableHeaderCell className="font-bold text-[#1AA771]">CURRENT QUANTITY</TableHeaderCell>
                <TableHeaderCell className="font-bold text-[#1AA771]">UPDATE QUANTITY</TableHeaderCell>
                <TableHeaderCell className="font-bold text-[#1AA771]">ORDER DATE</TableHeaderCell>
                <TableHeaderCell className="font-bold text-[#1AA771]">ACTIONS</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-200">
                  <TableCell className="text-left">{order.product_name}</TableCell>
                  <TableCell className="text-left">{order.quantity}</TableCell>
                  <TableCell className="text-left">
                    <input
                      type="number"
                      min="1"
                      defaultValue={order.quantity}
                      className="border rounded px-2 py-1 w-20"
                      onChange={(e) => handleQuantityInputChange(order.id, parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell className="text-left">
                    {new Date(order.order_date).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-left flex space-x-2">
                    <FaEdit
                      className="cursor-pointer text-black hover:text-gray-700"
                      onClick={() => handleUpdateQuantity(order.id, quantityInputs[order.id] || order.quantity)}
                    />
                    <FaTrash
                      className="cursor-pointer text-black hover:text-gray-700"
                      onClick={() => handleDeleteOrder(order.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
} 
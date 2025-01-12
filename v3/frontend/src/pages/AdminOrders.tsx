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

interface Order {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  user_email: string;
  order_date: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        {orders.length === 0 ? (
          <div className="text-gray-500">No Orders Yet.</div>
        ) : (
          <Table>
            <TableHead className="">
              <TableRow className="">
                <TableHeaderCell  className="font-bold text-[#1AA771]">ORDER ID</TableHeaderCell>
                <TableHeaderCell  className="font-bold text-[#1AA771]">PRODUCT</TableHeaderCell>
                <TableHeaderCell  className="font-bold text-[#1AA771]">EMAIL</TableHeaderCell>
                <TableHeaderCell  className="font-bold text-[#1AA771]">QUANTITY</TableHeaderCell>
                <TableHeaderCell  className="font-bold text-[#1AA771]">DATE</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-200">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>{order.user_email}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    {new Date(order.order_date).toLocaleString()}
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
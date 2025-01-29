import Navbar from "../components/Navbar";

import { toast, Toaster } from 'sonner';




export default function AdminDashboard() {



  return (
    <div>
      <Navbar />
      <Toaster closeButton expand={false} richColors position="top-center" />

     <div> Dashboard </div>
    </div>
  );
} 
import { Outlet } from 'react-router-dom';

import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';

const RootLayout = () => {
  return (
    <div className="bg-background text-foreground font-body flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

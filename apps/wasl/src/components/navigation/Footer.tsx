import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted w-full border-t py-6">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} وصل - جميع الحقوق محفوظة
          </p>
        </div>

        <nav className="flex items-center space-x-4">
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
            سياسة الخصوصية
          </Link>
          <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
            شروط الاستخدام
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm">
            تواصل معنا
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

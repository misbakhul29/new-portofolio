import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
        <p>&copy; {currentYear} Misbakhul Munir. All Rights Reserved.</p>
        <p className="mt-1">Designed & Built by Misbakhul Munir</p>
      </div>
    </footer>
  );
};

export default Footer;
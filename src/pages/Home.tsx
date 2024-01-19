// Home.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../utils/Definitions'; 
import './Home.css'; 
import { useProducts } from '../context/ProductContext';

export function Home() {
  const nav = useNavigate();
  const { products, error, loading } = useProducts();

  const searchInput = useRef<HTMLInputElement | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setFilteredProducts(products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [products, searchTerm]);

  const resetSearch = () => {
    setSearchTerm('');
    if (searchInput.current) {
      searchInput.current.value = '';
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="store-name">Manzour Shop</h1>
      <p className="tagline">Your 24/7 Grocery Destination in Jerusalem</p>
      <p>Welcome to Manzour Shop, where quality meets convenience. Explore our wide range of products, and enjoy a seamless shopping experience.</p>
      
      {/* Search bar */}
      <div className="search-frame">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products"
            ref={searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={resetSearch}>
            Reset
          </button>
        </div>

        {/* Display search results */}
        {searchTerm && (
          <div className="search-results">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact information */}
      <div className="contact-info">
        <p>For inquiries, contact us at: <span className="phone-number">050-99999999</span></p>
        <p>Working hours: 24/7</p>
      </div>

      {/* Employee name */}
      <p className="employee-name">- Tamir</p>
    </div>
  );
}

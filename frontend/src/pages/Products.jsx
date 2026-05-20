import React from 'react';

const Products = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  return (
    <section className="page-content">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            {/* Generates dynamic image based on Product Name */}
            <img 
              src={`https://placehold.co/300x200?text=${p.name}`} 
              alt={p.name} 
              style={{ width: '100%', borderRadius: '8px' }}
            />
            
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button>Add to Cart</button>
            <button>Buy</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admincrud.css";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const Admincrud = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Image Search State
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // form state
  const [form, setForm] = useState({
    product_name: "",
    product_brand: "",
    product_price: "",
    product_quantity: "",
    product_size: "",
    product_color: "",
    product_warranty: "",
    product_image: "",
  });

  const [mode, setMode] = useState("create");
  const [editingId, setEditingId] = useState(null);

  const requestPayload = useMemo(() => {
    const payload = { ...form };
    if (payload.product_price) payload.product_price = Number(payload.product_price);
    if (payload.product_quantity) payload.product_quantity = Number(payload.product_quantity);
    return payload;
  }, [form]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/all");
      setProducts(res.data || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setMode("create");
    setEditingId(null);
    setForm({
      product_name: "",
      product_brand: "",
      product_price: "",
      product_quantity: "",
      product_size: "",
      product_color: "",
      product_warranty: "",
      product_image: "",
    });
    setSearchResults([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        const res = await api.post("/products/create", requestPayload);
        toast.success(res?.data?.msg || "Product created");
      } else {
        const res = await api.put(`/products/update/${editingId}`, requestPayload);
        toast.success(res?.data?.msg || "Product updated");
      }
      resetForm();
      await fetchProducts();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const onEdit = (p) => {
    setMode("edit");
    setEditingId(p.product_id);
    setForm({
      product_name: p.product_name ?? "",
      product_brand: p.product_brand ?? "",
      product_price: p.product_price ?? "",
      product_quantity: p.product_quantity ?? "",
      product_size: p.product_size ?? "",
      product_color: p.product_color ?? "",
      product_warranty: p.product_warranty ?? "",
      product_image: p.product_image ?? "",
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await api.delete(`/products/delete/product/${id}`);
      toast.success("Product deleted");
      await fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // --- IMAGE SEARCH ---
  const handleSearchImages = async () => {
    if (!form.product_name) {
      toast.warn("Enter a product name first!");
      return;
    }
    setIsSearching(true);
    setShowImageModal(true);
    setSearchResults([]);
  
    try {
      console.log("Searching for:", form.product_name);
      const res = await api.get(`/images/search/${encodeURIComponent(form.product_name)}`);
      console.log("Response Data:", res.data);
      
      if (res.data && res.data.length > 0) {
        setSearchResults(res.data);
        toast.success(`Found ${res.data.length} images!`);
      } else {
        toast.warn("No images found for this keyword.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch images");
    } finally {
      setIsSearching(false);
    }
  };

  const selectImage = (url) => {
    setForm((prev) => ({ ...prev, product_image: url }));
    setShowImageModal(false);
    toast.success("Image Selected!");
  };

  return (
    <section className="admincrud-page">
      <h2>Admin Products CRUD</h2>

      <div className="admincrud-layout">
        <div className="admincrud-form-card">
          <h3>{mode === "create" ? "Create Product" : "Edit Product"}</h3>

          <form onSubmit={onSubmit} className="admincrud-form">
            <div className="field">
              <label>Product Name</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  name="product_name" 
                  value={form.product_name} 
                  onChange={onChange} 
                  required 
                  style={{ flex: 1 }}
                />
                <button 
                  type="button" 
                  onClick={handleSearchImages}
                  className="btn-secondary"
                >
                  Search Image
                </button>
              </div>
            </div>

            <div className="field">
              <label>Brand</label>
              <input name="product_brand" value={form.product_brand} onChange={onChange} required />
            </div>

            <div className="field">
              <label>Price</label>
              <input name="product_price" type="number" value={form.product_price} onChange={onChange} required />
            </div>

            <div className="field">
              <label>Quantity</label>
              <input name="product_quantity" type="number" value={form.product_quantity} onChange={onChange} required />
            </div>

            <div className="field">
              <label>Size</label>
              <input name="product_size" value={form.product_size} onChange={onChange} required />
            </div>

            <div className="field">
              <label>Color</label>
              <input name="product_color" value={form.product_color} onChange={onChange} required />
            </div>

            <div className="field">
              <label>Warranty</label>
              <input name="product_warranty" value={form.product_warranty} onChange={onChange} required />
            </div>

            {/* --- UPDATED IMAGE FIELD --- */}
            <div className="field">
              <label>Image URL</label>
              <input
                name="product_image"
                value={form.product_image}
                onChange={onChange}
                placeholder="Paste image URL here"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              
              {/* Better Image Preview */}
              {form.product_image && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={form.product_image} 
                    alt="Preview" 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #ddd'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />
                </div>
              )}
            </div>

            {/* MODAL */}
            {showImageModal && (
              <div className="image-modal-overlay">
                <div className="image-modal-content">
                  <div className="modal-header">
                    <h4>Select Image</h4>
                    <button type="button" onClick={() => setShowImageModal(false)} className="close-btn">✕</button>
                  </div>
                  
                  {isSearching ? (
                    <div className="loading-text">Loading images...</div>
                  ) : (
                    <div className="image-grid">
                      {searchResults.length > 0 ? (
                        searchResults.map((img) => (
                          <div key={img.id} onClick={() => selectImage(img.thumb)} className="img-option">
                            <img src={img.thumb} alt={img.alt} />
                          </div>
                        ))
                      ) : (
                        <p>No images found. Try another keyword.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {mode === "create" ? "Create" : "Update"}
              </button>
              {mode === "edit" && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admincrud-list-card">
          <h3>Products</h3>
          {loading ? <p>Loading...</p> : products.length === 0 ? <p>No products</p> : (
            <div className="admincrud-table-wrap">
              <table className="admincrud-table">
                <thead>
                  <tr>
                    <th>Image</th><th>Name</th><th>Brand</th><th>Price</th><th>Qty</th><th>Size</th><th>Color</th><th>Warranty</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.product_id}>
                      <td><img src={p.product_image || "/img/default.png"} alt="" className="admincrud-thumb" /></td>
                      <td>{p.product_name}</td>
                      <td>{p.product_brand}</td>
                      <td>{p.product_price}</td>
                      <td>{p.product_quantity}</td>
                      <td>{p.product_size}</td>
                      <td>{p.product_color}</td>
                      <td>{p.product_warranty}</td>
                      <td>
                        <button className="btn-edit" onClick={() => onEdit(p)}>Edit</button>
                        <button className="btn-del" onClick={() => onDelete(p.product_id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Admincrud;
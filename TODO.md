# TODO

## Products search fix
- [x] Update `frontend/src/pages/Products.jsx` filtering logic to include `product_name`, `product_brand`, `product_price`, `product_size` (and also `product_color`, `product_quantity`, `product_warranty`).
- [x] Normalize values safely for string matching (handle null/undefined).
- [x] Re-check search bar behavior manually (name/brand/price/size).
- [x] Create cart page + route and navigate from Products card buttons to `/cart`.
- [x] Add payment route/page and navigate:
  - Products “Buy Now” -> `/payment`
  - Cart “Buy from Cart” -> `/payment`
- [ ] Implement cart page data loading (fetch `/api/cart/:userId`) and display items









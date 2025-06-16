'use client';

import {
  Product,
  useCreateProductMutation,
  useGetProductsQuery,
} from '@/state/api';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import Header from '@/app/(components)/Header';
import Rating from '@/app/(components)/Rating';
import CreateProductModal from './CreateProductModal';

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = useCallback(
    async (productData: ProductFormData) => {
      try {
        await createProduct(productData).unwrap();
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    },
    [createProduct]
  );

  const handleClose = useCallback(() => {
    setIsModalOpen(false); // Example
  }, []);

  // const memoizedProducts = useMemo(() => {
  //   if (!products) return [];
  //   return products.map((product) => (
  //     <div
  //       key={product.productId}
  //       className="border shadow max-w-full w-full mx-auto p-4 rounded-md"
  //     >
  //       <div className="flex items-center flex-col">
  //         img
  //         <h3 className="text-lg text-gray-900 font-semibold">
  //           {product.name}
  //         </h3>
  //         <p className="text-gray-800">${product.price.toFixed(2)}</p>
  //         <div className="text-sm text-gray-600 mt-1">
  //           stock: {product.stockQuantity}
  //         </div>
  //         {product.rating && (
  //           <div className="flex items-center mt-2">
  //             <Rating rating={product.rating} />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   ));
  // }, [products]);

  // First define the ProductListItem component
  const ProductListItem = React.memo(({ product }: { product: Product }) => (
    <div className="border shadow max-w-full w-full mx-auto p-4 rounded-md">
      <div className="flex items-center flex-col">
        <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
        <p className="text-gray-800">${product.price.toFixed(2)}</p>
        <div className="text-sm text-gray-600 mt-1">
          stock: {product.stockQuantity}
        </div>
        {product.rating && (
          <div className="flex items-center mt-2">
            <Rating rating={product.rating} />
          </div>
        )}
      </div>
    </div>
  ));

  // Then use it in memoizedProducts
  const memoizedProducts = useMemo(() => {
    if (!products) return [];
    return products.map((product) => (
      <ProductListItem key={product.productId} product={product} />
    ));
  }, [products]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-950 py-4">Failed Fetch Products</div>
    );
  }

  return (
    <div className="mx-auto w-full pb-5">
      {/* Search Bar  */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 m-2 text-gray-500" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded"
            placeholder="Search Products...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header Bar  */}
      <div className="flex items-center justify-between mb-6">
        <Header name="Products" />
        <button
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 !text-gray-200 mr-2" />
          Create Product
        </button>
      </div>

      {/* Body Products List  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {memoizedProducts}
      </div>

      {/* Modal  */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;

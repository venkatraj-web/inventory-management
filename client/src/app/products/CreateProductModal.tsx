import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from 'react';
import Header from '@/app/(components)/Header';
import { v4 } from 'uuid';

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: '',
    price: 0,
    rating: 0,
    stockQuantity: 0,
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === 'price' || name === 'rating' || name === 'stockQuantity'
          ? value == ''
            ? 0
            : parseFloat(value)
          : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Use setTimeout to avoid blocking the UI thread
      await onCreate(formData);
      onClose(); // Close modal immediately
      setFormData((prevFormData) => ({
        ...prevFormData,
        productId: v4(),
        name: '',
        price: 0,
        rating: 0,
        stockQuantity: 0,
      }));
    },
    [formData, onClose, onCreate]
  );

  if (!isOpen) return null;

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block border-2 border-gray-500 mb-2 p-2 w-full rounded-md';

  return (
    <div
      className="fixed inset-0 bg-gray-600/50 overflow-y-auto w-full h-full z-20"
      style={{ willChange: 'opacity' }}
    >
      <div className="relative top-20 mx-auto w-96 max-w-96 border p-5 bg-white text-gray-600 shadow-lg rounded-lg">
        <Header name="Create New Product" />
        {/* Product Name  */}
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* Price  */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* Rating */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            className={inputCssStyles}
            required
            value={formData.rating}
            onChange={handleChange}
          />

          {/* Stock Quantity */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            className={inputCssStyles}
            required
            value={formData.stockQuantity}
            onChange={handleChange}
          />

          {/* Create Actions  */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>

          <button
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateProductModal);

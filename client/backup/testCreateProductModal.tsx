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
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => Promise<void> | void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const initialFormState = {
    productId: v4(),
    name: '',
    price: 0,
    rating: 0,
    stockQuantity: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'rating' || name === 'stockQuantity'
          ? value === ''
            ? 0
            : parseFloat(value)
          : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        await onCreate(formData);
        setFormData(initialFormState);
        onClose();
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isSubmitting, onClose, onCreate]
  );

  if (!isOpen) return null;

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block border-2 border-gray-500 mb-2 p-2 w-full rounded-md';

  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto w-full h-full z-20">
      <div className="relative top-20 mx-auto w-96 max-w-96 border p-5 bg-white text-gray-600 shadow-lg rounded-lg">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* Form fields remain the same */}
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

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateProductModal);

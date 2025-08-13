import SpecialProductCard from "./SpecialProductCard.js";
import products from "../../cardData/specialProduct.js";
const ProductGrid = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <SpecialProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

import SpecialProductCard from "./SpecialProductCard.js";
import products from "../../cardData/specialProduct.js";
const ProductGrid = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      {/* <h1 className="text-3xl font-bold text-center mb-8 ">
        Subscription Plans
      </h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <SpecialProductCard
            key={product.id}
            product={product}
            stripePublicKey={import.meta.env.VITE_STRIPE_PUBLISH_KEY!}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

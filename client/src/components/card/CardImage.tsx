import type { CardImageProps } from "../../type/product/product.type.js";

const CardImage: React.FC<CardImageProps> = ({ image, altData, className }) => {
  return <img src={image} alt={altData} className={className} />;
};
export default CardImage;

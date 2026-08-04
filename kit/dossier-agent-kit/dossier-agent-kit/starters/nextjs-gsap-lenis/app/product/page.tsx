import { ProductHero } from "@/components/ProductHero";

export default function ProductPage() {
  return (
    <main>
      <ProductHero
        posterSrc="/poster.jpg"
        posterAlt="Walnut stool, 45 cm tall"
        modelSrc="/product.glb"
      />
    </main>
  );
}

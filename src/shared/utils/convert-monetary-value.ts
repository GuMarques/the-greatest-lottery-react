export default function ConvertPrice (price: number): string {
  return price.toFixed(2).replace(".", ",");
}
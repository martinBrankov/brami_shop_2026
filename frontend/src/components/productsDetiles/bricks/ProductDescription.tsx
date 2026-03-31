"use client";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <div
      className="text-sm text-purple-700/80 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends React.ComponentPropsWithoutRef<"img"> {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  containerClassName?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&q=80&w=800", // Serene ocean sea environment default
  containerClassName = "w-full h-full",
  className = "",
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {loading && (
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-850 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-neutral-300 dark:text-neutral-700 animate-pulse" />
        </div>
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        className={`${className} transition-all duration-500 ${
          loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        {...props}
      />
    </div>
  );
}

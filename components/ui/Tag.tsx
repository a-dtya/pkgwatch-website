interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "success";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const variantClasses =
    variant === "success"
      ? "bg-success/10 border-success/30 text-success"
      : "bg-accent/10 border-accent/25 text-accent";

  return (
    <span
      className={`inline-block border px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.5px] ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

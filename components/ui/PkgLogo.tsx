interface PkgLogoProps {
  size?: number;
}

export default function PkgLogo({ size = 32 }: PkgLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="9" fill="#0e0b00" />
      {/* top face */}
      <path d="M20 9L31 14.8L20 20.5L9 14.8Z" fill="#fbbf24" />
      {/* right face */}
      <path d="M31 14.8V26.3L20 32V20.5L31 14.8Z" fill="#b45309" />
      {/* left face */}
      <path d="M9 14.8V26.3L20 32V20.5L9 14.8Z" fill="#d97706" />
      {/* P cutout stem */}
      <rect x="11.5" y="18.5" width="2" height="7" rx="0.4" fill="#0e0b00" />
      {/* P cutout bump */}
      <path
        d="M11.5 18.5H15C15.9 18.5 16.6 19.2 16.6 20.1 16.6 21 15.9 21.7 15 21.7H11.5Z"
        fill="#0e0b00"
      />
    </svg>
  );
}

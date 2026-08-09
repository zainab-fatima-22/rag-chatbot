interface StampMarkProps {
  size?: number;
  className?: string;
}

/**
 * The signature element: an official ink-stamp mark, echoing the seals
 * used on FBR forms, NTN certificates, and tax documents. Used as the
 * brand mark throughout the app instead of a generic logotype.
 */
export default function StampMark({ size = 36, className = "" }: StampMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 4" />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="22"
        fontWeight="600"
        fill="currentColor"
      >
        TA
      </text>
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        letterSpacing="2"
        fill="currentColor"
      >
        VERIFIED
      </text>
    </svg>
  );
}

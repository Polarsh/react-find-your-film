export default function Chip({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <span
      className={`px-3 py-1 rounded-full bg-[#333742] text-white font-content text-sm ${
        onClick ? "cursor-pointer hover:bg-[#444b5c] transition" : ""
      }`}
      onClick={onClick}>
      {label}
    </span>
  );
}

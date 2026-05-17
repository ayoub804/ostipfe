export default function ComputerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="80" height="55" rx="4" fill="#2d3436" />
      <rect x="15" y="20" width="70" height="45" rx="2" fill="#74b9ff" />
      <path d="M15 20L85 65V20H15Z" fill="white" fillOpacity="0.1" />
      <rect x="42" y="70" width="16" height="8" fill="#b2bec3" />
      <rect x="35" y="78" width="30" height="4" fill="#636e72" />
      <rect x="20" y="84" width="60" height="12" rx="2" fill="#b2bec3" />
      <path d="M25 88H75M25 92H75M35 84V96M45 84V96M55 84V96M65 84V96" stroke="#636e72" strokeWidth="0.5" />
    </svg>
  );
}

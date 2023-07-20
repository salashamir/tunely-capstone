import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full text-md gap-x-4 font-medium cursor-pointer hover:text-yellow-600 transition text-neutral-900 py-1`,
        active && "text-yellow-600"
      )}
    >
      <Icon size={26} className="text-neutral-900" />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;

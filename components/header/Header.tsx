import NavbarButton from "@/components/header/NavbarButton";
import Breadcrumb from "@/components/header/Breadcrumb";
import UserAvatar from "@/components/header/UserAvatar";
import Search from "@/components/header/Search";

interface HeaderProps { isActive: boolean };

const Header: React.FC<HeaderProps> = ({ isActive }) => {
  return (
    <header className="flex flex-col gap-y-2 z-40 w-full transition-all">
      <div className="flex items-center justify-between py-3">
        <NavbarButton />
        <Search isActive={isActive} />
        <UserAvatar />
      </div>
      <Breadcrumb />
    </header>
  )
};

export default Header;
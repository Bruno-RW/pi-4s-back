import { GoSearch } from "react-icons/go";

import { cn } from "@/lib/utils";

interface SearchProps { isActive: boolean };

const Search: React.FC<SearchProps> = ({ isActive }) => {
  return (
    <div className="relative group">
      <input className={cn("bg-border-shadow text-black/80 w-96 max-w-[10rem] sm:max-w-[20rem] md:max-w-[24rem] h-10 px-4 rounded-2xl outline-none transition-all dark:text-neutral-100 dark:placeholder:text-neutral-300", !isActive && "max-w-[6rem] sm:max-w-[14rem] md:max-w-[20rem] lg:max-w-[24rem]")}
        placeholder="Search..."
        type="search"
        name="search"
        id="search"
      />

      <button className="hidden sm:block absolute right-3.5 top-2.5 text-black/50 transition-all hover:text-black/80 hover:scale-110 focus:scale-110 active:scale-100 dark:text-neutral-200 dark:hover:text-neutral-100">
        <GoSearch size={20} />
      </button>
    </div>
  );
}
export default Search;
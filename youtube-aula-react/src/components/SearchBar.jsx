import { MdSearch } from "react-icons/md";
import tw from "tailwind-styled-components";

const SearchBarContainer = tw.div`
  border
  border-gray-600
  rounded-xl
  focus-within:border-blue-600
  w-full
  flex
`;

export function SearchBar() {
  return (
    <SearchBarContainer>
      <div className="flex flex-1 gap-1 items-center">
        <span className="p-2">
          <MdSearch />
        </span>
        <input
          className="bg-transparent outline-none"
          type="search"
          placeholder="Pesquisar"
        />
      </div>
      <button className="py-2 px-4 bg-gray-900 rounded-r-xl hover:bg-gray-800 cursor-pointer">
        <MdSearch />
      </button>
    </SearchBarContainer>
  );
}

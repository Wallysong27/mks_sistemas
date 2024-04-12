import { TiShoppingCart } from "react-icons/ti";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50">
      <div className="flex items-center h-12 bg-[#0F52BA] px-6">
        <h1 className="flex items-center flex-1 text-white gap-2">
          <span className="text-[32px] font-semibold">MKS</span>{" "}
          <span className="text-base font-light">Sistemas</span>
        </h1>
        <div className="flex items-center justify-center bg-white rounded-lg w-[56px] h-[26px] gap-2">
          <TiShoppingCart />
          <span className="font-bold text-xs">0</span>
        </div>
      </div>
    </nav>
  );
}

import { FaHeart } from "react-icons/fa";

type SexyInfoProps = {
  sexy: number;
};

export function SexyInfo({ sexy }: SexyInfoProps) {
  const sexySize = (sexy * 56) / 3;
  return (
    <div className="w-[56px]">
      <span className="text-sm leading-tight text-slate-700">sexy</span>
      <div className="relative">
        <div
          className={`bg-white overflow-hidden`}
          style={{
            width: `${sexySize}px`,
          }}
        >
          <div className="flex flex-row gap-1 w-[56px] relative z-20">
            <FaHeart className="text-red-400" />
            <FaHeart className="text-red-400" />
            <FaHeart className="text-red-400" />
          </div>
        </div>
        <div className="flex flex-row gap-1 w-[56px] absolute top-0 left-0 z-10">
          <FaHeart className="text-slate-300" />
          <FaHeart className="text-slate-300" />
          <FaHeart className="text-slate-300" />
        </div>
      </div>
    </div>
  );
}

import { FaCube } from "react-icons/fa";

type CoolInfoProps = {
  cool: number;
};

export function CoolInfo({ cool }: CoolInfoProps) {
  const coolSize = (cool * 56) / 3;
  return (
    <div className="w-[56px]">
      <span className="text-sm leading-tight text-slate-700">legal</span>
      <div className="relative">
        <div
          className={`bg-white overflow-hidden`}
          style={{
            width: `${coolSize}px`,
          }}
        >
          <div className="flex flex-row gap-1 w-[56px] relative z-20">
            <FaCube className="text-blue-400" />
            <FaCube className="text-blue-400" />
            <FaCube className="text-blue-400" />
          </div>
        </div>
        <div className="flex flex-row gap-1 w-[56px] absolute top-0 left-0 z-10">
          <FaCube className="text-slate-300" />
          <FaCube className="text-slate-300" />
          <FaCube className="text-slate-300" />
        </div>
      </div>
    </div>
  );
}

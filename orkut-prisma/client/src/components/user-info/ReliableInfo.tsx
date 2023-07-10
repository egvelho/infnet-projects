import { FaSmile } from "react-icons/fa";

type ReliableInfoProps = {
  reliable: number;
};

export function ReliableInfo({ reliable }: ReliableInfoProps) {
  const reliableSize = (reliable * 56) / 3;
  return (
    <div className="w-[56px]">
      <span className="text-sm leading-tight text-slate-700">confiável</span>
      <div className="relative">
        <div
          className={`bg-white overflow-hidden`}
          style={{
            width: `${reliableSize}px`,
          }}
        >
          <div className="flex flex-row gap-1 w-[56px] relative z-20">
            <FaSmile className="text-yellow-400" />
            <FaSmile className="text-yellow-400" />
            <FaSmile className="text-yellow-400" />
          </div>
        </div>
        <div className="flex flex-row gap-1 w-[56px] absolute top-0 left-0 z-10">
          <FaSmile className="text-slate-300" />
          <FaSmile className="text-slate-300" />
          <FaSmile className="text-slate-300" />
        </div>
      </div>
    </div>
  );
}

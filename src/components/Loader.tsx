import Ripple from "@/@/components/magicui/ripple";
import "../global.css";
import { lbl } from "@/utils/constants";

export function Loader() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-4xl font-medium tracking-tighter text-white">
        {lbl.loading}
      </p>
      <Ripple />
    </div>
  );
}

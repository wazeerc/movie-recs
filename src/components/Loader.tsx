import Ripple from "@/@/components/magicui/ripple";
import { lbl } from "@/utils/constants";
import "../global.css";

export function Loader() {
  return (
    <div className="loader-container">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
        <p className="z-10 whitespace-pre-wrap text-center text-4xl font-medium tracking-tighter text-white">
          {lbl.loading}
        </p>
        <Ripple />
      </div>
    </div>
  );
}

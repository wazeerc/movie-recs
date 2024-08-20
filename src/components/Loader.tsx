import Ripple from "@/@/components/magicui/ripple";

export function Loader() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Loading
      </p>
      <Ripple />
    </div>
  );
}

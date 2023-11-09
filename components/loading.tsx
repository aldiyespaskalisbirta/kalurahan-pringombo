import Image from "next/image";

function LoadingPage() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-gray-400/20 h-full w-full dark:invert">
      <Image
        src="/assets/logo.svg"
        alt="denied"
        width={140}
        height={140}
        className="animate-bounce"
      />
    </div>
  );
}

export default LoadingPage;

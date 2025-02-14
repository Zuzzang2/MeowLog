"use client";

export default function ProgressBar() {
  return (
    <div className="flex-center flex-col gap-4 border rounded-lg p-4">
      <div>음수량</div>
      <div className="relative w-full bg-gray-200 rounded-full h-4 ">
        <div className="bg-blue-500 h-4 rounded-full w-[70%]"></div>
        <div className="absolute top-1/2 left-[70%] transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 border-2 border-black rounded-full shadow-md"></div>
      </div>
    </div>
  );
}

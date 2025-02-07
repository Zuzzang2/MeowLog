"use client";

import { useState } from "react";
import Profile from "./profile/page";
import Category from "./category/page";

const tabs = ["탭하나", "탭둘", "탭셋"];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex gap-6 items-center border flex-col mx-auto w-[845px] my-[24px]">
      <div className="flex gap-10 w-3/4">
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`flex-center flex-1 p-4 border-b-2 transition duration-200
            ${activeTab === index ? "border-blue-500 text-blue-600 font-bold" : "border-transparent hover:border-gray-300"}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </a>
        ))}
      </div>

      <div className="w-full text-[24px] font-bold">
        <a>{tabs[activeTab]}</a>
      </div>

      {activeTab === 0 && <Profile />}
      {activeTab === 1 && <Category />}
    </div>
  );
}

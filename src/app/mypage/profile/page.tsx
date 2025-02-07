"use client";

import { useState } from "react";

export default function Profile() {
  return (
    <div className="flex-center">
      <div className="flex-center item-center w-[800px] m-4">
        <div className="flex-center flex-col w-full gap-4">
          <div className="w-[150px] h-[150px] bg-custom-blue rounded-full"></div>
          <div className="flex flex-col item-start gap-4">
            <div className="">
              <p className="">이름</p>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="border-b-2 focus:outline-none focus:border-b-2 focus:border-black "
              ></input>
            </div>
            <div className="border-b-2">
              <p className="">성별</p>
              <p>암컷 / 수컷</p>
            </div>
            <div className="border-b-2">
              <p className="">품종</p>
              <input type="text" placeholder="품종을 입력하세요"></input>
            </div>
            <div className="border-b-2">
              <p className="">생일</p>
              <input type="text" placeholder="이름을 입력하세요"></input>
            </div>
            <div className="border-b-2">
              <p className="">중성화</p>
              <p>유 / 무</p>
            </div>
            <div className="border-b-2">
              <p className="">집사 닉네임</p>
              <input type="text" placeholder="닉네임을 입력하세요"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

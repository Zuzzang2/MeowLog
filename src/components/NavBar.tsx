"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="block">
      <nav className="flex-center bg-custom-gray  h-16 w-full z-10  min-w-[1100px] mx-auto">
        <div className="flex justify-between w-[1100px] h-full ">
          <div className="flex-center gap-4">
            <Link href="/" className="text-2xl font-bold cursor-pointer">
              이름이다
            </Link>
            <div className="flex-center gap-4">
              <Link href="mypage" className="cursor-pointer">
                임시마이페이지
              </Link>
              <a className="cursor-pointer">메뉴2</a>
            </div>
          </div>
          <div className="flex-center gap-4">
            <div className="cursor-pointer">모드</div>
            <div className="cursor-pointer">로그인</div>
          </div>
        </div>
      </nav>
    </header>
  );
}

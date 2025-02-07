"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import ProgressBar from "@/components/ProgressBar";
import { useCategoryStore } from "@/store/dataStore";

moment.locale("ko"); // 기본 로케일을 한국어로 설정

export default function Main() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // ✅ zustand에서 상태 가져오기
  const { categoryList, selectedCategories, setSelectedCategories } =
    useCategoryStore();

  //✅ 모달 외부 클릭 감지 (메뉴 +카테고리)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <main className="flex justify-center w-[1100px] mx-auto pt-6 gap-[24px]">
      <div className="grow-[580] max-w-[580px] h-[1000px] flex-col gap-4">
        <div className="flex-center mb-6">
          <Calendar
            onClickDay={handleDateClick}
            className="react-calendar"
            formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            calendarType="gregory" // 일요일 부터 시작
            minDetail="year" // 10년단위 년도 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          ></Calendar>
        </div>
        <div className="flex-center flex-col gap-4 border rounded-lg p-4">
          <div>음수량</div>
          <ProgressBar></ProgressBar>
          <div>급여량</div>
        </div>
      </div>
      <div className="grow-[495] h-[1000px] border rounded-lg">
        <div className="flex justify-between item-center border-b-2 p-4">
          <div className="flex gap-2 text-2xl font-bold">
            <p className="flex items-center">
              {moment(selectedDate).format("M월 DD일")}
            </p>
            <p
              className={`flex items-center ${
                moment(selectedDate).format("dddd") === "토요일"
                  ? "text-blue-600"
                  : moment(selectedDate).format("dddd") === "일요일"
                    ? "text-red-500"
                    : ""
              }`}
            >
              {moment(selectedDate).format("dddd")}
            </p>
          </div>
          <div
            className="flex-center relative cursor-pointer p-2"
            ref={menuRef}
          >
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex-center"
            >
              메뉴버튼
            </button>

            {isOpen && (
              <ul className="flex-center flex-col gap-[2px] absolute right-0 min-w-max top-[33px] p-1 z-10 bg-custom-gray rounded-lg">
                <li className="cursor-pointer">카테고리 추가</li>
                <li className="cursor-pointer">카테고리 수정</li>
              </ul>
            )}
          </div>
        </div>

        {/* ✅ "추가하기" 버튼 */}
        <div className="p-4">
          <div className="inline-block" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              {selectedCategories ? selectedCategories : "추가하기"}
            </button>

            {/* ✅ 카테고리 목록 (버튼 클릭 시 토글) */}
            {isCategoryOpen && (
              <div className="mt-2 border rounded-lg p-2">
                {categoryList.map((category, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedCategories(category); // ✅ 선택한 카테고리 zustand에 저장
                      setIsCategoryOpen(false); // ✅ 선택 후 목록 닫기
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                  >
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </main>
  );
}

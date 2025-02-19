"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import ProgressBar from "@/components/progress/ProgressBar";
import { useCategoryStore } from "@/store/dataStore";
import TimePicker from "@/components/time/TimePicker";
import Link from "next/link";
import TimePickerList from "@/components/time/TimePickerList";

moment.locale("ko"); // 기본 로케일을 한국어로 설정

export default function Main() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { categoryList } = useCategoryStore();

  //✅ 모달 외부 클릭 감지 (메뉴)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
      <div className="grow-[580] max-w-[580px] flex-col gap-4">
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
        <ProgressBar></ProgressBar>
      </div>
      <div className="grow-[495] border rounded-lg">
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
              <div className="flex-center flex-col gap-[2px] absolute right-0 min-w-max top-[33px] p-1 z-10 bg-custom-gray rounded-lg">
                <div className="cursor-pointer">
                  <Link href="/mypage">카테고리 관리</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ✅ 타임피커 리스트 컴포넌트만 렌더링 */}
        <TimePickerList categoryList={categoryList} />
      </div>
    </main>
  );
}

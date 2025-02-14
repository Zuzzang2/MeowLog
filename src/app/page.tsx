"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import ProgressBar from "@/components/ProgressBar";
import { useCategoryStore } from "@/store/dataStore";
import TimePicker from "@/components/TimePicker";
import Link from "next/link";

moment.locale("ko"); // 기본 로케일을 한국어로 설정

export default function Main() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { categoryList } = useCategoryStore();

  // ✅ 각 카테고리별로 TimePicker가 보이는지 여부를 관리하는 상태
  const [visibleTimePicker, setVisibleTimePicker] = useState<{
    [key: string]: boolean;
  }>({});

  // ✅ 특정 카테고리의 TimePicker를 표시하는 함수 (추가 버튼 클릭 시)
  const showTimePicker = (category: string) => {
    setVisibleTimePicker((prev) => ({
      ...prev, //기존 상태 유지
      [category]: true, // 선택한 카테고리만 TimePicker를 보이게 설정
    }));
  };
  //카테고리1과 카테고리2에서 실행하면:
  //"카테고리1": true,
  //"카테고리2": true

  // ✅ 특정 카테고리의 TimePicker를 숨기는 함수 (취소 버튼 클릭 시)
  const hideTimePicker = (category: string) => {
    setVisibleTimePicker((prev) => ({
      ...prev,
      [category]: false, // TimePicker를 숨김
    }));
  };

  //✅ 모달 외부 클릭 감지 (메뉴 +카테고리)
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
        <div className="flex-center flex-col gap-4 border rounded-lg p-4">
          <div>음수량</div>
          <ProgressBar></ProgressBar>
          <div>급여량</div>
        </div>
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

        {categoryList.map((category, index) => (
          <div className="flex flex-col p-4">
            <div className="my-2">
              <a className="h-[200px] bg-blue-500 text-white rounded">
                {category}
              </a>
            </div>
            <div>
              <button
                className="border"
                onClick={() => showTimePicker(category)}
              >
                추가
              </button>
            </div>

            {/* ✅ 추가 버튼을 누르면 보이고, 취소 버튼을 누르면 사라짐 */}
            {visibleTimePicker[category] && (
              <div className="mt-2">
                <TimePicker onCancel={() => hideTimePicker(category)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

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

moment.locale("ko"); // 기본 로케일을 한국어로 설정

export default function Main() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { categoryList } = useCategoryStore();

  // ✅ 각 카테고리별로 여러 개의 TimePicker를 관리하는 상태. timePickersByCategory= TimePicker들의 ID(숫자 배열)를 저장하는 객체 상태
  const [timePickersByCategory, setTimePickersByCategory] = useState<{
    [key: string]: number[]; //key: 카테고리 이름, value: 타임피커의 id 배열
  }>({}); //초기상태를 {}빈객체로 설정

  // ✅ 특정 카테고리의 TimePicker를 추가하는 함수 -> 기존 timePickersByCategory를 유지하면서, 새로운 타임피커 ID를 추가
  const addTimePicker = (category: string) => {
    setTimePickersByCategory((prev) => ({
      ...prev, //기존 상태 복사
      [category]: [...(prev[category] || []), Date.now()], // prev[category] || [] → 기존에 추가된 타임피커가 없으면 빈 배열을 사용. Date.now() → 고유한 ID를 생성하여 TimePicker 추가
    }));
  };

  // ✅ 특정 TimePicker를 삭제하는 함수. 특정 타임피커의 취소 버튼 클릭 시 해당 타임피커의 id를 찾아서 제거. filter()를 사용하여 선택한 ID를 제외한 배열을 다시 상태로 설정
  const removeTimePicker = (category: string, id: number) => {
    setTimePickersByCategory((prev) => ({
      ...prev,
      [category]: prev[category].filter((pickerId) => pickerId !== id), // 해당 id만 삭제
    }));
  };

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

        {categoryList.map((category, index) => (
          <div className="flex flex-col p-4">
            <div className="my-2">
              <a className="h-[200px] bg-blue-500 text-white rounded">
                {category}
              </a>
            </div>
            <div>
              {/* ✅ 추가 버튼 */}
              <button
                className="border mt-2 p-2"
                onClick={() => addTimePicker(category)}
              >
                추가
              </button>
            </div>

            {/* ✅ 추가된 TimePicker 목록. timePickersByCategory[category] → 해당 카테고리의 모든 타임피커 ID 배열을 가져옴 -> map()을 사용하여 해당 ID를 가진 타임피커 컴포넌트를 동적으로 생성 */}
            {timePickersByCategory[category]?.map((id) => (
              <TimePicker
                key={id}
                onCancel={() => removeTimePicker(category, id)}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

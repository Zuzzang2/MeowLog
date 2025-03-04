"use client";

import { useState, useEffect } from "react";
import { useUnitStore } from "@/store/useUnitStore";

interface TimePickerProps {
  category: string;
  onCancel: () => void;
}

export default function TimePicker({ category, onCancel }: TimePickerProps) {
  const [meridian, setMeridian] = useState("AM");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [inputText, setInputText] = useState("");
  const { unitByCategory } = useUnitStore();

  useEffect(() => {
    const now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    const ampm = currentHour >= 12 ? "PM" : "AM";
    currentHour = currentHour % 12 || 12;
    const formattedHour = String(currentHour).padStart(2, "0");

    currentMinute = Math.round(currentMinute / 10) * 10;
    if (currentMinute === 60) currentMinute = 0;
    const formattedMinute = String(currentMinute).padStart(2, "0");

    setMeridian(ampm);
    setHour(formattedHour);
    setMinute(formattedMinute);
  }, []);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="flex justify-between items-center gap-2 border p-2 rounded-lg">
      {isConfirmed ? (
        <p className="mx-2">
          {meridian === "AM" ? "오전" : "오후"} {hour}시 {minute}분
          {inputText && <span>{inputText}</span>}
          {<span>{unitByCategory[category]}</span>}
        </p>
      ) : (
        <div className="flex items-center gap-2 h-[40px]">
          <select
            value={meridian}
            onChange={(e) => setMeridian(e.target.value)}
            className="h-full"
          >
            <option value="AM">오전</option>
            <option value="PM">오후</option>
          </select>

          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="h-full"
          >
            {Array.from({ length: 12 }, (_, i) =>
              String(i + 1).padStart(2, "0")
            ).map((h) => (
              <option key={h} value={h}>
                {h}시
              </option>
            ))}
          </select>

          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="h-full"
          >
            {Array.from({ length: 6 }, (_, i) =>
              String(i * 10).padStart(2, "0")
            ).map((m) => (
              <option key={m} value={m}>
                {m}분
              </option>
            ))}
          </select>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="숫자 입력"
            className="h-full border-b px-2"
          ></input>
          <span>{unitByCategory[category]}</span>
        </div>
      )}

      <div className="flex gap-2">
        {!isConfirmed && (
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white p-2 rounded"
          >
            확인
          </button>
        )}
        <button
          onClick={() => {
            setIsConfirmed(false);
            setInputText("");
            onCancel();
          }}
          className="bg-red-500 text-white p-2 rounded"
        >
          취소
        </button>
      </div>
    </div>
  );
}

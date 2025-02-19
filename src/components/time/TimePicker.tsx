"use client";

import { useState, useEffect } from "react";

interface TimePickerProps {
  onCancel: () => void;
}

export default function TimePicker({ onCancel }: TimePickerProps) {
  const [meridian, setMeridian] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);

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

  return (
    <div className="flex flex-row gap-2">
      <select
        value={meridian || ""}
        onChange={(e) => setMeridian(e.target.value)}
      >
        <option value="AM">오전</option>
        <option value="PM">오후</option>
      </select>

      <select value={hour || ""} onChange={(e) => setHour(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) =>
          String(i + 1).padStart(2, "0")
        ).map((h) => (
          <option key={h} value={h}>
            {h}시
          </option>
        ))}
      </select>

      <select value={minute || ""} onChange={(e) => setMinute(e.target.value)}>
        {Array.from({ length: 6 }, (_, i) =>
          String(i * 10).padStart(2, "0")
        ).map((m) => (
          <option key={m} value={m}>
            {m}분
          </option>
        ))}
      </select>

      <p className="text-gray-600 mt-2">
        선택된 시간: {hour}:{minute} {meridian}
      </p>

      <button
        onClick={onCancel}
        className="mt-2 bg-red-500 text-white p-2 rounded"
      >
        취소
      </button>
    </div>
  );
}

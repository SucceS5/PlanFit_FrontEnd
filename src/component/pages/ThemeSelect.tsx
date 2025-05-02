interface ThemeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ThemeSelect({ value, onChange }: ThemeSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="음식점">음식점</option>
      <option value="카페">카페</option>
      <option value="놀거리">놀거리</option>
      <option value="명소">명소</option>
    </select>
  );
}

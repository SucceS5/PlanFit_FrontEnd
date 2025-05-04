import style from "../less/SavedCourse.module.less";
import { useEffect, useState } from "react";
import { Place } from "../../types/Place"; // 경로는 상황에 맞게 조절
interface Course {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  time: string;
  places: Place[];
}

interface SavedCourseProps {
  onClose: () => void;
  onSelectCourse: (course: Course) => void; // 추가된 콜백
}

export default function SavedCourse({ onClose, onSelectCourse }: SavedCourseProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // 예시용 데이터 (실제로는 API 또는 props로 전달받을 수 있음)
    setCourses([
      {
        id: "1",
        title: "서울 도보여행",
        date: "2024-04-21",
        time: "13:00",
        places: [],
      },
      {
        id: "2",
        title: "부산 야경 드라이브",
        date: "2024-04-19",
        time: "20:00",
        places: [],
      },
    ]);
  }, []);

  return (
    <div className={style.modalBackground} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h3>저장된 코스들</h3>
        <div className={style.courseList}>
          {courses.map((course) => (
            <div className={style.courseItem} key={course.id}>
              <span className={style.date}>{course.date}</span>
              <span className={style.title}>{course.title}</span>
              <button
                className={style.loadButton}
                onClick={() => {
                  onSelectCourse(course);
                  onClose();
                }}
              >
                불러오기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import style from "../less/ResultList.module.less";

interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  category: "음식점" | "카페" | "놀거리" | "명소";
}

interface ResultListProps {
  places: Place[];
  onAdd: (place: Place) => void;
}

export default function ResultList({ places, onAdd }: ResultListProps) {
  return (
    <div className={style.resultList}>
      {places.map((place) => (
        <div key={place.id} className={style.card}>
          <img src={place.imageUrl} alt={place.name} className={style.image} />
          <div className={style.info}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
          </div>
          <button className={style.addButton} onClick={() => onAdd(place)}>
            추가하기
          </button>
        </div>
      ))}
    </div>
  );
}

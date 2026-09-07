import { FilterStatus } from "../types";
interface FilterButtonsProps {
  currentFilter: FilterStatus;
  onChange: (filter: FilterStatus) => void;
}

function FilterButtons({ currentFilter, onChange }: FilterButtonsProps) {
  return (
    <section className="filters">
      <button
        className={"filter-button" + (currentFilter === "all" ? " active" : "")}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={
          "filter-button" + (currentFilter === "watched" ? " active" : "")
        }
        onClick={() => onChange("watched")}
      >
        watched
      </button>
      <button
        className={
          "filter-button" + (currentFilter === "unwatched" ? " active" : "")
        }
        onClick={() => onChange("unwatched")}
      >
        unwatched
      </button>
    </section>
  );
}

export default FilterButtons;

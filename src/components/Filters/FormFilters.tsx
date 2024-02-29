import { Input, Select } from "antd";
import styles from "./styles.module.css";
import { useState } from "react";
import useAction from "../../hooks/useAction";
import { DefaultOptionType } from "antd/es/select";

const options: DefaultOptionType[] = [
  {
    label: "Название",
    value: "product",
  },
  {
    label: "Бренд",
    value: "brand",
  },
  {
    label: "Цена",
    value: "price",
  },
];

const Filters = () => {
  const { FilterItems, FetchItems } = useAction();

  const [selectedFilter, setSelectedFilter] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = async (data: string) => {
    if (!data) {
      FetchItems(1);
    }
    if (data && selectedFilter) {
      setLoading(true);

      await FilterItems({
        [selectedFilter]: selectedFilter === "price" ? +data : data,
      });
    }
    setLoading(false);
  };

  return (
    <div className={styles.form}>
      <h3>Фильтровать</h3>
      <Select
        placeholder="Фильтр по"
        options={options}
        style={{ width: "150px" }}
        onChange={(value) => {
          setSelectedFilter(value);
          setFilterValue("");
        }}
      />

      <Input.Search
        disabled={!selectedFilter}
        allowClear
        loading={loading}
        type={selectedFilter === "price" ? "number" : "default"}
        style={{ width: "250px", marginLeft: 10 }}
        value={filterValue}
        itemType="number"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
        onSearch={onSearch}
      />
    </div>
  );
};

export default Filters;

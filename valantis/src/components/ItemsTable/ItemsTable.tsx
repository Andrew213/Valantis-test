import { Pagination, Spin, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import useAction from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    render: (value: any) => `${value} руб.`,
  },
  {
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
  },
];

const ItemsTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { items, loading } = useTypedSelector((store) => store);

  const { FetchItems } = useAction();

  useEffect(() => {
    FetchItems(1);
  }, []);

  // useEffect(() => {
  //   console.log(`items `, items);
  // }, [items]);

  const handleOnChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      FetchItems(page);
    },
    [currentPage]
  );

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowKey="id"
        size="small"
      />
      <Pagination
        total={300}
        defaultPageSize={50}
        current={currentPage}
        onChange={handleOnChange}
      />
    </>
  );
};

export default ItemsTable;

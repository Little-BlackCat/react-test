import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Checkbox, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formSelector } from "../store/slices/formSlice";
import { useAppDispatch } from "../store/store";
import { DataType, handleSelectAll, loadingProcess, onSelectChange, resultSelector } from "../store/slices/resultSlice";

const Result = () => {

  // const [loading, setLoading] = useState<boolean>(false);
  // const [hasSelected, setHasSelected] = useState<boolean>(false);
  const formReducer = useSelector(formSelector)
  const resultReducer = useSelector(resultSelector)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const selectedRowKeys = resultReducer.selectedRowKeys
  const hasSelected = resultReducer.hasSelected
  const loading = resultReducer.loading

  const columns: ColumnsType<DataType> = [
    {
      title: t("name"),
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender)
    },
    {
      title: t("telephone"),
      dataIndex: "telephoneNumber",
      sorter: (a, b) => a.telephoneNumber.localeCompare(b.telephoneNumber)
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality)
    },
    {
      title: t("management"),
      dataIndex: "management",
      // render: (_, record: { key: React.Key }) =>
      //   dataSource.length >= 1 ? (
      //     <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
      //       <a>Delete</a>
      //     </Popconfirm>
      //   ) : null,
      // },
      render: () => <a href="">Edit</a>,
    },
  ]

  const dataSource: DataType[] = formReducer.resultData.map((data) => ({
    key: data.key as React.Key,
    fullName: data.fullName,
    gender: data.gender,
    telephoneNumber: data.telephoneNumber,
    nationality: data.nationality,
  }))

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange,
  }
  
  // const data: DataType[] = [];
  // for (let i = 0; i < 36; i++) {
  //   data.push({
  //     key: i,
  //     fullName: `Edward King ${i}`,
  //     gender: "Male",
  //     telephoneNumber: `London, Park Lane no. ${i}`,
  //     nationality: "Thai",     
  //   });
  // } // For Testing

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  )

  function handleRowSelectChange(newSelectedRowKeys: React.Key[]) {
    dispatch(onSelectChange(newSelectedRowKeys))
    console.log(`Selected row: ${newSelectedRowKeys}`)
  }

  function selectAllItems() {
    dispatch(handleSelectAll(dataSource))
  }

  // function onSelectChange(newSelectedRowKeys: any) {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  //   setHasSelected(newSelectedRowKeys.length > 0);
  // }

  // function handleSelectAll() {
  //   const newSelectedRowKeys =
  //     selectedRowKeys.length === data.length
  //       ? []
  //       : data.map((item) => item.key);
  //   console.log(`Selected All: ${newSelectedRowKeys}`)
  //   setSelectedRowKeys(newSelectedRowKeys);
  //   setHasSelected(newSelectedRowKeys.length > 0);
  // }

  function deleteData() {
    dispatch(loadingProcess(true))
    console.log(`Data prepare for delete: ${selectedRowKeys}`)
    setTimeout(() => {
      // setSelectedRowKeys([]);
      // setHasSelected(false);
      dispatch(loadingProcess(false))
    }, 1000);
  }

  useEffect(() => {
    console.log(`Data source : ${dataSource}`)
    console.log(`Selected All: ${selectedRowKeys}`)
  }, [selectedRowKeys])

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={selectAllItems}
          checked={selectedRowKeys.length === dataSource.length && selectedRowKeys.length > 0}
        >
          {t("selectAll")}
        </Checkbox>
        <Button onClick={deleteData} disabled={!hasSelected} loading={loading}>
          {t("deleteData")}
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <ConfigProvider renderEmpty={dataSource ? customizeRenderEmpty : undefined}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
          dataSource={dataSource}
        />
      </ConfigProvider>
    </>
  );
};

export default Result;

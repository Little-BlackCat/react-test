import React, { ReactEventHandler, useEffect } from "react";
import { Button, ConfigProvider, Checkbox, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteSelectData, editSelectData, formSelector } from "../store/slices/formSlice";
import { useAppDispatch } from "../store/store";
import { DataType, handleSelectAll, loadingProcess, onSelectChange, resultSelector, setDefualtData, setDefultSelected } from "../store/slices/resultSlice";

const Result = () => {

  const formReducer = useSelector(formSelector)
  const resultReducer = useSelector(resultSelector)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage();

  const resultData = formReducer.resultData
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
      render: (_, record: { key: React.Key }) => (
        <Button type="primary" onClick={() => editHandler(record.key)}>Edit</Button>
      )
    },
  ]

  // const dataSource: DataType[] = resultData.map((data) => ({
  //   key: data.key as React.Key,
  //   fullName: data.fullName,
  //   gender: data.gender,
  //   telephoneNumber: data.telephoneNumber,
  //   nationality: data.nationality,
  // }))

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange,
  }

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  )

  function handleRowSelectChange(newSelectedRowKeys: React.Key[]) {
    dispatch(onSelectChange(newSelectedRowKeys))
  }

  function selectAllItems() {
    dispatch(handleSelectAll(resultData))
  }

  function deleteData() {
    dispatch(loadingProcess(true))
    setTimeout(() => {
      dispatch(deleteSelectData(selectedRowKeys))
      dispatch(setDefultSelected())
      dispatch(loadingProcess(false))
    }, 1000);
    messageApi.open({
      type: "success",
      content: t("deletedMessageSuccess"),
    });
  }

  function editHandler(key: React.Key) {
    console.log("Hello!!!!", key)
    dispatch(editSelectData(key))
    window.location.reload()
  }
  
  useEffect(() => {
    dispatch(setDefualtData(resultData))
  }, [])

  return (
    <>
      {contextHolder}
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={selectAllItems}
          checked={selectedRowKeys.length === resultData.length && selectedRowKeys.length > 0}
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
      <ConfigProvider renderEmpty={resultData ? customizeRenderEmpty : undefined}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          pagination={{ defaultPageSize: 5 }}
          dataSource={resultData}
        />
      </ConfigProvider>
    </>
  );
};

export default Result;

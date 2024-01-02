import {
  Button,
  Flex,
  Input,
  Select,
  Form,
  DatePicker,
  Radio,
  Alert,
  message,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import {
  clearFormData,
  errorIdNumberState,
  formSelector,
  sendFormData,
  tempFormData,
} from "../store/slices/formSlice";
import { loadingSelector, loadingStatus } from "../store/slices/loadingSlice";
import Result from "./Result";

const Register = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { t } = useTranslation();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const formReducer = useSelector(formSelector);
  const loadingReducer = useSelector(loadingSelector);
  const optionNameTitle = [
    { value: "mr", label: "mr" },
    { value: "miss", label: "miss" },
  ];

  async function onFinish() {
    try {
      const values = await form.validateFields();
      const idNumber =
        values["id1"] +
        values["id2"] +
        values["id3"] +
        values["id4"] +
        values["id5"];

      if (idNumber.length >= 1 && idNumber.length < 13) {
        dispatch(errorIdNumberState(true));
      } else {

        const newValues = {
          ...values,
          key: formReducer.resultData.length === 0 ? 1 : formReducer.resultData[formReducer.resultData.length - 1].key + 1,
          fullName: `${values["firstName"]} ${values["lastName"]}`,
          birthday: values["birthday"].format("MM/DD/YYYY"),
          idNumber: idNumber,
          telephoneNumber:
            values["prefixTelephone"] + values["suffixTelephone"],
        };

        dispatch(errorIdNumberState(false));
        dispatch(sendFormData(newValues));
        console.log("Success:", newValues);

        setTimeout(() => {
          window.location.reload();
          messageApi.open({
            type: "success",
            content: t("successMessage"),
          });
        }, 1000);

      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { maxLength, value } = event.target;
    if (value.length >= maxLength) {
      const nextInput = inputRefs.current[index + 1];

      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  function handleCancel() {
    dispatch(errorIdNumberState(false));
    dispatch(clearFormData());
    form.resetFields(); //reset form
    window.location.reload();
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadingStatus(true));
    }, 1000);
    dispatch(loadingStatus(false));
  }, []);

  return (
    <Flex
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}
      {formReducer.errorIdNumber && (
        <Alert
          message="Error"
          description={t("errorIdNumberMessage")}
          type="error"
          showIcon
          style={{ position: "absolute", top: "5%", width: "50%" }}
          closable
        />
      )}
      {loadingReducer.loading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <Flex vertical={true} gap="large">
        <Form form={form} name="form" className="form" onFinish={onFinish}>
          <Flex gap="middle">
            {/* --- Name Title --- */}
            <Form.Item
              name="nameTitle"
              label={t("nameTitle")}
              rules={[{ required: true, message: t("validNameTitle") }]}
              style={{ width: "50%" }}
              initialValue={formReducer.tempData?.nameTitle}
            >
              <Select
                placeholder={t("nameTitle")}
                onSelect={(value) =>
                  dispatch(tempFormData({ nameTitle: value }))
                }
              >
                {optionNameTitle.map((title, index) => (
                  <Option key={index} value={title.value}>
                    {t(title.label)}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* --- First Name --- */}
            <Form.Item
              name="firstName"
              label={t("firstName")}
              rules={[{ required: true, message: t("validFirstName") }]}
              style={{ width: "100%" }}
              initialValue={formReducer.tempData?.firstName}
            >
              <Input
                type="text"
                pattern="[a-zA-Z\u0E00-\u0E7F]+"
                onChange={(event) =>
                  dispatch(tempFormData({ firstName: event.target.value }))
                }
              />
            </Form.Item>

            {/* --- Last Name --- */}
            <Form.Item
              name="lastName"
              label={t("lastName")}
              rules={[{ required: true, message: t("validLastName") }]}
              style={{ width: "100%" }}
              initialValue={formReducer.tempData?.lastName}
            >
              <Input
                type="text"
                pattern="[a-zA-Z\u0E00-\u0E7F]+"
                onChange={(event) =>
                  dispatch(tempFormData({ lastName: event.target.value }))
                }
              />
            </Form.Item>
          </Flex>

          <Flex gap="middle">
            {/* --- Birthday --- */}
            <Form.Item
              name="birthday"
              label={t("birthday")}
              rules={[
                {
                  type: "object" as const,
                  required: true,
                  message: t("validBirthday"),
                },
              ]}
              initialValue={
                formReducer.tempData.birthday
                  ? dayjs(formReducer.tempData.birthday)
                  : undefined
              }
            >
              <DatePicker
                format={"MM/DD/YYYY"}
                placeholder={t("dateFormat")}
                onChange={(value) => {
                  if (value) {
                    dispatch(
                      tempFormData({ birthday: value?.format("MM/DD/YYYY") })
                    );
                  }
                }}
              />
            </Form.Item>

            {/* --- Nationality --- */}
            <Form.Item
              name="nationality"
              label={t("nationality")}
              rules={[{ required: true, message: t("validNationalily") }]}
              style={{ width: "50%" }}
              initialValue={formReducer.tempData?.nationality}
            >
              <Select
                placeholder={t("selectNationality")}
                onSelect={(value) =>
                  dispatch(tempFormData({ nationality: value }))
                }
              >
                <Option value={t("nation")}>{t("nation")}</Option>
              </Select>
            </Form.Item>
          </Flex>

          <Flex gap="small" style={{ width: "90%" }}>
            {/* --- ID Number --- */}
            <Form.Item
              name="id0"
              label={t("idNumber")}
              style={{ marginInlineEnd: "-8px" }}
              initialValue=""
            />
            <Form.Item
              name="id1"
              style={{
                width: "10%",
                minWidth: "10%",
              }}
              initialValue={formReducer.tempData.id1}
            >
              <Input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[0] = el as unknown as HTMLInputElement;
                  }
                }}
                style={{
                  textAlign: "center",
                }}
                pattern="[0-9]{1}"
                maxLength={1}
                onChange={(event) => {
                  handleInputChange(event, 0),
                    dispatch(tempFormData({ id1: event.target.value }));
                }}
              />
            </Form.Item>
            -
            <Form.Item
              name="id2"
              style={{
                minWidth: "15%",
              }}
              initialValue={formReducer.tempData.id2}
            >
              <Input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[1] = el as unknown as HTMLInputElement;
                  }
                }}
                style={{
                  textAlign: "center",
                }}
                pattern="[0-9]{4}"
                maxLength={4}
                onChange={(event) => {
                  handleInputChange(event, 1),
                    dispatch(tempFormData({ id2: event.target.value }));
                }}
              />
            </Form.Item>
            -
            <Form.Item
              name="id3"
              style={{
                minWidth: "20%",
              }}
              initialValue={formReducer.tempData.id3}
            >
              <Input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[2] = el as unknown as HTMLInputElement;
                  }
                }}
                style={{
                  textAlign: "center",
                }}
                pattern="[0-9]{5}"
                maxLength={5}
                onChange={(event) => {
                  handleInputChange(event, 2),
                    dispatch(tempFormData({ id3: event.target.value }));
                }}
              />
            </Form.Item>
            -
            <Form.Item
              name="id4"
              style={{
                width: "20%",
                minWidth: "10%",
              }}
              initialValue={formReducer.tempData.id4}
            >
              <Input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[3] = el as unknown as HTMLInputElement;
                  }
                }}
                style={{
                  textAlign: "center",
                }}
                pattern="[0-9]{2}"
                maxLength={2}
                onChange={(event) => {
                  handleInputChange(event, 3),
                    dispatch(tempFormData({ id4: event.target.value }));
                }}
              />
            </Form.Item>
            -
            <Form.Item
              name="id5"
              style={{
                width: "10%",
                minWidth: "10%",
              }}
              initialValue={formReducer.tempData.id5}
            >
              <Input
                ref={(el) => {
                  if (el) {
                    inputRefs.current[4] = el as unknown as HTMLInputElement;
                  }
                }}
                style={{
                  textAlign: "center",
                }}
                pattern="[0-9]{1}"
                maxLength={1}
                onChange={(event) => {
                  handleInputChange(event, 4),
                    dispatch(tempFormData({ id5: event.target.value }));
                }}
              />
            </Form.Item>
          </Flex>

          <Flex>
            {/* --- Gender --- */}
            <Form.Item
              name="gender"
              label={t("gender")}
              rules={[{ required: true, message: t("validGender") }]}
              initialValue={formReducer.tempData?.gender}
            >
              <Radio.Group
                onChange={(e) =>
                  dispatch(tempFormData({ gender: e.target.value }))
                }
              >
                <Radio value={t("male")}>{t("male")}</Radio>
                <Radio value={t("female")}>{t("female")}</Radio>
                <Radio value={t("noSpecified")}>{t("noSpecified")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Flex>

          <Flex gap="small">
            {/* --- Telephone Number --- */}
            <Form.Item
              label={t("telephone")}
              name="prefixTelephone"
              rules={[{ required: true, message: "" }]}
              initialValue={formReducer.tempData?.prefixTelephone}
            >
              <Select
                onSelect={(value) =>
                  dispatch(tempFormData({ prefixTelephone: value }))
                }
                style={{
                  width: "80px",
                  textAlign: "right",
                }}
              >
                {formReducer.option.map((value, index) => (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            -
            <Form.Item
              name="suffixTelephone"
              rules={[
                {
                  required: true,
                  message: t("validTelephone"),
                },
              ]}
              initialValue={formReducer.tempData?.suffixTelephone}
            >
              <Input
                onChange={(e) =>
                  dispatch(tempFormData({ suffixTelephone: e.target.value }))
                }
                pattern="[0-9]{8}"
                maxLength={8}
              />
            </Form.Item>
          </Flex>

          <Flex>
            {/* --- Passport --- */}
            <Form.Item
              name="passport"
              label={t("passport")}
              initialValue={formReducer.tempData?.passport}
            >
              <Input
                onChange={(e) =>
                  dispatch(tempFormData({ passport: e.target.value }))
                }
                style={{
                  width: "300px",
                }}
                pattern="[0-9]{9}"
                maxLength={9}
              />
            </Form.Item>
          </Flex>

          <Flex
            style={{
              justifyContent: "space-between",
            }}
          >
            {/* --- Expected Salary --- */}
            <Form.Item
              name="expectedSalary"
              label={t("expectedSalary")}
              rules={[
                {
                  required: true,
                  message: t("validExpectedSalary"),
                },
              ]}
              initialValue={formReducer.tempData?.expectedSalary}
            >
              <Input
                onChange={(e) =>
                  dispatch(tempFormData({ expectedSalary: e.target.value }))
                }
                style={{
                  width: "270px",
                }}
                pattern="[0-9]+"
              />
            </Form.Item>

            {/* --- Button --- */}
            <Flex
              style={{
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              <Button onClick={handleCancel}>{t("clearData")}</Button>
              <Button htmlType="submit">{t("sendData")}</Button>
            </Flex>
          </Flex>
        </Form>

<Result />
        </Flex>
)}
    </Flex>
  );
};

export default Register;

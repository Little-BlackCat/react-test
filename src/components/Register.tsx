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
} from "antd";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { errorIdNumberState, formSelector  } from "../store/slices/formSlice";

const Register = () => {
  const [form] = Form.useForm()
  const { Option } = Select
  const { t } = useTranslation()
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const formReducer = useSelector(formSelector);

  useEffect(() => {

  }, [])

  async function onFinish() {
    try {
      const values = await form.validateFields();
      const idNumber = values["id1"] + values["id2"] +values["id3"] + values["id4"] + values["id5"]

      if ( idNumber.length >= 1 && idNumber.length < 13 ) {
        dispatch(errorIdNumberState(true))
      } else {
        const newValues = {
          ...values,
          birthday: values["birthday"].format("MM/DD/YYYY"),
          idNumber: idNumber,
          telephoneNumber: values["prefixTelephoe"] + values["suffixTelephone"]
        }
        dispatch(errorIdNumberState(false))
        console.log("Success:", newValues)

        messageApi.open({
          type: 'success',
          content: t("successMessage"),
        });
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { maxLength, value, name } = event.target;
    if (value.length >= maxLength) {
      const nextInput = inputRefs.current[index + 1]

      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  function handleCancel() {
    dispatch(errorIdNumberState(false))
    form.resetFields();    //reset form
  };

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
          description= {t("errorIdNumberMessage")}
          type="error"
          showIcon
          style={{ position: "absolute", top: '5%', width: "50%" }}
          closable
        />
      )}
      <Form
        form={form}
        name="form"
        className="form"
        onFinish={onFinish}
      >
        <Flex gap="middle">
          {/* --- Name Title --- */}
          <Form.Item
            name="nameTitle"
            label={t("nameTitle")}
            rules={[{ required: true, message: t("validNameTitle") }]}
            style={{ width: "50%" }}
          >
            <Select placeholder={t("nameTitle")}>
              <Option value={t("mr")}>{t("mr")}</Option>
              <Option value={t("miss")}>{t("miss")}</Option>
            </Select>
          </Form.Item>

          {/* --- First Name --- */}
          <Form.Item
            name="firstName"
            label={t("firstName")}
            rules={[{ required: true, message: t("validFirstName") }]}
            style={{ width: "100%" }}
          >
            <Input type="text" pattern="[a-zA-Z\u0E00-\u0E7F]+" />
          </Form.Item>

          {/* --- Last Name --- */}
          <Form.Item
            name="lastName"
            label={t("lastName")}
            rules={[{ required: true, message: t("validLastName") }]}
            style={{ width: "100%" }}
          >
            <Input type="text" pattern="[a-zA-Z\u0E00-\u0E7F]+" />
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
          >
            <DatePicker format={"MM/DD/YYYY"} placeholder={t("dateFormat")} />
          </Form.Item>
          
          {/* --- Nationality --- */}
          <Form.Item
            name="nationality"
            label={t("nationality")}
            rules={[{ required: true, message: t("validNationalily") }]}
            style={{ width: "50%" }}
          >
            <Select placeholder={t("selectNationality")}>
              <Option value={t("nation")}>{t("nation")}</Option>
            </Select>
          </Form.Item>
        </Flex>
        
        <Flex gap="small" style={{ width: "90%" }}>
          {/* --- ID Number --- */}
          <Form.Item
            name="id0"
            label={t("idNumber")}
            style={{ marginInlineEnd: "-8px"}}
            initialValue=""
          />
          
          <Form.Item
            name="id1"
            style={{
              width: "10%",
              minWidth: "10%"
            }}
            initialValue=""
          >
            <Input
              ref={(el) => {
                if (el) {
                  inputRefs.current[0] = el as unknown as HTMLInputElement
                }
              }}
              style={{
                textAlign: "center",
              }}
              pattern="[0-9]{1}"
              maxLength={1}
              onChange={(event) => handleInputChange(event, 0)}
            />
          </Form.Item>
          - 
          <Form.Item
            name="id2"
            style={{
              minWidth: "15%"
            }}
            initialValue=""
          >
            <Input
              ref={(el) => {
                if (el) {
                  inputRefs.current[1] = el as unknown as HTMLInputElement
                }
              }}
              style={{
                textAlign: "center",
              }}
              pattern="[0-9]{4}"
              maxLength={4}
              onChange={(event) => handleInputChange(event, 1)}
            />
          </Form.Item> 
          -
          <Form.Item
            name="id3"
            style={{
              minWidth: "20%"
            }}
            initialValue=""
          >
            <Input
              ref={(el) => {
                if (el) {
                  inputRefs.current[2] = el as unknown as HTMLInputElement
                }
              }}
              style={{
                textAlign: "center",
              }}
              pattern="[0-9]{5}"
              maxLength={5}
              onChange={(event) => handleInputChange(event, 2)}
            />
          </Form.Item> 
          -
          <Form.Item
            name="id4"
            style={{
              width: "20%",
              minWidth: "10%"
            }}
            initialValue=""
          >
            <Input
              ref={(el) => {
                if (el) {
                  inputRefs.current[3] = el as unknown as HTMLInputElement
                }
              }}
              style={{
                textAlign: "center",
              }}
              pattern="[0-9]{2}"
              maxLength={2}
              onChange={(event) => handleInputChange(event, 3)}
              />
          </Form.Item> 
          -
          <Form.Item
            name="id5"
            style={{
              width: "10%",
              minWidth: "10%"
            }}
            initialValue=""
          >
            <Input
              ref={(el) => {
                if (el) {
                  inputRefs.current[4] = el as unknown as HTMLInputElement
                }
              }}
              style={{
                textAlign: "center",
              }}
              pattern="[0-9]{1}"
              maxLength={1}
              onChange={(event) => handleInputChange(event, 4)}
            />
          </Form.Item>
        </Flex>
        
        <Flex>
          {/* --- Gender --- */}
          <Form.Item
            name="gender"
            label={t("gender")}
            rules={[{ required: true, message: t("validGender") }]}
          >
            <Radio.Group>
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
            name="prefixTelephoe"
            rules={[{ required: true, message: "" }]}
            initialValue=""
          >
            <Select
              defaultValue=""
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
            rules={[{
              required: true, message: t("validTelephone")
            }]}
          >
            <Input
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
          >
            <Input
              style={{
                width: "300px",
              }}
              pattern="[0-9]{9}"
              maxLength={9}
            />
          </Form.Item>
        </Flex>

        <Flex style={{
          justifyContent: "space-between",
        }}>
          {/* --- Expected Salary --- */}
          <Form.Item
            name="expectedSalary"
            label={t("expectedSalary")}
            rules={[{
              required: true,
              message: t("validExpectedSalary")
            }]}
          >
            <Input
              style={{
                width: "270px",
              }}
              pattern="[0-9]+"
            />
          </Form.Item>
          
          {/* --- Button --- */}
          <Flex style={{
            justifyContent: "space-evenly",
            width: "50%"
          }}>
            <Button onClick={handleCancel}>
              {t("clearData")}
            </Button>
            <Button htmlType="submit">
              {t("sendData")}
            </Button>
          </Flex>
        </Flex>

      </Form>
    </Flex>
  );
};

export default Register;

import { Select, Space } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const Languages = () => {
  return (
    <div className="languages">
      <Space wrap>
        <Select
          defaultValue="English"
          style={{ width: 100, textAlign: "left" }}
          onChange={handleChange}
          options={[
            { value: 'english', label: 'English' },
            { value: 'thai', label: 'Thai' },
          ]}
        />
      </Space>
    </div>
  )
}

export default Languages
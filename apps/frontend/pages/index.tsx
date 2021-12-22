import { CiCircleFilled } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';

const IndexPage = () => {
  return (
    <div>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker />
        <CiCircleFilled />
      </Space>
    </div>
  );
};
export default IndexPage;

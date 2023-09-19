import React,{useCallback} from 'react';
import { Layout, message, Upload, Button} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function ManualAntUpload() {
  const [file, setFile] = React.useState(null);
  const upload = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', 'Category 1234');
      formData.append('description', 'Mo ta 1234');

     await axios.post('http://localhost:3005/media/upload-single', formData)
     message.success('Upload thành công');
    } catch (error) {
      console.log('◀◀◀ error ▶▶▶',error);
    }
  }, [file]);
  return (
    <Layout>
      <Content style={{ padding: 12 }}>
        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>

        <Button
          onClick={upload}
        >
          Submit
        </Button>
      </Content>
    </Layout>
  );
}
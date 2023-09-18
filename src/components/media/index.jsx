import React,{useCallback} from 'react';
import { Layout, message, Upload, Button,Form } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { axiosClient } from "helper/axiosClient";
export default function ManualAntUpload() {
  const [file, setFile] = React.useState(null);
  const upload = useCallback(async () => {
    // try {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   formData.append('name', 'Category 1234');
    //   formData.append('description', 'Mo ta 1234');

    //  const res= await axios.post('http://localhost:3005/media/upload-single', formData)
    //  console.log('◀◀◀ res ▶▶▶',res.data.payload._id);
      

    //   // CASE 1
    //   // const newItem = res.data.payload;

    //   // setProducts((preState) => ([
    //   //   ...preState,
    //   //   newItem,
    //   // ]))
    // } catch (error) {
    //   console.log('◀◀◀ error ▶▶▶',error);
    // }
  }, [file]);
  return (
    <Layout>
      <Content style={{ padding: 12 }}>
        <Upload
          beforeUpload={(file) => {
            console.log('◀◀◀ file ▶▶▶',file);
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
import { Button, DatePicker, Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import styles from '../Msa.module.css'
const AddMsa = () => {
  return (
    <>
    <div className={styles.AddMsa}>
    <div>
        <h3>ADD MASTER SERVICE AGREEMENT</h3>
    </div>
    <div>
    <Form
    //   form={form}
      name="complex-form"
    //   onFinish={onFinish}
      style={{ maxWidth: 600 }}
      >
        <Form.Item name="msa_ref_id" required>MSA Reference ID <br/>
        <Input name="msa_ref_id" />
      </Form.Item>
      <Form.Item name="client_name"  required>Client Name<br/>
        <Input name="client_name" />
      </Form.Item>
      <Form.Item name="region"  required>Region<br/>
        <Input name="region" />
      </Form.Item>
      <Form.Item name="start_date"  required>Start Date<br/>
        <DatePicker/>
      </Form.Item><Form.Item name="end_date" required>End Date<br/>
        <DatePicker />
      </Form.Item>
      <Form.Item name="file" label="Upload">
          <Upload 
          action="" 
          listType="picture-card"
          fileList={[]}>
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
      <Form.Item name="comments">Comments/Remarks<br/>
        <TextArea rows={4} name="comments" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
            Submit
          </Button>
      </Form>
    </div>
    </div>
    </>
  )
}

export default AddMsa

import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Spin,
  Upload,
} from "antd";
import {
  FilePdfOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import styles from "../Msa.module.css";
import { AddMsaPropsType } from "./types";
import Toast from "../../../Components/Toast/Toast";
const AddMsa = ({
  SubmitAddMsa,
  fileName,
  msaRefId,
  msaAdded,
  handleFileUpload,
  handleInputChange,
  handleDateChange,
  handleEndDateChange,
  handleAddMsa,
  isModalVisible,
  handleCancel,
  isLoading,
  handleOk,
  fullPageSpinner,
  validateStartDate,
}: AddMsaPropsType) => {
 console.log("msa addded for toaster",msaAdded);
  return (
    <>
      <div className={styles.AddMsa}>
        <div>
          <h3 className={styles.AddMsa_Heading}>
            ADD MASTER SERVICE AGREEMENT
          </h3>
        </div>
        <div className={styles.AddMsaDetails}>
          <h4 className={styles.AddMsaDetails_Heading}>
            Master Service Agreement Details
          </h4>
          <Form
            name="complex-form"
            encType="multipart/form-data"
            style={{ maxWidth: 600 }}
          >
            <div className={styles.AddMsaDetails_row1}>
              <Form.Item
                className={styles.AddMsaDetails_row1_col1}
                name="msa_ref_id"
                
    
              >
                MSA Reference ID <br />
                <Input
                  name="msa_ref_id"
                  value={msaRefId}
                  readOnly
                  className={styles.AddMsaDetails_inputs}
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col2}
                name="client_name"
             
              >
                Client Name
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <Input
                  name="client_name"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row1_col3}
                name="region"
              >
                Region
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <Input
                  name="region"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleInputChange}
                  required
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row2}>
              <Form.Item
                className={styles.AddMsaDetails_row2_col1}
                name="start_date"
                
              >
                Start Date
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <DatePicker
                  //format="DD-MM-YYYY"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleDateChange}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.AddMsaDetails_row2_col2}
                name="end_date"
              >
                End Date
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <DatePicker
                  //format="DD-MM-YYYY"
                  className={styles.AddMsaDetails_inputs}
                  onChange={handleEndDateChange}
                  required
                />
              </Form.Item>
            </div>
            <div className={styles.AddMsaDetails_row3}>
              <Form.Item name="file" className={styles.AddMsaDetails_row3_col1}>
                Upload Master Service Agreement
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                {fileName ? (
                  <div>
                    <FilePdfOutlined
                      className={styles.AddMsaDetails_row3_col1_fileicon}
                    />
                    <br />
                    <p className={styles.AddMsaDetails_row3_col1_filename}>
                      {fileName}
                    </p>
                  </div>
                ) : (
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={[]}
                    accept=".pdf"
                    customRequest={handleFileUpload}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item
                name="comments"
                className={styles.AddMsaDetails_row3_col2}
              >
                Comments/Remarks
                <span className={styles.AddMsaDetails_star}>*</span>
                <br />
                <TextArea
                  rows={4}
                  name="comments"
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <Button
              className={styles.AddMsaDetails_Button}
              type="primary"
              htmlType="submit"
              onClick={handleAddMsa}
            >
              Add MSA
            </Button>
            <Modal
              title="Confirm Add MSA"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {fullPageSpinner ? (
                <>
                  <Flex align="center" gap="middle">
                    <Spin size="small" />
                  </Flex>
                </>
              ) : (
                <></>
              )}
              <p>Do you really want to add MSA?</p>
            </Modal>
          </Form>
          {/* {fullPageSpinner?<>
        <Flex align="center" gap="middle">
    <Spin size="large" />
  </Flex></>:<></>} */}
          {msaAdded ? (
            <Toast messageType="success" message="MSA Added"></Toast>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AddMsa;

import React, { useState } from 'react'
import styles from '../Msa.module.css'
import { Button, DatePicker, Flex, Form, Input, Modal, Spin, Upload } from 'antd'
import { CloseOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { EditMsaHandlertype } from './types'
import { values } from '@ant-design/plots/es/core/utils'
import moment, { Moment } from 'moment'
import { ToastBody } from 'react-bootstrap'
import Toast from '../../../Components/Toast/Toast'
import { useNavigate } from 'react-router'
const EditMsa = ({
  msaData,
  msa_ref_id,
  msaEdited,
  handleEditMsa,
  isModalVisible,
  handleCancel,
  isLoading,
  handleInputChange,
  handleDateChange,
  handleEndDateChange,
  SubmitEditMsa,
  fileCancel,
  fileUpload,
  showFile,
  handleFileUpload,
  fileName,
  handleOk,
  fullPageSpinner,
  validateStartDate,
  validateClientName,
  validateRegion,
  spinning
}:EditMsaHandlertype) => {
  console.log("start date:", msaData.start_date)
  const  navigate=useNavigate()
  const formattedStartDate = moment(msaData.start_date);
  console.log("selected start date", formattedStartDate)
  const formattedEndDate = moment(msaData.end_date);

  return (
    <>
    <div className={styles.AddMsa}>
    <div>
        <h3 className={styles.AddMsa_Heading}>EDIT MASTER SERVICE AGREEMENT</h3>
    </div>
    <div className={styles.AddMsaDetails}>
        <h4 className={styles.AddMsaDetails_Heading}>Master Service Agreement Details</h4>
    <Form
      name="complex-form"
     encType='multipart/form-data'
      style={{ maxWidth: 600 }}
      requiredMark={false}
      >
        <div className={styles.AddMsaDetails_row1}>
        <Form.Item 
        className={styles.AddMsaDetails_row1_col1}
        name="msa_ref_id"
        labelCol={{span:24}}
                wrapperCol={{span:24}}
                label="MSA Reference ID"
                valuePropName={msa_ref_id}
        >
        <Input 
        name="msa_ref_id"
        value={msa_ref_id}
        readOnly
        className={styles.AddMsaDetails_inputs}
        />
      </Form.Item>
      <Form.Item 
    className={styles.AddMsaDetails_row1_col2}
      name="client_name"  
      required
      label={<div>Client Name
        <span style={{ color: 'red' }}> *</span></div>
      }
       labelCol={{span:24}}
       wrapperCol={{span:24}}
       rules={[
        {
          validator:validateClientName
        },
        { 
          pattern: /^.{5,}$/, 
          message: 'Client name must contain at least 5 characters' 
        }
      ]}
  >
        <Input
         name="client_name" 
         value={msaData.client_name}
         className={styles.AddMsaDetails_inputs}
         onChange={handleInputChange}
/>      </Form.Item>
      <Form.Item 
        className={styles.AddMsaDetails_row1_col3}

      name="region"
      valuePropName={msaData.region}
      label={<div>Region
        <span style={{ color: 'red' }}> *</span></div>
      }
       labelCol={{span:24}}
       wrapperCol={{span:24}}
       rules={[
        {
          validator:validateRegion
        },
      //   { 
      //     pattern: /^[a-zA-Z]+$/, 
      //   message: 'Region must be letters' 
      // }
    ]} 
      >
        <Input 
        name="region"
        value={msaData.region}
        onChange={handleInputChange}
        className={styles.AddMsaDetails_inputs}
        />
      </Form.Item>
      </div>
      <div className={styles.AddMsaDetails_row2}>
      <Form.Item 
              className={styles.AddMsaDetails_row2_col1}

      name="start_date"
      label={<div>Start Date
        <span style={{ color: 'red' }}> *</span></div>
      }
       labelCol={{span:24}}
       wrapperCol={{span:24}}
       rules={[
        { required: true, message: 'Please enter the Start Date' },
        
    ]}
      required>
        <DatePicker 
        className={styles.AddMsaDetails_inputs} 
        format="YYYY-MM-DD"
        
        onChange={handleDateChange}/>
      </Form.Item>
      <Form.Item 
              className={styles.AddMsaDetails_row2_col2}

      name="end_date" 
      label={<div>End Date
        <span style={{ color: 'red' }}> *</span></div>
      }
       labelCol={{span:24}}
       wrapperCol={{span:24}}
       rules={[
        { required: true, message: 'Please enter the End Date' },
        {
          validator:validateStartDate
        }
    ]}

      required>
        <DatePicker 
        format="YYYY-MM-DD"
        className={styles.AddMsaDetails_inputs} 
        onChange={handleEndDateChange}/>
      </Form.Item>
      </div>
      <div className={styles.AddMsaDetails_row3}>

      <Form.Item 
      name="file" 
      className={styles.AddMsaDetails_row3_col1}
      label={<div>Upload Master Service Agreement
        <span style={{ color: 'red' }}> *</span></div>
      }
       labelCol={{span:24}}
       wrapperCol={{span:24}}
     >
      {showFile?
            <div className={styles.container_file}>
              <CloseOutlined  
              className={styles.EditMsaDetails_row3_col1_closeicon}
              onClick={fileCancel}/>
               <a
            className={styles.document_link } 
            href={msaData.msa_doclink}>
            <FilePdfOutlined className={styles.AddMsaDetails_row3_col1_fileicon}/>
            
            <br/>
           <div className={styles.msa_doclink_filename}>
            <p className={styles.AddMsaDetails_row3_col1_filename}>
              {msa_ref_id}.pdf
              </p>
              </div>
              </a>
            </div>
            :(fileName?
              <>
              <div>
                    <FilePdfOutlined
                      className={styles.AddMsaDetails_row3_col1_fileicon}
                    />
                    <br />
                    <p className={styles.AddMsaDetails_row3_col1_filename}>
                      {fileName}
                    </p>
                  </div>
              </>:<>
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
              </>)
            } 
            
            
        </Form.Item>
      <Form.Item 
      name="comments"
      className={styles.AddMsaDetails_row3_col2}
      label={<div>Comments/Remarks
                  <span style={{ color: 'red' }}> *</span></div>
                }
                 labelCol={{span:24}}
                 wrapperCol={{span:24}}>
        <TextArea rows={4} name="comments" onChange={handleInputChange}/>
      </Form.Item>
      </div>
      <Button
      className={styles.AddMsaDetails_Button}
      type="primary" 
      htmlType="submit"
      onClick={handleEditMsa}
      >
            Edit MSA
          </Button>
          <Modal
        title="Confirm Edit MSA"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
          >
            Yes
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            No
          </Button>,
        ]}
      >

      </Modal>
      <Spin spinning={spinning} fullscreen />

      </Form>
      {msaEdited?<Toast 
      messageType="success" 
      message='MSA Updated'
      ></Toast>:<></>}
 
    </div>
    </div>
    </>
  )
}

export default EditMsa

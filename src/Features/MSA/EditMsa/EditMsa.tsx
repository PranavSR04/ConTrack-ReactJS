import React, { useState } from 'react'
import styles from '../Msa.module.css'
import { Button, DatePicker, Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { EditMsaHandlertype } from './types'
import { values } from '@ant-design/plots/es/core/utils'
import moment, { Moment } from 'moment'
const EditMsa = ({
  msaData,
  msa_ref_id,
  handleInputChange,
  handleDateChange,
  handleEndDateChange,
  SubmitEditMsa
}:EditMsaHandlertype) => {
  console.log("start date:", msaData.start_date)
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
      >
        <div className={styles.AddMsaDetails_row1}>
        <Form.Item 
        className={styles.AddMsaDetails_row1_col1}
        name="msa_ref_id" 
        >MSA Reference ID <br/>
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
      required>Client Name
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>
        <Input
         name="client_name" 
         value={msaData.client_name}
         className={styles.AddMsaDetails_inputs}
         onChange={handleInputChange}
/>      </Form.Item>
      <Form.Item 
        className={styles.AddMsaDetails_row1_col3}

      name="region"  
      required>Region
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>
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
      required>Start Date
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>

        <DatePicker 
        className={styles.AddMsaDetails_inputs} 
        format="YYYY-MM-DD"
        onChange={handleDateChange}/>
      </Form.Item>
      <Form.Item 
              className={styles.AddMsaDetails_row2_col2}

      name="end_date" 
      
      required>End Date
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>

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
      >Upload Master Service Agreement
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>
            
            <Upload
          action="" 
          listType="picture-card"
          fileList={[]}
          
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
            </Upload>
            
        </Form.Item>
      <Form.Item 
      name="comments"
      className={styles.AddMsaDetails_row3_col2}
      >Comments/Remarks
      <span className={styles.AddMsaDetails_star}>*</span>
      <br/>
        <TextArea rows={4} name="comments" onChange={handleInputChange}/>
      </Form.Item>
      </div>
      <Button
      className={styles.AddMsaDetails_Button}
      type="primary" 
      htmlType="submit"
      onClick={SubmitEditMsa}
      >
            Edit MSA
          </Button>
      </Form>
    </div>
    </div>
    </>
  )
}

export default EditMsa

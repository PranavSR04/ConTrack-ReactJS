import { Button, Card } from 'antd'
import React from 'react'
import { DocumentsPropType } from './types'
import styles from './Documents.module.css'
import { FilePdfFilled } from '@ant-design/icons'

const Documents = ({contractDocuments, contractRefId, clientName, loading, addendums}:DocumentsPropType) => {
  return (
    <>
    <Card className={`${styles.maincontainer__documents}`} loading={loading}>          
        <div className={`${styles.maincontainer__documents__title}`}>
            <h2>Documents</h2>
        </div>
        <div className={`${styles.maincontainer__documents__body}`}>
            <div className={`${styles.maincontainer__documents__body__contract}`}>
                <FilePdfFilled style={{fontSize:"2rem", color:"#dc143c"}} />
                <a href={contractDocuments} target="_blank">{contractRefId} {clientName} Contract</a>
            </div>
            {addendums?.map((addendum, index) => (
                <div key={addendum.id} className={styles.maincontainer__documents__body__contract}>
                    <FilePdfFilled style={{ fontSize: "2rem", color:"#dc143c"}} />
                    <a href={addendum.addendum_doclink|| '#'} target="_blank">
                        Addendum {index + 1}
                    </a>
                </div>
            ))}
        </div>
    </Card>
    <Button type="primary" danger style={{ marginTop:"2rem"}}>
      Close Contract
    </Button>
    </>
  )
}

export default Documents

import React from 'react'
import { MemberCommentsPropType } from './types'
import styles from './MemberComments.module.css'
import { Card } from 'antd'
import MemberCards from './MemberCards'

const MemberComments = ({comments, associatedUsers, loading}: MemberCommentsPropType) => {
  return (
    <div className={`${styles.maincontainer__membercomments}`}>
        <Card className={`${styles.maincontainer__membercomments__members}`} loading={loading}>
            <div className={`${styles.maincontainer__membercomments__members__title}`}>
                <h2>Associated Members</h2>
            </div>
            <div className={`${styles.maincontainer__membercomments__members__body}`}>
                <MemberCards associatedUsers={associatedUsers} />
            </div>
        </Card>
        <Card className={`${styles.maincontainer__membercomments__comments}`} loading={loading}>
            <div className={`${styles.maincontainer__membercomments__comments__title}`}>
                <h2>Comments/Remarks</h2>
            </div>
            <div className={`${styles.maincontainer__membercomments__comments__body}`}>
                <p>{comments}</p>
            </div>
        </Card>
    </div>
  )
}

export default MemberComments

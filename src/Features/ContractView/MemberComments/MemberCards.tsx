import React from 'react'
import { AssociatedUsersType } from './types'
import { Card } from 'antd'
import styles from './MemberComments.module.css'

const MemberCards = ({associatedUsers}: {associatedUsers:AssociatedUsersType[]}) => {
  return (
    <>
        <Card>
            <div className={`${styles.maincontainer__membercomments__members__body__wrapper}`}>
                {associatedUsers.map((user:AssociatedUsersType)=>{
                    return <div key={user.id} className={`${styles.maincontainer__membercomments__members__body__wrapper__data}`}>
                        <p>{user.user_name}</p>
                    </div>
                })} 
            </div>
        </Card>
    </>
  )
}

export default MemberCards

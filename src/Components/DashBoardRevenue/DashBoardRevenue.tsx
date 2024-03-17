import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd'
import React from 'react'
import CountUp from 'react-countup';
import { useCountUp } from 'react-countup';
import styles from './DashBoardRevenue.module.css'
interface DashBoardRevenueProps {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  responsetype:string;
}

const formatter = (value: number) => <CountUp end={value} separator="," /> ;

const DashBoardRevenue = ({currentMonthRevenue,previousMonthRevenue,responsetype}:DashBoardRevenueProps) => {
  if(currentMonthRevenue===0){
    currentMonthRevenue=1;
  }
  if(previousMonthRevenue===0){
    previousMonthRevenue=1;
  }
  const difference=((currentMonthRevenue-previousMonthRevenue)/previousMonthRevenue)*100;
  const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />;
  return (
    <Row gutter={16}>
    <Col span={12}>
      <Card style={{width:'135px',height:'120px',padding:'0px',transform:'scale', backgroundColor:'#f4f4f4'}}>
      <p style={{fontSize:'15px', paddingLeft:'13%'}}>{responsetype}</p> 
      <CountUp end={currentMonthRevenue} style={{fontSize:'20px', fontWeight:'600', marginLeft:'15px'}}/>
      
      <Statistic className={styles.statistic}  
          value={Math.abs(difference)}
          precision={1}
          valueStyle={{ color: difference >= 0 ? '#3f8600' : 'red' }}
          prefix={arrowIcon}
          suffix="%"
        />
      </Card>
      
    </Col>
  </Row>
  )
}

export default DashBoardRevenue

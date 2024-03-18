import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup';
import styles from './DashBoardRevenue.module.css'
export interface DashBoardRevenueProps {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  responsetype:string;
}

const DashBoardRevenue = ({currentMonthRevenue,previousMonthRevenue,responsetype}:DashBoardRevenueProps) => {
  if(currentMonthRevenue===undefined){
    currentMonthRevenue=0;
  }
  if(previousMonthRevenue===0){
    previousMonthRevenue=1;
  }
  const difference=((currentMonthRevenue-previousMonthRevenue)/previousMonthRevenue)*100;
  // const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />;
  const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} data-testid="up-arrow" /> : <ArrowDownOutlined style={{ color: 'red' }} data-testid="down-arrow" />;
console.log({currentMonthRevenue})
console.log({previousMonthRevenue})

  return (
    <Row gutter={16}>
    <Col span={12}>
      <Card style={{width:'135px',height:'120px',padding:'0px',transform:'scale', backgroundColor:'#f4f4f4', border:'solid 2px #f9f9f9'}}>
      <p style={{fontSize:'15px', paddingLeft:'13%', marginBottom:'0.1rem'}}>{responsetype}</p> 
      {/* <CountUp end={currentMonthRevenue} style={{fontSize:'20px', fontWeight:'600', marginLeft:'10.8px'}}/> */}
      <div style={{fontSize:'15px', fontWeight:'600', marginLeft:'10.8px'}}>
      <span>USD&nbsp;</span>
      <CountUp end={currentMonthRevenue/1000.00}/>
      <span>k&nbsp;</span>
    </div>
      <Statistic className={styles.statistic}  
          value={Math.abs(difference)}
          precision={1}
          valueStyle={{ color: difference >= 0 ? '#3f8600' : 'red' }}
          prefix={arrowIcon}
          suffix="%"
          style={{marginLeft:'0.9rem', transform:'scale(1.2)', marginTop:'0.2rem'}}
        />
      </Card>
      
    </Col>
  </Row>
  )
}

export default DashBoardRevenue

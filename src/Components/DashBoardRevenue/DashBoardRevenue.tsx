import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup';
export interface DashBoardRevenueProps {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  responsetype:string;
}

const DashBoardRevenue = ({currentMonthRevenue,previousMonthRevenue,responsetype}:DashBoardRevenueProps) => {
  if(currentMonthRevenue===0){
    currentMonthRevenue=1;
  }
  if(previousMonthRevenue===0){
    previousMonthRevenue=1;
  }
  const difference=((currentMonthRevenue-previousMonthRevenue)/previousMonthRevenue)*100;
  // const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />;
  const arrowIcon = difference >= 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} data-testid="up-arrow" /> : <ArrowDownOutlined style={{ color: 'red' }} data-testid="down-arrow" />;

  return (
    <Row gutter={16}>
    <Col span={12}>
      
      <Card style={{width:'240px', backgroundColor:'#f4f4ff', transform:'scale(0.5)',borderRadius:'15px', boxShadow:'black ,0.5px'}}>
      <p style={{marginLeft:'80px',transform:'scale(1.6)'}}>{responsetype}</p>
      <CountUp end={currentMonthRevenue} prefix="$ " style={{fontSize:'32px', fontWeight:'600', marginLeft:'15px'}}/>
      <Statistic 
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

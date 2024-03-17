
// import { Card, Col, Row } from 'antd'
// import React from 'react'
// import CountUp from 'react-countup';
// interface countType{
//     contractCount:number
//     Contract:string
// }
// const DashBoardCount = ({contractCount,Contract}:countType) => {
//   return (
//     <Row gutter={16}>
//     <Col span={12}>
      
//       <Card style={{width:'240px',height:'177px', backgroundColor:'#f4f4ff', transform:'scale(0.5)',borderRadius:'15px', boxShadow:'black ,0.5px'}}>
//       <p style={{ marginLeft:'80px',transform:'scale(1.6)' ,paddingRight:'10px'}}>{Contract}</p>
//       <CountUp end={contractCount}  style={{fontSize:'32px',paddingLeft:'25px', fontWeight:'600', marginLeft:'15px'}}/>
//       </Card>
      
//     </Col>
//   </Row>
//   )
// }
 

// export default DashBoardCount
import { Card, Col, Row } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

interface countType {
  contractCount: number;
  Contract: string;
}

const DashBoardCount = ({ contractCount, Contract }: countType) => {
  return (
    <Row gutter={16} data-testid="dashboard-count-row">
      <Col span={12}>
        <Card
          style={{
            width: '240px',
            height: '177px',
            backgroundColor: '#f4f4ff',
            transform: 'scale(0.5)',
            borderRadius: '15px',
            boxShadow: 'black ,0.5px'
          }}
          data-testid="dashboard-count-card"
        >
          <p style={{ marginLeft: '80px', transform: 'scale(1.6)', paddingRight: '10px' }} data-testid="dashboard-count-label">{Contract}</p>
          <CountUp end={contractCount} style={{ fontSize: '32px', paddingLeft: '25px', fontWeight: '600', marginLeft: '15px' }} data-testid="dashboard-count-value" />
        </Card>
      </Col>
    </Row>
  );
};

export default DashBoardCount

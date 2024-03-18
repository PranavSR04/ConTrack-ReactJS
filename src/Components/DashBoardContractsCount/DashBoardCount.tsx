
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
        // <Card
        //   style={{
        //     padding:'0px',
        //     marginLeft:'15px',
        //     width: '240px',
        //     height: '177px',
        //     backgroundColor: '#f4f4ff',
        //     transform: 'scale(.5)',
        //     borderRadius: '15px',
        //     boxShadow: 'black ,0.5px'
        //   }}
        //   data-testid="dashboard-count-card"
        // >
        //   <p style={{ marginLeft: '80px', transform: 'scale(1.6)', paddingRight: '10px' }} data-testid="dashboard-count-label">{Contract}</p>
        //   <CountUp end={contractCount} style={{ fontSize: '32px', paddingLeft: '25px', fontWeight: '600', marginLeft: '15px' }} data-testid="dashboard-count-value" />
        // </Card>
        <Row gutter={16}>
    <Col span={12}>
      <Card style={{width:'135px',height:'120px',padding:'0px',transform:'scale', backgroundColor:'#ffffff'}}>
      <p style={{fontSize:'15px', paddingLeft:'13%'}}>{Contract}</p> 
      <CountUp end={contractCount} style={{fontSize:'20px', fontWeight:'600', marginLeft:'22.6px ',marginBottom:'2px'}}/>
      
      {/* <Statistic className={styles.statistic}  
          value={Math.abs(difference)}
          precision={1}
          valueStyle={{ color: difference >= 0 ? '#3f8600' : 'red' }}
          prefix={arrowIcon}
          suffix="%"
        /> */}
      </Card>
      
    </Col>
  </Row>
  );
};

export default DashBoardCount

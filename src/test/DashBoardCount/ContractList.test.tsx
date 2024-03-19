import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { AllContractsPropType, ContractData } from "../../Features/AllContracts/types";
import AllContractsHandler from "../../Features/AllContracts/AllContractsHandler";
// describe('group1',()=>{
//     const mockTask:ContractData[]=[{id:'1', contract_ref_id:'A111',client_name: 'string',
//     start_date: 'string',
//     end_date: 'string',
//     contract_type: 'string',
//     contract_status: 'string',
//     du: 'string'},{id:'1', contract_ref_id:'A111',client_name: 'string',
//     start_date: 'string',
//     end_date: 'string',
//     contract_type: 'string',
//     contract_status: 'string',
//     du: 'string'}]
//     const mockData:AllContractsPropType={data:mockTask, onchangestatus:jest.fn(),theme:false}

//     it('renders',()=>{
        
//         render(<BrowserRouter> <AllContractsHandler {...mockData}/> </BrowserRouter>)
//         const taskCards=screen.getAllByRole('task-card');
//         expect(taskCards.length).toBe(mockTask.length)
//     })

//     // it('test3',()=>{
        
//     // })
// })

// it('test4',()=>{
    
// })

// api.ts

import { Condition } from "../types";


export const fetchDataFromApi = async (searchConditions: Condition, currentPage: number, pageSize: number) => {
    try {
        let  queryString:string[]=[];
        
        for(let condition in searchConditions){
let query=`${condition}=${searchConditions[condition]}`
queryString.push(query)
        }
        let queryStrin=queryString.join("&")
        
        //let apicall=`http://127.0.0.1:8000/api/contract/getlist?${queryStrin}&page=${currentPage}&per_page=${pageSize}`
        console.log('search query',queryStrin)
      const response = await fetch(`http://127.0.0.1:8000/api/contract/getlist?${queryStrin}&page=${currentPage}&per_page=${pageSize}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: [], total: 0 };
    }
  };
  
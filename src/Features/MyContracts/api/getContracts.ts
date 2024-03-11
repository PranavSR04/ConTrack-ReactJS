// api.ts

import { Condition } from ".";


export const fetchDataFromApi = async (searchConditions: Condition, currentPage: number, pageSize: number, userId:number) => {
    try {
      let  queryString:string[]=[];
        
      for(let condition in searchConditions){
    let query=`${condition}=${searchConditions[condition]}`
    queryString.push(query)
      }
      let queryStrings=queryString.join("&") //join the search queries
      
    console.log('search query',queryStrings)
      const response = await fetch(`http://127.0.0.1:8000/api/contract/myContracts/${userId}?${queryStrings}&page=${currentPage}&per_page=${pageSize}`);
  
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
  
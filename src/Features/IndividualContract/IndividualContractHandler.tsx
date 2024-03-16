import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import IndividualContract from './IndividualContract';
import { getContractData } from './api/getContractData';
import { LocationStateProps } from './types';
import { ContractApiType } from '../ContractView/FixedFee/types';
import { AxiosError } from 'axios';

const IndividualContractHandler = () => {
    const location = useLocation();
    let { id }= location.state as LocationStateProps;
    console.log('state id',id)
    const [responses, setResponses] = useState<ContractApiType|AxiosError<unknown, any>>()
    const [loading, setLoading] = useState<boolean>(true);

    let response;
    useEffect(() => {
        const fetchData = async () => {
          try {
            response = await getContractData(id);
            setResponses(response);
            setLoading(false)
            console.log("Contracts response: ", responses);
          } catch (error) {
            console.log("Error: ", error);
          }
        };
        fetchData();
      }, [response]);
  return (
    <>
      <IndividualContract id={id} responses={responses} loading={loading}/>
    </>
  )
}

export default IndividualContractHandler

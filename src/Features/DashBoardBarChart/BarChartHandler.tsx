import React, { useEffect, useState } from 'react';
import { fetchDuCount } from './api/getDuCount';
import BarComponent from './BarComponent';
import { duCountType } from './types';
interface ApiResponseDuCountType {
    du: string;
    TM: string; 
    FF: string; 
}

const BarChartHandler = () => {
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<duCountType[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setError('');
                setIsError(false);
                const response = await fetchDuCount();
                if (!response.duCounts) {
                    throw new Error('Invalid response structure');
                }
                setData(response.duCounts.map((duCount: ApiResponseDuCountType) => ({
                    du: duCount.du,
                    TM: parseInt(duCount.TM, 10),
                    FF: parseInt(duCount.FF, 10)
                })));
            } catch (error) {
                console.error(error);
                setIsError(true);
                setError('An error occurred with the request.');
            }
        };

        fetchCount();
    }, []);

    return (
        <div>
            <BarComponent data={data} />
        </div>
    );
}

export default BarChartHandler;

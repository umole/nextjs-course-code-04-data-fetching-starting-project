import React from 'react';
import { useEffect, useState } from 'react';

const lastSalesPage = () => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://nextjs-course-14f33-default-rtdb.firebaseio.com/sales.json');
            const data = await response.json();
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                  id: key,
                  username: data[key].customerName,
                  volume: data[key].purchase
                })
            }
            setSales(transformedSales);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [])

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!sales || sales.length === 0) {
      return <p>No data yet</p>
    }
    
  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export default lastSalesPage;
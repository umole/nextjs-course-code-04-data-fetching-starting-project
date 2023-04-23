import React from 'react';
import { useEffect, useState } from 'react';

const lastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
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

    if (!data && !sales) {
      return <p>No data yet</p>
    }
    
  return (
    <ul>
      {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
}

export async function getStaticProps() {
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
        } return {
          props: {
            sales: transformedSales
          },
          revalidate: 10
        }
    } catch (error) {
        console.log(error);
    }
  }, [])
}

export default lastSalesPage;
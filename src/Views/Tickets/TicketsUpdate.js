import React from 'react'
import { GetTicketsEdit } from '../../API';

function TicketsUpdate() {
    useEffect(() => {
        
        GetTicketsEdit().then((res) => {
          setDataSoruce(res.$values);
          setLoading(false);
        });
      }, []);




  return (
    <div>TicketsUpdate</div>
  )
}

export default TicketsUpdate
import React, { useEffect, useState } from 'react'
import AppBar from './appBar';
import ShowModel from './ShowModel';


function ViewStudent() {
    const [loading, SetLoading] = useState(false);
    const [data, SetData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                SetLoading(true)
                let url = `${process.env.REACT_APP_API_KEY}/students`
                let response =
                    await fetch(url, {
                        method: 'GET'
                    },);
                if (response.status === 200) {
                    let reData = await response.json();
                    SetData(reData.student)
                    SetLoading(false)
                }
            } catch (err) {
                alert(err.message);
            }
        }
        getData()
    }, []);
    return (
        <>
            <AppBar />
            <h2 className="form-title">View Students</h2>
            {loading && <div className='Loading'>Loading...</div>}
            {!loading && <div className='list-Column'>
                {
                    data.length === 0 ? <div className='data-avail'> No data available</div> : data.map((item, index) => {
                        return (<ShowModel key={index} item={item} index={index} />)

                    })
                }

            </div>
            }
        </>
    )
}

export default ViewStudent
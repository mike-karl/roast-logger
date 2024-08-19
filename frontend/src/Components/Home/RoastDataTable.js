import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useMemo } from 'react'
import { useTable, usePagination} from 'react-table/dist/react-table.development'
import { Link } from 'react-router-dom'

function RoastDataTable(props) {
  const [roastLogs, setRoastLogs] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate();

  const BASE_URL = '/mantraCoffee';

  const controller = new AbortController();
  useEffect(() => {
    retrieveRoastLogs();
}, [])
  
  const retrieveRoastLogs = async (page = 0) => {
    try {
      const response = await axiosPrivate.get(`${BASE_URL}?page=${page}`, 
        {
          signal: controller.signal,
          withCredentials: true,
        })
      console.log(response.data);
      setTimeout(() => {
        setRoastLogs(response.data.results);
        setIsDataLoading(false)}, 1000)
    } catch (err) {
  console.log(err);
}
  }

  const columns = useMemo(() => [
      {
        Header: 'Roast Number',
        accessor: 'roastNumber',
        Cell: ({row}) => {
          const roastNumber = row.index + 1;
          return <span>{roastNumber}</span>
        }
      },
      {
          Header: 'Bean',
          accessor: 'bean',
      },
      {
        Header: 'Roast Date',
        accessor: 'roastDate',
        Cell: ( props ) => {
          const roastDate = new Date(props.value).toLocaleDateString();
          return <span>{roastDate}</span>;
        }
      },
      {
        Header: 'Roast Level',
        accessor: 'roastProfile.roastLevel',
      },
      {
        Header: 'Total Roast Time',
        accessor: 'roastProfile.totalRoastTime'
      },
      {
        Header: 'View Complete Log',
        accessor: '_id',
        Cell: ( props ) => {
          return (<Link to={'/mantraCoffee/' + props.value}>
          <button className="primaryBtn" >
            View Log!
          </button>
        </Link>)
        }
      }
  ], [])

  const roastLogsData = useMemo(() => [...roastLogs], [roastLogs])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
} = useTable({ 
  columns,
  data: roastLogsData,
  initialState: { 
    pageIndex: 0,
    hiddenColumns: []
  }, 
},
usePagination
)
if (roastLogs.length < 1 && (isDataLoading === false)) {
  return (
    <h2 className="noRoasts" >Woah! Looks Like you have no Roasts Logged! 
      Try Logging your first roast by clicking the Start New
      Roast Button.
    </h2>
     )}
  return (<>
    { isDataLoading ? 
    <h1 className="loadingHeader">Loading Recent Roast...</h1> 
    : 
    <> 
      <h1 style={{'gridColumn': 'span 8'}}>Recent Roasts!</h1>
      <table className='roast-table' {...getTableProps()} style={{ border: 'solid 1px grey' }}>
       
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {page.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="logRoastBtn" >
                <Link to={'/mantraCoffee/add-roast-log'}>
                    <button className="primaryBtn center" onClick={props.handleLogRoast}>Log New Roast!</button>
                </Link>
      </div>
      </> }
     </>
  )
}

export default RoastDataTable
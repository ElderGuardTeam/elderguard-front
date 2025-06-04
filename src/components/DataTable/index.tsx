'use client'
import DataTable from 'react-data-table-component';
import Alert from '../Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

interface IDataTableProps {
	columns: any
	data: any
  expandable?: boolean
  expandableRowsComponent?: any
  expandedRow?: any
  onRowClicked?: any
  className?: string
}


const DataTableComponent: React.FC<IDataTableProps> = ({
	columns,
	data,
  expandable = false,
  expandableRowsComponent,
  expandedRow = false,
  onRowClicked,
  className = ''
}) => {

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#2E778A',
        fontSize: '11px',
        color: 'white',
      },
    },
    rows: {
      style: {
        fontSize: '12px',
      },
    },
  };
  const rowPreExpanded = (row: any) => expandedRow

  return (
    <DataTable
			columns={columns}
			data={data}
      pointerOnHover	
      pagination
      highlightOnHover
      expandableRows={expandable}
      expandableRowExpanded={rowPreExpanded}
      expandableRowsComponent={expandableRowsComponent ? expandableRowsComponent : undefined}
      onRowClicked={onRowClicked}
      className={className}
      noDataComponent={
        <Alert
        message='Nenhum resultado encontrado'
        className='text-sm w-full text-accent'
        icon={
          <FontAwesomeIcon icon={faThumbsDown} className='text-lg text-salmon'/>
        }
        />
      }
      paginationPerPage={15}
      paginationRowsPerPageOptions={[15, 20, 50, 100, 1000]}
      paginationComponentOptions={
        {
          rowsPerPageText: 'Itens por página',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos'
        }
      }
      customStyles={customStyles}
		/>
  )
}

export default DataTableComponent
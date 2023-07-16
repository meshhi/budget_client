import ReactDOM from "react-dom";
import { useTable, useSortBy } from 'react-table';
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi';

const columns = [
  {
    Header: 'First Name',
    // значением колонки будет `user['firstName']`
    accessor: 'firstName',
  },
  {
    Header: 'Company',
    // функция принимает строку - объект данных
    // значением колонки будет `user['job'].position in user['job'].company`
    accessor: ({ company }) => `${company.position} in ${company.company}`
  }
]

const data = [
  {
    firstname: 'John',
    company: 'Worker'
  }
]

const Table = ({title, callback}) => {
  const sortTypes = {
    // перезаписывает встроенный тип `string`
    string: (rowA, rowB, columnId, desc) => {
      const [a, b] = [rowA.values[columnId], rowB.values[columnId]]
      return a.localeCompare(b, 'en')
    }
  }

  const {
    // эти штуки являются обязательными
    getTableProps,
    getTableBodyProps,
    // о том, почему мы используем группы заголовков, а не сами заголовки, поговорим в следующем разделе
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data, sortTypes }, useSortBy)

  const Table = () => {
    return(
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hG) => (
          <tr {...hG.getHeaderGroupProps()}>
            {hG.headers.map((col) => (
              <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                {col.render('Header')}{' '}
                {/* если колонка является сортируемой, рендерим рядом с заголовком соответствующую иконку в зависимости от того, включена ли сортировка, а также на основе порядка сортировки */}
                {col.canSort && (
                  <span>
                    {col.isSorted ? (
                      col.isSortedDesc ? (
                        <BiSortUp />
                      ) : (
                        <BiSortDown />
                      )
                    ) : (
                      <BiSortAlt2 />
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>)
  }

  return (
    <div className='table-wrapper'>
      <Table></Table>
    </div>);
}

export default Table
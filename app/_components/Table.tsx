interface TableProps {
  data: any;
}

const Table = ({ data }: TableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((row: any) => (
            <tr key={row.id}>
              <td>{row.firstName + " " + row.lastName}</td>
              <td>{row.age}</td>
              <td>{row.email}</td>
              <td>{row.address.city}</td>
            </tr>
          ))
        ) : (
          <div>No Data</div>
        )}
      </tbody>
    </table>
  );
};

export default Table;

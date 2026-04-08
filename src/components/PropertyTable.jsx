const PropertyTable = ({ properties, deleteProperty, editProperty }) => {
  return (
    <div className="table-section">
      <h3>Properties List</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => (
            <tr key={i}>
              <td><img src={p.image} alt="" /></td>
              <td>{p.name}</td>
              <td>{p.location}</td>
              <td>₹{p.price}</td>
              <td className="actions">
                <button onClick={() => editProperty(i)}>Edit</button>
                <button onClick={() => deleteProperty(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
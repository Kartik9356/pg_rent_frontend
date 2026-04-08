const OwnerPropertyTable = ({ properties, deleteProperty, editProperty }) => {
  return (
    <div className="box">
      <h3>My Properties</h3>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((p, i) => (
            <tr key={i}>
              <td>
                <img src={p.image} alt="" />
              </td>
              <td>{p.name}</td>
              <td>{p.location}</td>
              <td>₹{p.price}</td>

              <td className="actions">
                <button onClick={() => editProperty(i)} className="edit">
                  Edit
                </button>
                <button onClick={() => deleteProperty(i)} className="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerPropertyTable;
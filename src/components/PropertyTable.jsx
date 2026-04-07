const PropertyTable = ({ properties, deleteProperty }) => {
  return (
    <div className="bg-white p-5 mt-5 border">
      <h3>Properties List</h3>

      <table className="w-full mt-3">
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
              <td>
                <img
                  src={p.image}
                  className="w-[60px] h-[40px] object-cover"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.location}</td>
              <td>₹{p.price}</td>
              <td>
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
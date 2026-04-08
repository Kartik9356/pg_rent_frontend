const BookingTable = ({ bookings, acceptBooking, rejectBooking }) => {
  return (
    <div className="box">
      <h3>Booking Requests</h3>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Property</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td>{b.user}</td>
              <td>{b.property}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>

              <td className="actions">
                {b.status === "pending" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() => acceptBooking(i)}
                    >
                      Accept
                    </button>

                    <button
                      className="reject"
                      onClick={() => rejectBooking(i)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>{b.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
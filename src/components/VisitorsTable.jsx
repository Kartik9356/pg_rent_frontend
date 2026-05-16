import React from "react";

const VisitorsTable = ({ visitors }) => {
    return (
        <div className="table-section">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Room Type</th>
                        <th>Message</th>
                    </tr>
                </thead>

                <tbody>
                    {visitors.map((visitor) => (
                        <tr key={visitor._id}>
                            <td>{visitor.fullName}</td>
                            <td>{visitor.email}</td>
                            <td>{visitor.phone}</td>
                            <td>{visitor.date}</td>
                            <td>{visitor.timeSlot}</td>
                            <td>{visitor.roomType}</td>
                            <td>{visitor.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorsTable;
import React from 'react';

const ParkingLotStatus = ({ title, rows, columns, parkingStatus }) => {
    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                <tr>
                    {Array.from({ length: columns }).map((_, index) => (
                        <th key={index}>Column {index + 1}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <td key={colIndex}>
                                {parkingStatus[rowIndex * columns + colIndex] || 'Empty'}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParkingLotStatus;
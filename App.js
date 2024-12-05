import React, { useState } from 'react';
import axios from 'axios';
import ParkingLotStatus from './components/ParkingLotStatus';
axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [ticket, setTicket] = useState('');
    const [parkingBoy, setParkingBoy] = useState('standard');
    const [parkingStatus, setParkingStatus] = useState(Array(30).fill('Empty')); // Assuming 30 parking spots
    const [message, setMessage] = useState('');

    const handlePark = async () => {
        try {
            const response = await axios.post('/parking-boys/park', { plateNumber }, { params: { strategy: parkingBoy } });
            const newParkingStatus = [...parkingStatus];
            const emptyIndex = newParkingStatus.indexOf('Empty');
            if (emptyIndex !== -1) {
                newParkingStatus[emptyIndex] = plateNumber;
                setParkingStatus(newParkingStatus);
                setMessage(`Ticket: ${response.data}`);
                window.alert(`Ticket: ${response.data}`);
            } else {
                setMessage('No empty parking spots available');
            }
        } catch (error) {
            setMessage('Error parking the car');
        }
    };

    const handleFetch = async () => {
        try {
            const response = await axios.get('/parking-boys/fetch', { params: { plateNumber } });
            const newParkingStatus = [...parkingStatus];
            const carIndex = newParkingStatus.indexOf(plateNumber);
            if (carIndex !== -1) {
                newParkingStatus[carIndex] = 'Empty';
                setParkingStatus(newParkingStatus);
                setMessage(`Car: ${response.data.plateNumber}, Parking Time: ${response.data.parkingTime}, Fee: ${response.data.fee}`);
            } else {
                setMessage('Car not found in the parking lot');
            }
        } catch (error) {
            setMessage('Error fetching the car');
        }
    };

    return (
        <div>
            <h1>Parking Lot Management</h1>
            <div>
                <label>Plate Number:</label>
                <input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                />
                <select value={parkingBoy} onChange={(e) => setParkingBoy(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="smart">Smart</option>
                    <option value="super-smart">SuperSmart</option>
                </select>
                <button onClick={handlePark} style={{ backgroundColor: 'blue', color: 'white' }}>Park</button>
                <input
                    type="text"
                    value={ticket}
                    onChange={(e) => setTicket(e.target.value)}
                    placeholder="Enter ticket"
                />
                <button onClick={handleFetch} style={{ backgroundColor: 'blue', color: 'white' }}>Fetch</button>
            </div>
            {message && <div>{message}</div>}
            <div className="tables-container">
                <ParkingLotStatus title="The Plaza Park" rows={3} columns={3} parkingStatus={parkingStatus.slice(0, 9)} />
                <ParkingLotStatus title="City Mall Garage" rows={4} columns={3} parkingStatus={parkingStatus.slice(9, 21)} />
                <ParkingLotStatus title="Office Tower Parking" rows={3} columns={3} parkingStatus={parkingStatus.slice(21, 30)} />
            </div>
        </div>
    );
};

export default App;
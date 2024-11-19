import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

// Constants
const PRICING = {
  individual: {
    basic: 10,
    premium: 15,
    executive: 20
  },
  team: 25
};

const initialDesks = [
  ...Array(10).fill().map((_, i) => ({
    id: `I${i + 1}`,
    type: 'individual',
    isBooked: false,
    bookings: []
  })),
  ...Array(5).fill().map((_, i) => ({
    id: `T${i + 1}`,
    type: 'team',
    isBooked: false,
    bookings: []
  }))
];

const BookingSystem = () => {
  const [desks, setDesks] = useState(initialDesks);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [bookingHours, setBookingHours] = useState(1);
  const [membershipTier, setMembershipTier] = useState('basic');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookingHistory, setBookingHistory] = useState([]);

  const calculatePrice = (hours, rate) => {
    const basePrice = hours * rate;
    return hours > 3 ? basePrice * 0.9 : basePrice;
  };

  const handleBooking = () => {
    if (!selectedDesk) return;

    const rate = selectedDesk.type === 'team' 
      ? PRICING.team 
      : PRICING.individual[membershipTier];
    
    const price = calculatePrice(bookingHours, rate);

    const newBooking = {
      deskId: selectedDesk.id,
      hours: bookingHours,
      price,
      membershipTier,
      timestamp: new Date().toISOString()
    };

    setBookingHistory(prev => [...prev, newBooking]);
    setTotalRevenue(prev => prev + price);

    setDesks(prev => prev.map(desk => 
      desk.id === selectedDesk.id 
        ? { ...desk, isBooked: true }
        : desk
    ));

    setSelectedDesk(null);
    setBookingHours(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Co-working Space Booking</h1>
        
        {/* Desk Grid */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {desks.map(desk => (
            <button
              key={desk.id}
              onClick={() => !desk.isBooked && setSelectedDesk(desk)}
              className={`p-4 rounded-lg ${
                desk.isBooked 
                  ? 'bg-red-100 cursor-not-allowed'
                  : desk.id === selectedDesk?.id
                    ? 'bg-blue-200 border-2 border-blue-500'
                    : 'bg-green-100 hover:bg-green-200'
              }`}
            >
              <div className="text-lg font-semibold">{desk.id}</div>
              <div className="text-sm">
                {desk.type === 'team' ? 'Team Desk' : 'Individual Desk'}
              </div>
              {desk.isBooked && (
                <span className="text-red-600 text-sm">Booked</span>
              )}
            </button>
          ))}
        </div>

        {/* Booking Form */}
        {selectedDesk && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Book Desk {selectedDesk.id}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Hours</label>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <input
                    type="number"
                    min="1"
                    value={bookingHours}
                    onChange={(e) => setBookingHours(parseInt(e.target.value))}
                    className="border rounded p-2 w-24"
                  />
                </div>
              </div>

              {selectedDesk.type === 'individual' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Membership Tier</label>
                  <select
                    value={membershipTier}
                    onChange={(e) => setMembershipTier(e.target.value)}
                    className="border rounded p-2 w-full"
                  >
                    <option value="basic">Basic ($10/hr)</option>
                    <option value="premium">Premium ($15/hr)</option>
                    <option value="executive">Executive ($20/hr)</option>
                  </select>
                </div>
              )}

              <div className="text-lg font-semibold">
                Total Price: ${calculatePrice(
                  bookingHours,
                  selectedDesk.type === 'team' 
                    ? PRICING.team 
                    : PRICING.individual[membershipTier]
                ).toFixed(2)}
                {bookingHours > 3 && (
                  <span className="text-green-600 text-sm ml-2">(10% discount applied)</span>
                )}
              </div>

              <button
                onClick={handleBooking}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Revenue Dashboard */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Dashboard</h2>
          <div className="text-2xl font-bold text-green-600 mb-4">
            Total Revenue: ${totalRevenue.toFixed(2)}
          </div>
          
          <div className="space-y-2">
            {bookingHistory.map((booking, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                <div>
                  <span className="font-semibold">Desk {booking.deskId}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({booking.hours} hours, {booking.membershipTier})
                  </span>
                </div>
                <div className="font-semibold">${booking.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
import React, { useState } from 'react';
import { truncate } from '@/utils/helper';
import { TicketStruct } from '@/utils/type.dt';
import { BsDot } from 'react-icons/bs';
import { FaEthereum } from 'react-icons/fa';
import Identicon from 'react-identicons';
import Moment from 'react-moment';

const Ticket: React.FC<{ tickets: TicketStruct[] }> = ({ tickets }) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketStruct | null>(null);

  const handleTicketClick = (ticket: TicketStruct) => {
    setSelectedTicket(ticket);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is active
  };

  const closeModal = () => {
    setSelectedTicket(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
  };

  return (
    <main className="lg:w-1/3 w-full mx-auto flex justify-start items-center flex-col sm:space-x-3 bg-white shadow-md overflow-hidden">
      <h4 className="text-xl mt-10 mb-5">All Purchase ({tickets.length})</h4>
      {tickets.map((ticket, i) => (
        <div
          className="flex justify-start items-between space-x-4 w-full p-5 border-b border-gray-200"
          key={i}
          onClick={() => handleTicketClick(ticket)}
        >
          <div className="flex justify-start items-center space-x-2">
            <Identicon
              className="rounded-full overflow-hidden shadow-md"
              size={30}
              string={ticket.owner}
            />
            <p className="font-semibold">
              {truncate({
                text: ticket.owner,
                startChars: 4,
                endChars: 4,
                maxLength: 11,
              })}
            </p>
          </div>

          <div className="flex justify-end items-center w-full">
            <div className="flex justify-start items-center">
              <span className="flex items-center">
                <FaEthereum /> <span>{ticket.ticketCost.toFixed(2)}</span>
              </span>
              <BsDot size={30} />
              <Moment className="text-gray-500" fromNow>
                {ticket.timestamp}
              </Moment>
            </div>
          </div>
        </div>
      ))}
      {selectedTicket && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8 relative">
            <button className="absolute top-4 right-4" onClick={closeModal}>
              Close
            </button>
            {/* Display details of the selected ticket here */}
            <p>Brought by: {selectedTicket.owner}</p>
            <p>Ticket Cost: {selectedTicket.ticketCost.toFixed(2)}</p>
            <p>Timestamp: <Moment fromNow>{selectedTicket.timestamp}</Moment></p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Ticket;

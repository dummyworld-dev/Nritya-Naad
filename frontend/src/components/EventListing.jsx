// src/components/EventListing.jsx
import React, { useState } from 'react';

const EventListing = ({ theme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({ name: '', email: '', tickets: 1 });

  const events = [
    {
      id: 1,
      title: "Bharatanatyam Workshop",
      category: "dance",
      date: "December 15, 2024",
      time: "5:00 PM - 8:00 PM",
      location: "Kalakshetra Foundation, Chennai",
      price: 35,
      description: "Learn the fundamentals of Bharatanatyam including adavus (basic steps), mudras (hand gestures), and basic choreography. Suitable for beginners and intermediate dancers.",
      instructor: "Guru Smt. Lakshmi Krishnan",
      spotsLeft: 25,
      icon: "💃",
      duration: "3 hours",
      level: "Beginner to Intermediate"
    },
    {
      id: 2,
      title: "Kathak Masterclass",
      category: "dance",
      date: "December 18, 2024",
      time: "4:00 PM - 7:00 PM",
      location: "Kathak Kendra, Delhi",
      price: 40,
      description: "Immerse yourself in the art of Kathak storytelling through rhythmic footwork, spins (chakkars), and graceful gestures.",
      instructor: "Pt. Rajendra Gangani",
      spotsLeft: 20,
      icon: "💫",
      duration: "3 hours",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Hindustani Vocal Workshop",
      category: "music",
      date: "December 16, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Sangeet Research Academy, Kolkata",
      price: 45,
      description: "Explore the basics of Hindustani classical vocals including alankars, ragas, and taans. Learn proper breath control and voice modulation.",
      instructor: "Ustad Rashid Khan",
      spotsLeft: 15,
      icon: "🎤",
      duration: "3 hours",
      level: "All Levels"
    },
    {
      id: 4,
      title: "Tabla Bols Workshop",
      category: "music",
      date: "December 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Rhythm House, Mumbai",
      price: 30,
      description: "Learn the language of tabla bols (syllables), basic rhythms (kaidas), and accompaniment techniques for classical performances.",
      instructor: "Pandit Anindo Chatterjee",
      spotsLeft: 18,
      icon: "🥁",
      duration: "3 hours",
      level: "Beginner"
    },
    {
      id: 5,
      title: "Odissi Dance Intensive",
      category: "dance",
      date: "December 22, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Odissi Research Centre, Bhubaneswar",
      price: 60,
      description: "Full-day intensive workshop on Odissi's signature tribhangi posture, graceful movements, and abhinaya (expression).",
      instructor: "Guru Sujata Mohapatra",
      spotsLeft: 12,
      icon: "🕉️",
      duration: "7 hours (with breaks)",
      level: "Intermediate to Advanced"
    },
    {
      id: 6,
      title: "Carnatic Violin Workshop",
      category: "music",
      date: "December 19, 2024",
      time: "4:00 PM - 7:00 PM",
      location: "Academy of Music, Bengaluru",
      price: 50,
      description: "Master the techniques of Carnatic violin including bowing styles, gamakas, and accompaniment for vocalists.",
      instructor: "Dr. L. Subramaniam",
      spotsLeft: 10,
      icon: "🎻",
      duration: "3 hours",
      level: "Intermediate"
    },
    {
      id: 7,
      title: "Kuchipudi Workshop",
      category: "dance",
      date: "December 21, 2024",
      time: "5:30 PM - 8:30 PM",
      location: "Kuchipudi Art Academy, Hyderabad",
      price: 38,
      description: "Learn the dynamic footwork, expressive eye movements, and signature brass plate balancing of Kuchipudi.",
      instructor: "Dr. Vempati Chinna Satyam",
      spotsLeft: 22,
      icon: "💃",
      duration: "3 hours",
      level: "Beginner"
    },
    {
      id: 8,
      title: "Sitar Recital & Workshop",
      category: "music",
      date: "December 23, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "ITC Sangeet Research Academy, Kolkata",
      price: 55,
      description: "Interactive workshop followed by a sitar recital. Learn basic sitar techniques and raga improvisation.",
      instructor: "Pt. Kushal Das",
      spotsLeft: 8,
      icon: "🎸",
      duration: "3 hours + performance",
      level: "All Levels"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '📅' },
    { id: 'dance', name: 'Dance', icon: '💃' },
    { id: 'music', name: 'Music', icon: '🎵' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingInfo.name || !bookingInfo.email) {
      alert("Please fill in your name and email!");
      return;
    }

    if (selectedEvent.spotsLeft < bookingInfo.tickets) {
      alert(`Sorry, only ${selectedEvent.spotsLeft} spots left!`);
      return;
    }

    alert(`✅ Booking Confirmed!\n\nEvent: ${selectedEvent.title}\nName: ${bookingInfo.name}\nTickets: ${bookingInfo.tickets}\nTotal: ₹${selectedEvent.price * bookingInfo.tickets}\n\nA confirmation email has been sent to ${bookingInfo.email}`);
    
    setShowModal(false);
    setBookingInfo({ name: '', email: '', tickets: 1 });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={{...styles.title, color: theme.color}}>
          🎵 Upcoming Dance & Music Workshops 🕺
        </h2>
        <p style={styles.subtitle}>
          Discover authentic Indian classical dance and music workshops near you
        </p>
      </div>

      {/* Filters */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by title, instructor, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterButtons}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                ...styles.filterBtn,
                ...(selectedCategory === cat.id ? {...styles.filterBtnActive, background: theme.color} : {})
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        📅 <strong>{filteredEvents.length}</strong> events found
      </div>

      {/* Events Grid */}
      <div style={styles.eventsGrid}>
        {filteredEvents.map(event => (
          <div key={event.id} style={styles.eventCard}>
            <div style={{...styles.eventIcon, background: theme.color}}>
              {event.icon}
            </div>
            <div style={styles.eventContent}>
              <h3 style={{...styles.eventTitle, color: theme.color}}>{event.title}</h3>
              <div style={styles.eventDetails}>
                <div>📅 {event.date} • {event.time}</div>
                <div>📍 {event.location}</div>
                <div>👨‍🏫 {event.instructor}</div>
                <div>⏱️ {event.duration}</div>
                <div>📊 Level: {event.level}</div>
                <div>🎟️ <strong>{event.spotsLeft}</strong> spots left</div>
              </div>
              <p style={styles.eventDescription}>{event.description}</p>
              <div style={styles.eventFooter}>
                <span style={{...styles.price, color: theme.color}}>₹{event.price}</span>
                <button 
                  onClick={() => handleBookNow(event)} 
                  style={{...styles.bookBtn, background: theme.color}}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  🎟️ Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={styles.noResults}>
          🎭 No events found<br />
          Try adjusting your search or filter
        </div>
      )}

      {/* Booking Modal */}
      {showModal && selectedEvent && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{...styles.modalTitle, color: theme.color}}>🎟️ Register for Workshop</h3>
            <p style={styles.modalEvent}>{selectedEvent.title}</p>
            <input
              type="text"
              placeholder="Your Full Name"
              value={bookingInfo.name}
              onChange={(e) => setBookingInfo({...bookingInfo, name: e.target.value})}
              style={styles.modalInput}
            />
            <input
              type="email"
              placeholder="Your Email Address"
              value={bookingInfo.email}
              onChange={(e) => setBookingInfo({...bookingInfo, email: e.target.value})}
              style={styles.modalInput}
            />
            <select
              value={bookingInfo.tickets}
              onChange={(e) => setBookingInfo({...bookingInfo, tickets: parseInt(e.target.value)})}
              style={styles.modalInput}
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} Ticket{num > 1 ? 's' : ''}</option>
              ))}
            </select>
            <div style={styles.modalButtons}>
              <button onClick={handleConfirmBooking} style={{...styles.confirmBtn, background: theme.color}}>
                Confirm Booking
              </button>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif"
  },
  subtitle: {
    color: '#8B6452',
    fontSize: '0.95rem'
  },
  filterBar: {
    background: '#fdf8f5',
    borderRadius: '16px',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '0.95rem',
    background: 'transparent'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  filterBtn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '10px',
    background: '#f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.9rem',
    fontWeight: 500
  },
  filterBtnActive: {
    color: 'white'
  },
  stats: {
    marginBottom: '1.5rem',
    padding: '0.5rem',
    color: '#8B6452',
    fontSize: '0.9rem'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem'
  },
  eventCard: {
    background: '#fdf8f5',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.05)'
  },
  eventIcon: {
    fontSize: '3rem',
    textAlign: 'center',
    padding: '1rem',
    color: 'white'
  },
  eventContent: {
    padding: '1.2rem'
  },
  eventTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.8rem',
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif"
  },
  eventDetails: {
    fontSize: '0.85rem',
    color: '#6b4c3b',
    marginBottom: '0.8rem',
    lineHeight: '1.6'
  },
  eventDescription: {
    fontSize: '0.85rem',
    color: '#8B6452',
    marginBottom: '1rem',
    lineHeight: '1.5'
  },
  eventFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.8rem',
    borderTop: '1px solid #e8dfd9'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  bookBtn: {
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.3s'
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem',
    color: '#8B6452'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '450px',
    width: '90%'
  },
  modalTitle: {
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
    fontFamily: "'Playfair Display', serif"
  },
  modalEvent: {
    color: '#8B6452',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  modalInput: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '0.95rem',
    boxSizing: 'border-box'
  },
  modalButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  confirmBtn: {
    flex: 1,
    padding: '0.8rem',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.8rem',
    background: '#e2e8f0',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#4a5568'
  }
};

export default EventListing;
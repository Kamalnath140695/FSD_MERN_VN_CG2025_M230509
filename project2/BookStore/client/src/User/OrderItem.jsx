import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      marginBottom: '1rem',
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gap: '1rem',
      alignItems: 'center',
      fontSize: '0.9rem'
    }}>
      <div>
        <img
          src={order.image}
          alt={order.productName}
          style={{
            width: '60px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Product Name</div>
        <div style={{ color: '#666' }}>{order.productName}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Order ID</div>
        <div style={{ color: '#666' }}>{order.id}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Address</div>
        <div style={{ color: '#666' }}>{order.address}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Seller</div>
        <div style={{ color: '#666' }}>{order.seller}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Booking Date</div>
        <div style={{ color: '#666' }}>{order.bookingDate}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Delivery By</div>
        <div style={{ color: '#666' }}>{order.deliveryBy}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Price</div>
        <div style={{ color: '#666' }}>{order.price}</div>
      </div>
      
      <div>
        <div style={{ fontWeight: 'bold', color: '#333' }}>Status</div>
        <div style={{ 
          color: order.status === 'ontheway' ? '#007bff' : '#666',
          fontWeight: order.status === 'ontheway' ? 'bold' : 'normal'
        }}>
          {order.status}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
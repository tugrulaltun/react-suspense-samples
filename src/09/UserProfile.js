import React from 'react';

const UserProfile = ({ resource }) => {
    const user = resource.read();

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            {/* Display more user details as needed */}
        </div>
    );
};

export default UserProfile;

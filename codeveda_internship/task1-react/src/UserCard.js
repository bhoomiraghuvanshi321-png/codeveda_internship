import { useState } from 'react';

function UserCard({ user, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSave = () => {
    onEdit(user.id, { name: editName, email: editEmail });
    setIsEditing(false);
  };

  return (
    <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
      {isEditing ? (
        <>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default UserCard;
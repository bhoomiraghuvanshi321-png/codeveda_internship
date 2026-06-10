document.getElementById('load-users').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        
        const tbody = document.querySelector('#user-table tbody');
        tbody.innerHTML = ''; // Delete previous data
        
        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch data from backend. Is the server running?');
    }
});
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // if page does not  reload 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  alert('User added!');
  document.getElementById('load-users').click();
  document.getElementById('addUserForm').reset(); // form clear
});
async function deleteUser(id) {
  await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
  document.getElementById('load-users').click();
}
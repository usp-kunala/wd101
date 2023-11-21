document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registor');
    const tableBody = document.querySelector('#userTable tbody');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dobInput = document.getElementById('dob');
      const dob = new Date(dobInput.value);
      const terms = document.getElementById('terms').checked;
  
      // Validate age between 18 and 55
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
  
      if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
      }
  
      // Add user data to the table
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob.toISOString().slice(0, 10)}</td>
        <td>${terms ? 'true' : 'false'}</td>
      `;
  
      
      const userData = { name, email, password, dob: dob.toISOString().slice(0, 10), terms };
      let existingData = localStorage.getItem('userEntries');
      existingData = existingData ? JSON.parse(existingData) : [];
      existingData.push(userData);
      localStorage.setItem('userEntries', JSON.stringify(existingData));
  
      
      form.reset();
    });
  
    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('userEntries'));
    if (savedData) {
      savedData.forEach(entry => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.terms ? 'true' : 'false'}</td>
        `;
      });
    }
  });
  

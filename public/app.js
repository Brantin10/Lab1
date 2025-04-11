document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ app.js is running!");
  
    // Set background color for the page
    document.body.style.backgroundColor = "#f4f4f4";
  
    const tableBody = document.querySelector('#dishTable tbody');
    const form = document.getElementById('dishForm');
  
    // Function to load dishes from the API and display in the table
    async function loadDishes() {
      try {
        const res = await fetch('/api/dishes');
        if (!res.ok) throw new Error('Failed to load dishes');
        
        const dishes = await res.json();
        console.log('Loaded dishes:', dishes); // Log dishes data
        tableBody.innerHTML = ''; // Clear the table before inserting new rows
  
        dishes.forEach(dish => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${dish.name}</td>
            <td>${dish.origin}</td>
            <td>${dish.cookingTime}</td>
            <td>${dish.spiceLevel}</td>
            <td>${dish.servings}</td>
            <td>
              <button onclick="deleteDish('${dish._id}')">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error loading dishes:', error);
        alert('Failed to load dishes. Please try again later.');
      }
    }
  
    // Form submission event to add a new dish
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        origin: formData.get('origin'),
        cookingTime: Number(formData.get('cookingTime')),
        spiceLevel: formData.get('spiceLevel'),
        servings: Number(formData.get('servings')),
        ingredients: formData.get('ingredients').split(',').map(i => i.trim()),
        preparationSteps: formData.get('preparationSteps').split(',').map(s => s.trim())
      };
      
      try {
        const res = await fetch('/api/dishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        if (res.ok) {
          form.reset();
          loadDishes(); // Reload dishes after successful addition
        } else {
          alert('Failed to add dish');
        }
      } catch (error) {
        console.error('Error adding dish:', error);
        alert('Failed to add dish. Please try again later.');
      }
    });
  
    // Function to delete a dish
    async function deleteDish(id) {
      if (!confirm('Delete this dish?')) return;
  
      try {
        const res = await fetch(`/api/dishes/${id}`, { method: 'DELETE' });
        
        if (res.ok) {
          loadDishes(); // Reload dishes after successful deletion
        } else {
          alert('Delete failed');
        }
      } catch (error) {
        console.error('Error deleting dish:', error);
        alert('Failed to delete dish. Please try again later.');
      }
    }
  
    // Initial call to load dishes when the page loads
    loadDishes();
  });
  
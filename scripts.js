// Basicallly wwe wants to create a contact page 
// I think the form should have names, address, and phone nmber
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${contact.name} (${contact.email}, ${contact.phone})</span>
                <button onclick="editContact('${contact.id}')">Edit</button>
                <button onclick="deleteContact('${contact.id}')">Delete</button>
            `;
            contactList.appendChild(li);
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const contactId = document.getElementById('contactId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (contactId) {
            // Update existing contact
            contacts = contacts.map(contact => 
                contact.id === contactId ? { id: contactId, name, email, phone } : contact
            );
        } else {
            // Add new contact
            const newContact = { id: Date.now().toString(), name, email, phone };
            contacts.push(newContact);
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        contactForm.reset();
    });

    window.editContact = function(id) {
        const contact = contacts.find(contact => contact.id === id);
        document.getElementById('contactId').value = contact.id;
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
    }

    window.deleteContact = function(id) {
        contacts = contacts.filter(contact => contact.id !== id);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    }

    renderContacts();
});

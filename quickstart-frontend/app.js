const API_URL = 'http://localhost:8080/api/content'; // Modifier l'URL si nécessaire

document.addEventListener("DOMContentLoaded", () => {
    fetchContent();

    // Bouton pour ouvrir le formulaire de création
    document.getElementById('create-btn').addEventListener('click', () => {
        openModal();
    });

    // Fermer le modal
    document.getElementById('close-btn').addEventListener('click', closeModal);

    // Soumission du formulaire
    document.getElementById('content-form').addEventListener('submit', saveContent);
});

function fetchContent() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const contentList = document.getElementById('content-list');
            contentList.innerHTML = '';

            data.forEach(content => {
                contentList.innerHTML += `
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h2 class="text-xl font-bold mb-2">${content.title}</h2>
                        <p class="text-gray-700 mb-2">${content.desc}</p>
                        <p class="text-sm text-gray-500">Status: ${content.status}</p>
                        <p class="text-sm text-gray-500">Type: ${content.contentType}</p>
                        <p class="text-sm text-gray-500">Created: ${new Date(content.dateCreated).toLocaleDateString()}</p>
                        ${content.url ? `<a href="${content.url}" class="text-blue-500">Read more</a>` : ''}
                        <div class="mt-4">
                            <button onclick="editContent(${content.id})" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">Edit</button>
                            <button onclick="deleteContent(${content.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching content:', error));
}

function openModal(content = {}) {
    document.getElementById('content-id').value = content.id || '';
    document.getElementById('title').value = content.title || '';
    document.getElementById('desc').value = content.desc || '';
    document.getElementById('status').value = content.status || 'IDEA';
    document.getElementById('contentType').value = content.contentType || 'ARTICLE';
    document.getElementById('url').value = content.url || '';
    document.getElementById('modal-title').textContent = content.id ? 'Edit Content' : 'Create Content';
    document.getElementById('content-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('content-modal').classList.add('hidden');
}

function saveContent(event) {
    event.preventDefault();

    const contentId = document.getElementById('content-id').value;
    const content = {
        id: contentId || null,
        title: document.getElementById('title').value,
        desc: document.getElementById('desc').value,
        status: document.getElementById('status').value,
        contentType: document.getElementById('contentType').value,
        dateCreated: contentId ? null : new Date().toISOString(),
        dateupdated: new Date().toISOString(),
        url: document.getElementById('url').value
    };

    const method = contentId ? 'PUT' : 'POST';
    const url = contentId ? `${API_URL}/${contentId}` : API_URL;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
        .then(() => {
            closeModal();
            fetchContent();
        })
        .catch(error => console.error('Error saving content:', error));
}

function editContent(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(content => openModal(content))
        .catch(error => console.error('Error fetching content:', error));
}

function deleteContent(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchContent())
        .catch(error => console.error('Error deleting content:', error));
}

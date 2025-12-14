const API_BASE_URL = 'http://localhost:3001/api';

// Students API
export const studentsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/students`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`);
    if (!response.ok) throw new Error('Failed to fetch student');
    return response.json();
  },

  create: async (student) => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  },

  update: async (id, student) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  },

  initialize: async (students) => {
    const response = await fetch(`${API_BASE_URL}/init/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(students),
    });
    if (!response.ok) throw new Error('Failed to initialize students');
    return response.json();
  },
};

// Files API
export const filesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/files`);
    if (!response.ok) throw new Error('Failed to fetch files');
    return response.json();
  },

  getByType: async (type) => {
    const response = await fetch(`${API_BASE_URL}/files/type/${type}`);
    if (!response.ok) throw new Error('Failed to fetch files');
    return response.json();
  },

  upload: async (file, metadata) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', metadata.type);
    formData.append('subject', metadata.subject || '');
    formData.append('semester', metadata.semester || '');
    formData.append('scheme', metadata.scheme || '');
    formData.append('year', metadata.year || '');

    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload file');
    return response.json();
  },

  download: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/files/${id}/download`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to download file');
      }

      const blob = await response.blob();
      
      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'download.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1].replace(/['"]/g, ''));
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/files/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete file');
    return response.json();
  },
};


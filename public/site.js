document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-form-type]');

  forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const type = form.dataset.formType;
      const status = document.getElementById(`${type}Status`);
      const submitButton = form.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(form).entries());

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Saving...';
      }

      if (status) {
        status.textContent = 'Saving...';
        status.className = 'form-status';
      }

      try {
        const endpoint =
          type === 'contact'
            ? '/api/contact'
            : type === 'volunteer'
              ? '/api/volunteer'
              : type === 'donation'
                ? '/api/donations'
                : '/api/registrations';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Request failed.');
        }

        if (status) {
          status.textContent = data.message || 'Saved successfully.';
          status.className = 'form-status success';
        }

        form.reset();
      } catch (error) {
        if (status) {
          status.textContent = error.message || 'Something went wrong.';
          status.className = 'form-status error';
        }
      } finally {
        if (submitButton) {
          const labels = {
            donation: 'Support the Cause',
            volunteer: 'Join as Volunteer',
            contact: 'Send Message',
            registration: 'Register Now',
          };
          submitButton.disabled = false;
          submitButton.textContent = labels[type] || 'Submit';
        }
      }
    });
  });

  const dashboard = document.getElementById('dashboardStats');
  const recordsContainer = document.getElementById('recordsTable');

  if (dashboard || recordsContainer) {
    fetch('/api/admin')
      .then((response) => response.json())
      .then((data) => {
        const stats = data?.stats || {};
        const records = data?.records || {};

        if (dashboard) {
          dashboard.innerHTML = `
            <div class="admin-card"><span>Registrations</span><strong>${stats.registrations || 0}</strong></div>
            <div class="admin-card"><span>Messages</span><strong>${stats.contacts || 0}</strong></div>
            <div class="admin-card"><span>Volunteers</span><strong>${stats.volunteers || 0}</strong></div>
            <div class="admin-card"><span>Donations</span><strong>${stats.donations || 0}</strong></div>
            <div class="admin-card"><span>Companies</span><strong>${stats.companies || 0}</strong></div>
          `;
        }

        if (recordsContainer) {
          const rows = [
            { key: 'registrations', label: 'Registrations', columns: ['firstName', 'lastName', 'email', 'country', 'createdAt'] },
            { key: 'contacts', label: 'Messages', columns: ['name', 'email', 'phone', 'message', 'createdAt'] },
            { key: 'volunteers', label: 'Volunteers', columns: ['name', 'email', 'focus', 'interest', 'createdAt'] },
            { key: 'donations', label: 'Donations', columns: ['name', 'email', 'amount', 'purpose', 'createdAt'] },
            { key: 'companies', label: 'Companies', columns: ['name', 'category', 'website', 'description', 'createdAt'] },
          ];

          const tableMarkup = rows.map(({ key, label, columns }) => {
            const items = records[key] || [];
            const headerCells = columns.map((column) => `<th>${column}</th>`).join('');
            const bodyRows = items.length
              ? items.map((item) => {
                  const cells = columns.map((column) => {
                    const value = item[column];
                    const formatted = column === 'createdAt' ? new Date(value).toLocaleString() : (value ?? '—');
                    return `<td>${String(formatted)}</td>`;
                  }).join('');
                  return `<tr>${cells}</tr>`;
                }).join('')
              : `<tr><td colspan="${columns.length}">No data yet.</td></tr>`;

            return `
              <div class="data-table-wrap">
                <h3>${label}</h3>
                <div class="table-wrap">
                  <table>
                    <thead><tr>${headerCells}</tr></thead>
                    <tbody>${bodyRows}</tbody>
                  </table>
                </div>
              </div>
            `;
          }).join('');

          recordsContainer.innerHTML = tableMarkup;
        }
      })
      .catch(() => {
        if (dashboard) {
          dashboard.innerHTML = '<div class="admin-card"><span>Stats</span><strong>Unavailable</strong></div>';
        }

        if (recordsContainer) {
          recordsContainer.innerHTML = '<p>Unable to load records right now.</p>';
        }
      });
  }
});

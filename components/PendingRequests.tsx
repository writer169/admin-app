'use client';

import { useState, useEffect } from 'react';
import { PendingRequest } from '@/lib/types';

export default function PendingRequests() {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/pending-requests');
      if (!response.ok) {
        throw new Error('Не удалось загрузить запросы');
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError('Ошибка при загрузке запросов');
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      const response = await fetch('/api/admin/approve-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Не удалось одобрить запрос');
      }
      await fetchRequests(); // Обновляем список
    } catch (err) {
      setError('Ошибка при одобрении запроса');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <button onClick={fetchRequests} style={{ marginBottom: '10px' }}>
        Обновить
      </button>
      {requests.length === 0 ? (
        <p>Нет ожидающих запросов</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Приложение</th>
              <th>Дата запроса</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.email}</td>
                <td>{req.appName}</td>
                <td>{new Date(req.requestedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => approveRequest(req._id)}>
                    Одобрить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
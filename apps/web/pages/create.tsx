import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';

export default function Create() {
  const [taskName, setTaskName] = useState('');
  const [payload, setPayload] = useState('{}');
  const [priority, setPriority] = useState('Medium');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  async function submit(e: any) {
    e.preventDefault();
    let parsed;
    try { parsed = JSON.parse(payload); } catch (err) { alert('Payload must be valid JSON'); return; }
    setSaving(true);
    try {
      await axios.post(`${API}/jobs`, { taskName, payload: parsed, priority });
      alert('Job created');
      router.push('/');
    } catch (err) {
      alert('Failed to create job');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <h2 className="text-lg font-semibold mb-4">Create Job</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="Task Name" className="border p-2 rounded" required />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 rounded w-40">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label className="text-sm text-gray-600">Payload (JSON)</label>
        <textarea value={payload} onChange={e => setPayload(e.target.value)} rows={10} className="border p-3 rounded font-mono" />
        <div className="flex gap-3">
          <Button className="bg-blue-600 text-white" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Create'}</Button>
          <Button className="bg-gray-100" type="button" onClick={() => { setTaskName(''); setPayload('{}'); setPriority('Medium'); }}>Reset</Button>
        </div>
      </form>
    </Layout>
  );
}

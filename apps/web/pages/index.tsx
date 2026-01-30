import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Badge from '../components/Badge';

type Job = {
  id: number;
  taskName: string;
  priority: string;
  status: string;
  createdAt: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [runningId, setRunningId] = useState<number | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  async function fetchJobs() {
    setLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      const res = await axios.get(`${API}/jobs`, { params });
      setJobs(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchJobs(); }, [statusFilter, priorityFilter]);

  async function runJob(id: number) {
    if (!confirm('Run job now?')) return;
    setRunningId(id);
    await axios.post(`${API}/run-job/${id}`);
    // Poll a couple times to get updated status
    setTimeout(() => fetchJobs(), 1000);
    setTimeout(() => fetchJobs(), 3500);
    setRunningId(null);
  }

  function renderStatus(status: string) {
    if (status === 'pending') return <Badge tone="yellow">Pending</Badge>;
    if (status === 'running') return <Badge tone="blue">Running</Badge>;
    if (status === 'completed') return <Badge tone="green">Completed</Badge>;
    return <Badge tone="gray">{status}</Badge>;
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="border p-2 rounded">
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <Button className="bg-gray-100 hover:bg-gray-200" onClick={fetchJobs}>Refresh</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse table-row-hover">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">ID</th>
              <th className="p-3">Task</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>}
            {!loading && jobs.length === 0 && <tr><td colSpan={6} className="p-4 text-center">No jobs found</td></tr>}
            {jobs.map(job => (
              <tr key={job.id} className="align-top border-b">
                <td className="p-3">{job.id}</td>
                <td className="p-3"><Link href={`/jobs/${job.id}`} className="text-blue-600">{job.taskName}</Link></td>
                <td className="p-3">{job.priority}</td>
                <td className="p-3">{renderStatus(job.status)}</td>
                <td className="p-3">{new Date(job.createdAt).toLocaleString()}</td>
                <td className="p-3 text-center">
                  <Button className={`bg-green-600 text-white hover:bg-green-700 ${runningId === job.id ? 'opacity-60 cursor-not-allowed' : ''}`} onClick={() => runJob(job.id)} disabled={runningId === job.id}>Run</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

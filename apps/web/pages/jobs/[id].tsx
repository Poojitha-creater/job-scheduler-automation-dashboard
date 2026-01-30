import Layout from '../../components/Layout';
import Badge from '../../components/Badge';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`${API}/jobs/${id}`).then(res => setJob(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading || !job) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Job #{job.id} — {job.taskName}</h2>
          <p className="text-sm text-gray-600">Created: {new Date(job.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={job.status === 'completed' ? 'green' : job.status === 'running' ? 'blue' : 'yellow'}>{job.status}</Badge>
          <Badge tone={job.priority === 'High' ? 'red' : job.priority === 'Medium' ? 'yellow' : 'gray'}>{job.priority}</Badge>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Payload</h3>
        <pre className="bg-gray-50 p-4 rounded mt-2 font-mono overflow-auto">{JSON.stringify(job.payload, null, 2)}</pre>
      </section>

    </Layout>
  );
}

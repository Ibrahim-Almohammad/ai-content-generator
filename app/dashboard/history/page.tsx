"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from 'react';

interface HistoryRecord {
  id: number;
  templateSlug: string;
  aiResponse: string;
  createdAt: string;
  createdBy: string;
}

const HistoryTable: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json() as HistoryRecord[];
        setHistoryData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white p-5 m-4 border rounded-md">
      <h1 className="text-2xl font-bold text-black">History</h1>
      <p className="mb-3">Search your previously generated AI content</p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Template</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">AI Response</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Created By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {historyData.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap">{record.templateSlug}</td>
              <td className="px-6 py-4 whitespace-pre-wrap">{record.aiResponse}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{record.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;

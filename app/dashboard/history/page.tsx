'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import Templates from '@/app/(data)/Templates'
import {Button} from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import {desc,eq} from 'drizzle-orm'
import Image from 'next/image'
import {TEMPLATE} from '../_components/TemplateListSection'

export interface HISTORY{
  id:number,
  formData:string,
  aiResponse:string | null;
  templateSlug:string,
  createdBy:string,
  createdAt:string | null;
}

export const wordCount = (text: string | null): number => {
  return text ? text.trim().split(/\s+/).length : 0;
};

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results: HISTORY[] = await db.select().from(AIOutput);
        setHistoryData(results);
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

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'No Date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}/${month}/${day}`;
  };

  return (
    <div className='bg-white border rounded-md m-4'>
      <h1 className='mt-3 text-2xl pl-2 font-bold'>History</h1>
      <p className='pl-2'>Search your previously generated AI content</p>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="text-black">TEMPLATE</TableHead>
            <TableHead className="text-black">AI RESP</TableHead>
            <TableHead className="text-black">DATE</TableHead>
            <TableHead className="text-black">WORDS</TableHead>
            <TableHead className="text-black">COPY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((record) => (
            <TableRow  key={record.id}>
              <TableCell className="font-medium ">{record.templateSlug}</TableCell>
              <TableCell className='px-6 pb-5 text-sm text-gray-500 line-clamp-3 max-w-xs'>{record.aiResponse ?? 'No Response'}</TableCell>
              <TableCell>{record.createdAt ? formatDate(record.createdAt) : 'No Date'}</TableCell>
              <TableCell>{wordCount(record.aiResponse)} </TableCell>
              <TableCell>
                <button
                  className="text-blue-600 hover:text-blue-900 p-2"
                  onClick={() => navigator.clipboard.writeText(record.aiResponse ?? '')}
                >
                  Copy
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;

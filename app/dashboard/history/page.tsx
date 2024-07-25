'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import { TEMPLATE } from '../_components/TemplateListSection'
import moment from 'moment'
import { Copy } from 'lucide-react'
import Link from 'next/link'

export interface HISTORY {
  id: number,
  formData: string,
  aiResponse: string | null;
  templateSlug: string,
  createdBy: string,
  createdAt: string | null;
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

    const dateFormats = ['DD/MM/YYYY', 'MM/DD/YYYY'];
    const date = moment(dateString, dateFormats, true);

    if (!date.isValid()) {
      return 'Invalid Date';
    }

    return date.format('DD/MM/YYYY');
  };

  const getTemplateDetails = (templateSlug: string) => {
    const template = Templates.find((template: TEMPLATE) => template.slug === templateSlug);
    if (!template) return { icon: '', name: 'Unknown Template' };

    return { icon: template.icon, name: template.name };
  };

  return (
    <div className='bg-white border rounded-md m-4'>
      <h1 className='mt-3 text-3xl pl-2 font-bold'>History</h1>
      <p className='pl-2 pb-3'>Search your previously generated AI content</p>
      <Table >
        <TableHeader>
          <TableRow className='bg-slate-100'>
            <TableHead className="text-black font-bold">TEMPLATE</TableHead>
            <TableHead className="text-black font-bold ">AI RESP</TableHead>
            <TableHead className="text-black font-bold">DATE</TableHead>
            <TableHead className="text-black font-bold">WORDS</TableHead>
            <TableHead className="text-black font-bold">COPY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((record) => {
            const { icon, name } = getTemplateDetails(record.templateSlug);

            return (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  <div className='flex items-center gap-2'>
                    <Image src={icon} alt='icon' width={30} height={30} />
                    <span>{name}</span>
                  </div>
                </TableCell>
                <TableCell className='px-6 pb-5 text-sm   text-gray-600 line-clamp-3 max-w-xs'>
                  {record.aiResponse ?? 'No Response'}
                </TableCell>
                <TableCell>
                  {record.createdAt ? formatDate(record.createdAt) : 'No Date'}
                </TableCell>
                <TableCell>
                  {wordCount(record.aiResponse)}
                </TableCell>
                <TableCell>
                  <Button className='flex gap-2'
                    onClick={() => navigator.clipboard.writeText(record.aiResponse ?? '')}>
                    <Copy className='w-4 h-4' />Copy
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;

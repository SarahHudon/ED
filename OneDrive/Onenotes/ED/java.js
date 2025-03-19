import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Card className="rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500">{item.description}</p>
              <Button className="mt-4 w-full">Action</Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;


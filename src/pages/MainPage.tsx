import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, PieChart, Pie, Cell, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sidebar } from "@/components/ui/Sidebar";

const data = [
  { name: "2018", value: 200 },
  { name: "2019", value: 300 },
  { name: "2020", value: 400 },
  { name: "2021", value: 350 },
  { name: "2022", value: 420 },
  { name: "2023", value: 500 },
  { name: "2024", value: 230 },
];

const pieData = [
  { name: "국제화", value: 20, color: "#6b5b95" },
  { name: "현지화", value: 20, color: "#feb236" },
  { name: "컨설팅", value: 15, color: "#d64161" },
];

const tableData = [
  { id: 111, name: "GT-A-24-0003", code: "GT", type: "국제화", year: "2024", views: 210 },
  { id: 112, name: "GT-A-24-0004", code: "GT", type: "국제화", year: "2024", views: 320 },
  { id: 113, name: "GC-A-24-0004", code: "GC", type: "현지화", year: "2024", views: 242 },
  { id: 114, name: "GC-A-24-0007", code: "GC", type: "컨설팅", year: "2024", views: 309 },
  { id: 115, name: "GC-A-24-0012", code: "GC", type: "현지화", year: "2024", views: 322 },
  { id: 116, name: "GT-A-23-0002", code: "GT", type: "국제화", year: "2023", views: 459 },
  { id: 117, name: "GC-A-22-0001", code: "GC", type: "현지화", year: "2022", views: 243 },
  { id: 118, name: "GT-A-21-0004", code: "GT", type: "컨설팅", year: "2021", views: 334 },
  { id: 119, name: "GC-A-19-0005", code: "GC", type: "국제화", year: "2019", views: 323 },
  { id: 120, name: "GC-A-18-0001", code: "GC", type: "국제화", year: "2018", views: 112 },
];

const MainPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <Input placeholder="Search..." className="w-1/3" />
          <Button className="bg-blue-500 text-white px-4 py-2">Search</Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
            <Card>
            <Table>
              <TableHeader>
              <TableRow>
                <TableHead>순번</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>코드</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>연도</TableHead>
                <TableHead>조회수</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.views}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
            </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-4">연도별 전체 리포트</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4a90e2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
            <Card>
            <h3 className="text-lg font-semibold mb-4">2024년 전체 리포트</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
                {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              </PieChart>
            </ResponsiveContainer>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className="w-full border-collapse border border-gray-300">{children}</table>;
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead className="bg-gray-200">{children}</thead>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border-b border-gray-300">{children}</tr>;
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <th className="p-2 border border-gray-300 text-left">{children}</th>;
};

export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="p-2 border border-gray-300">{children}</td>;
};

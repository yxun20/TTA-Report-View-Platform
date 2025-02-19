// src/pages/ReportDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** 백엔드에서 내려오는 JSON 구조에 대응하는 타입들 */
interface DefectType {
  image: string[] | null;
  description: string[] | null;
}

interface DataItem {
  id: string;
  defect: DefectType;
  results: {
    [locale: string]: string;
  };
}

interface ReportDetail {
  id: number;
  report_title: string;
  report_id: string;
  report_date: string;
  company_name: string;
  product_name: string;
  type: string;
  start_date: string;
  end_date: string;
  language_territory: string[];
  data: DataItem[];
}

const ReportDetailPage: React.FC = () => {
  const { reportId } = useParams(); // /report/:reportId
  const [reportDetail, setReportDetail] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (reportId) {
      fetch(`http://10.10.8.88:8000/services/internationalizations/list/${reportId}`)
        .then((res) => res.json())
        .then((data: ReportDetail) => {
          setReportDetail(data);
        })
        .catch((error) => {
          console.error('Error fetching detail:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [reportId]);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!reportDetail) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>데이터가 없습니다.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Noto Sans KR, sans-serif' }}>
      <h2 style={{ marginBottom: '10px' }}>{reportDetail.report_title}</h2>
      <div style={{ marginBottom: '5px' }}>
        <strong>Report ID:</strong> {reportDetail.report_id}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>Company:</strong> {reportDetail.company_name}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>Product:</strong> {reportDetail.product_name}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>Type:</strong> {reportDetail.type}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>Report Date:</strong> {reportDetail.report_date}
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>Period:</strong> {reportDetail.start_date} ~ {reportDetail.end_date}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Languages:</strong> {reportDetail.language_territory.join(', ')}
      </div>

      <h3 style={{ marginBottom: '10px' }}>데이터 항목</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9f9f9' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Defect</th>
            <th style={tableHeaderStyle}>Results</th>
          </tr>
        </thead>
        <tbody>
          {reportDetail.data.map((item) => (
            <tr key={item.id}>
              <td style={tableCellStyle}>{item.id}</td>
              <td style={tableCellStyle}>
                {/* 이미지 */}
                {item.defect.image && item.defect.image.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Image(s):</strong>
                    <ul style={{ margin: '5px 0 0 20px' }}>
                      {item.defect.image.map((img, idx) => (
                        <li key={idx}>{img}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* 설명 */}
                {item.defect.description && item.defect.description.length > 0 && (
                  <div>
                    <strong>Description(s):</strong>
                    <ul style={{ margin: '5px 0 0 20px' }}>
                      {item.defect.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </td>
              <td style={tableCellStyle}>
                {Object.entries(item.results).map(([locale, result]) => (
                  <div key={locale}>
                    <strong>{locale}:</strong> {result}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportDetailPage;

// 간단한 테이블 스타일
const tableHeaderStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '8px',
};

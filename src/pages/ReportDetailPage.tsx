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
  report_title: string;     // 예: "GT-A-24-0003"
  report_id: string;        // 예: "240003"
  report_date: string;      // 예: "2023-08-01"
  company_name: string;     // 예: "(주)틸다"
  product_name: string;     // 예: "에고그릭스 v3"
  type: string;             // 예: "국제화"
  start_date: string;       // 예: "2023-01-12"
  end_date: string;         // 예: "2024-08-01"
  language_territory: string[]; // 예: ["en-US", "ja-JP", "fr-FR"]
  data: DataItem[];
}

const ReportDetailPage: React.FC = () => {
  const { reportId } = useParams(); // /report/:reportId
  const [reportDetail, setReportDetail] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 필터 버튼 상태: 각 필드별(true면 유효값만 보기)
  const [activeFilters, setActiveFilters] = useState<{
    defect: boolean;
    'en-US': boolean;
    'ja-JP': boolean;
    'fr-FR': boolean;
  }>({
    defect: false,
    'en-US': false,
    'ja-JP': false,
    'fr-FR': false,
  });

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => ({ ...prev, [filter]: !prev[filter as keyof typeof prev] }));
  };

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
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!reportDetail) {
    return (
      <div style={styles.noDataContainer}>
        <h2>데이터가 없습니다.</h2>
      </div>
    );
  }

  // (1) 동적으로 언어 열을 생성하기 위한 배열
  const locales = reportDetail.language_territory || [];

  // 활성화된 필터에 따라 데이터 필터링 (모든 활성 필터를 만족하는 경우에만 표시)
  const filteredData = reportDetail.data.filter((item) => {
    let valid = true;
    if (activeFilters.defect) {
      // defect: image나 description 중 하나라도 값이 있어야 함.
      const hasDefect =
        (item.defect.image && item.defect.image.length > 0) ||
        (item.defect.description && item.defect.description.length > 0);
      valid = valid && hasDefect;
    }
    // 언어별 필터: 해당 locale에 결과가 존재하고, "NA"가 아니어야 함.
    ['en-US', 'ja-JP', 'fr-FR'].forEach((locale) => {
      if (activeFilters[locale as keyof typeof activeFilters]) {
        valid = valid && Boolean(item.results[locale]) && item.results[locale] !== 'NA';
      }
    });
    return valid;
  });

  return (
    <div style={styles.pageContainer}>
      {/* (1) 제목 */}
      <h1 style={styles.mainTitle}>{reportDetail.report_title}</h1>

      {/* (2) 보고서 정보: 7개 박스로 분리 */}
      <div style={styles.infoRow}>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Report ID</div>
          <div style={styles.infoBoxValue}>{reportDetail.report_id}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Company</div>
          <div style={styles.infoBoxValue}>{reportDetail.company_name}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Product</div>
          <div style={styles.infoBoxValue}>{reportDetail.product_name}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Type</div>
          <div style={styles.infoBoxValue}>{reportDetail.type}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Report Date</div>
          <div style={styles.infoBoxValue}>{reportDetail.report_date}</div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Period</div>
          <div style={styles.infoBoxValue}>
            {reportDetail.start_date} ~ {reportDetail.end_date}
          </div>
        </div>
        <div style={styles.infoBox}>
          <div style={styles.infoBoxLabel}>Languages</div>
          <div style={styles.infoBoxValue}>{locales.join(', ')}</div>
        </div>
      </div>

      {/* (3) 데이터 항목 테이블 */}
      <div style={styles.tableContainer}>
        {/* 상단 타이틀 영역: 좌측엔 "데이터 항목", 우측엔 필터 컨트롤 */}
        <div style={styles.tableHeader}>
          <h3 style={styles.sectionTitle}>데이터 항목</h3>
          <div style={styles.filterContainer}>
            <div style={styles.filterText}>유효값만 보기</div>
            <div style={styles.filterButtons}>
              {['defect', 'en-US', 'ja-JP', 'fr-FR'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  style={{
                    ...styles.filterButton,
                    backgroundColor: activeFilters[filter as keyof typeof activeFilters]
                      ? '#E3F2FD'
                      : '#fff',
                  }}
                >
                  {filter === 'defect' ? 'Defect' : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Defect</th>
              {/* 언어별로 열 생성 */}
              {locales.map((locale) => (
                <th style={styles.th} key={locale}>
                  {locale}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} style={styles.tr}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>
                  {/* 이미지 */}
                  {item.defect.image && item.defect.image.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Image(s):</strong>
                      <ul style={styles.defectList}>
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
                      <ul style={styles.defectList}>
                        {item.defect.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>
                {/* 언어별 결과 표시 */}
                {locales.map((locale) => (
                  <td style={styles.td} key={locale}>
                    {item.results[locale] ? item.results[locale] : 'NA'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDetailPage;

/* --------------------------
   스타일
-------------------------- */
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
    padding: '30px',
    boxSizing: 'border-box',
    fontFamily: 'Noto Sans KR, sans-serif',
  },
  loading: {
    padding: '20px',
    fontFamily: 'Noto Sans KR, sans-serif',
  },
  noDataContainer: {
    padding: '20px',
    fontFamily: 'Noto Sans KR, sans-serif',
  },
  /* 메인 타이틀 (예: GT-A-24-0003) 크게 표시 */
  mainTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#333',
  },
  /* 보고서 정보 영역 */
  infoRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #d6d6d6',
    borderRadius: '6px',
    overflow: 'hidden',
    minWidth: '150px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  /* 라벨: 연한 하늘색 배경 */
  infoBoxLabel: {
    backgroundColor: '#E3F2FD', // 연한 하늘색
    padding: '8px 12px',
    fontWeight: 600,
    color: '#333',
    borderBottom: '1px solid #d6d6d6',
  },
  /* 값: 흰 배경 */
  infoBoxValue: {
    backgroundColor: '#fff',
    padding: '8px 12px',
    color: '#333',
  },
  /* 테이블 영역 */
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  /* 상단 타이틀와 필터 컨트롤을 감싸는 영역 */
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    fontSize: '14px',
  },
  th: {
    borderBottom: '2px solid #E6EAF0',
    textAlign: 'left',
    padding: '12px 8px',
    fontWeight: 600,
    backgroundColor: '#F9FBFD',
    color: '#333',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #E6EAF0',
  },
  td: {
    padding: '12px 8px',
    verticalAlign: 'top',
    color: '#555',
  },
  defectList: {
    margin: '5px 0 0 20px',
    padding: 0,
    listStyleType: 'disc',
  },
  /* 필터 관련 스타일 */
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  filterText: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  },
  filterButtons: {
    display: 'flex',
    gap: '5px',
  },
  filterButton: {
    padding: '5px 10px',
    fontSize: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
};

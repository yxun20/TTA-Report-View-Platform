import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// ----------------------
// 테이블에 사용될 데이터 구조
// ----------------------
interface ReportData {
  seq: number;   // 순번
  name: string;  // 예: "GT-4-24-0003"
  code: 'GC' | 'GT';
  type: '국제화' | '현지화' | '컨설팅';
  year: number;
  liked: boolean; // 좋아요 여부
}

const MainPage: React.FC = () => {
  // ---------------------------------------
  // 1) 차트 데이터 & 옵션
  // ---------------------------------------
  // 바 차트(연도별 표준 채택도) 데이터 & 옵션
  const barData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: '채택 건수',
        data: [3, 5, 6, 2, 9, 7],
        backgroundColor: '#4B9CFF',
        borderRadius: 4,
      },
    ],
  };

  const barOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2 },
      },
    },
  };

  // 도넛 차트: 2024, 2023 두 가지 데이터를 준비 (예시)
  const donutDataMap = {
    2024: {
      labels: ['국제화', '현지화', '컨설팅', '기타'],
      datasets: [
        {
          data: [19, 11, 18, 4],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          borderWidth: 0,
        },
      ],
    },
    2023: {
      labels: ['국제화', '현지화', '컨설팅', '기타'],
      datasets: [
        {
          data: [10, 15, 5, 12],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          borderWidth: 0,
        },
      ],
    },
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
    },
  };

  // 도넛 차트 연도 상태(2024 → 2023 전환)
  const [donutYear, setDonutYear] = useState<2024 | 2023>(2024);
  const doughnutData = donutDataMap[donutYear];

  // ---------------------------------------
  // 2) 테이블 데이터 (30개) + 좋아요/정렬/필터/페이지네이션
  // ---------------------------------------
  const initialData: ReportData[] = [
    // seq: 111 ~ 140
    // 적당히 분산해서 코드(GC, GT), 타입(국제화, 현지화, 컨설팅), 연도(2024, 2023, 2022) 섞어서 30개
    { seq: 111, name: 'GT-4-24-0001', code: 'GT', type: '국제화',  year: 2024, liked: false },
    { seq: 112, name: 'GT-4-24-0002', code: 'GC', type: '현지화',  year: 2024, liked: false },
    { seq: 113, name: 'GT-4-24-0003', code: 'GT', type: '컨설팅', year: 2023, liked: false },
    { seq: 114, name: 'GT-4-24-0004', code: 'GC', type: '국제화',  year: 2022, liked: false },
    { seq: 115, name: 'GT-4-24-0005', code: 'GT', type: '현지화',  year: 2022, liked: false },
    { seq: 116, name: 'GT-4-24-0006', code: 'GC', type: '컨설팅', year: 2024, liked: false },
    { seq: 117, name: 'GT-4-24-0007', code: 'GT', type: '국제화',  year: 2023, liked: false },
    { seq: 118, name: 'GT-4-24-0008', code: 'GC', type: '현지화',  year: 2024, liked: false },
    { seq: 119, name: 'GT-4-24-0009', code: 'GT', type: '컨설팅', year: 2023, liked: false },
    { seq: 120, name: 'GT-4-24-0010', code: 'GC', type: '국제화',  year: 2022, liked: false },
    { seq: 121, name: 'GT-4-24-0011', code: 'GC', type: '현지화',  year: 2024, liked: false },
    { seq: 122, name: 'GT-4-24-0012', code: 'GT', type: '국제화',  year: 2024, liked: false },
    { seq: 123, name: 'GT-4-24-0013', code: 'GT', type: '현지화',  year: 2023, liked: false },
    { seq: 124, name: 'GT-4-24-0014', code: 'GC', type: '컨설팅', year: 2022, liked: false },
    { seq: 125, name: 'GT-4-24-0015', code: 'GT', type: '국제화',  year: 2022, liked: false },
    { seq: 126, name: 'GT-4-24-0016', code: 'GC', type: '현지화',  year: 2024, liked: false },
    { seq: 127, name: 'GT-4-24-0017', code: 'GT', type: '컨설팅', year: 2023, liked: false },
    { seq: 128, name: 'GT-4-24-0018', code: 'GC', type: '국제화',  year: 2023, liked: false },
    { seq: 129, name: 'GT-4-24-0019', code: 'GT', type: '현지화',  year: 2024, liked: false },
    { seq: 130, name: 'GT-4-24-0020', code: 'GC', type: '국제화',  year: 2022, liked: false },
    { seq: 131, name: 'GT-4-24-0021', code: 'GT', type: '현지화',  year: 2024, liked: false },
    { seq: 132, name: 'GT-4-24-0022', code: 'GC', type: '컨설팅', year: 2023, liked: false },
    { seq: 133, name: 'GT-4-24-0023', code: 'GT', type: '국제화',  year: 2022, liked: false },
    { seq: 134, name: 'GT-4-24-0024', code: 'GC', type: '현지화',  year: 2022, liked: false },
    { seq: 135, name: 'GT-4-24-0025', code: 'GT', type: '컨설팅', year: 2024, liked: false },
    { seq: 136, name: 'GT-4-24-0026', code: 'GC', type: '국제화',  year: 2023, liked: false },
    { seq: 137, name: 'GT-4-24-0027', code: 'GT', type: '현지화',  year: 2022, liked: false },
    { seq: 138, name: 'GT-4-24-0028', code: 'GC', type: '컨설팅', year: 2024, liked: false },
    { seq: 139, name: 'GT-4-24-0029', code: 'GT', type: '국제화',  year: 2024, liked: false },
    { seq: 140, name: 'GT-4-24-0030', code: 'GC', type: '현지화',  year: 2022, liked: false },
  ];

  const [reportData, setReportData] = useState<ReportData[]>(initialData);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // 한 페이지 10개

  // 정렬 (오름차순/내림차순)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 필터 (code, type, year) - ''이면 전체
  const [codeFilter, setCodeFilter] = useState<string>('');  // 'GC' or 'GT' or ''
  const [typeFilter, setTypeFilter] = useState<string>('');  // '국제화' or '현지화' or '컨설팅' or ''
  const [yearFilter, setYearFilter] = useState<string>('');  // '2024' or '2023' or '2022' or ''

  // 필터 패널 표시/숨김
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  // 필터 + 정렬된 데이터
  const filteredSortedData = useMemo(() => {
    // 1) 필터
    let result = [...reportData];
    if (codeFilter) {
      result = result.filter((item) => item.code === codeFilter);
    }
    if (typeFilter) {
      result = result.filter((item) => item.type === typeFilter);
    }
    if (yearFilter) {
      result = result.filter((item) => String(item.year) === yearFilter);
    }

    // 2) 정렬(순번 seq 기준)
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.seq - b.seq;
      } else {
        return b.seq - a.seq;
      }
    });

    return result;
  }, [reportData, codeFilter, typeFilter, yearFilter, sortOrder]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredSortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredSortedData.slice(startIndex, endIndex);
  }, [filteredSortedData, currentPage]);

  // 페이지 이동
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 좋아요 토글
  const handleToggleLike = (seq: number) => {
    setReportData((prev) =>
      prev.map((item) =>
        item.seq === seq ? { ...item, liked: !item.liked } : item
      )
    );
  };

  // 옆으로 가기(도넛 차트 연도 토글)
  const handleToggleDonutYear = () => {
    setDonutYear((prev) => (prev === 2024 ? 2023 : 2024));
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 사이드바 */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          {/* 실제 로고 이미지가 있다면 <img src="..." alt="TTA Logo" style={{...}} /> 로 교체 */}
          <div style={styles.ttaLogoText}>
            <strong style={{ fontSize: 18 }}>TTA</strong>
            <div style={{ fontSize: 12, color: '#666' }}>한국정보통신기술협회</div>
          </div>
        </div>
        <nav style={styles.navMenu}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>전체</li>
            <li style={styles.navItem}>국제화</li>
            <li style={styles.navItem}>현지화</li>
            <li style={styles.navItem}>컨설팅</li>
            <li style={styles.navItem}>설정</li>
          </ul>
        </nav>
      </aside>

      {/* 메인 영역 */}
      <main style={styles.main}>
        {/* 상단 헤더 (검색 등) */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
            />
          </div>
          <div style={styles.headerRight}>
            <button style={styles.searchButton}>Search</button>
          </div>
        </header>

        {/* 컨텐츠 영역 */}
        <div style={styles.content}>
          {/* 테이블 영역 */}
          <div style={styles.tableSection}>
            <div style={styles.tableHeader}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* Sort 선택란 */}
                <label style={{ fontSize: 14 }}>
                  정렬:&nbsp;
                  <select
                    style={styles.selectBox}
                    value={sortOrder}
                    onChange={(e) => {
                      setSortOrder(e.target.value as 'asc' | 'desc');
                      setCurrentPage(1);
                    }}
                  >
                    <option value="asc">앞에서부터(오름차순)</option>
                    <option value="desc">뒤에서부터(내림차순)</option>
                  </select>
                </label>

                {/* Filter 버튼 */}
                <button
                  style={styles.filterButton}
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  Filter
                </button>
              </div>
            </div>

            {/* 필터 패널 (코드, 타입, 연도) */}
            {showFilterPanel && (
              <div style={styles.filterPanel}>
                <div>
                  <label style={styles.filterLabel}>코드:</label>
                  <select
                    style={styles.selectBox}
                    value={codeFilter}
                    onChange={(e) => {
                      setCodeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">전체</option>
                    <option value="GC">GC</option>
                    <option value="GT">GT</option>
                  </select>
                </div>

                <div>
                  <label style={styles.filterLabel}>타입:</label>
                  <select
                    style={styles.selectBox}
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">전체</option>
                    <option value="국제화">국제화</option>
                    <option value="현지화">현지화</option>
                    <option value="컨설팅">컨설팅</option>
                  </select>
                </div>

                <div>
                  <label style={styles.filterLabel}>연도:</label>
                  <select
                    style={styles.selectBox}
                    value={yearFilter}
                    onChange={(e) => {
                      setYearFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">전체</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            )}

            {/* 실제 테이블 */}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>순번</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr key={row.seq} style={styles.tr}>
                    <td style={styles.td}>{row.seq}</td>
                    <td style={styles.td}>{row.name}</td>
                    <td style={styles.td}>{row.code}</td>
                    <td style={styles.td}>{row.type}</td>
                    <td style={styles.td}>{row.year}</td>
                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.likeButton,
                          backgroundColor: row.liked ? '#ff5757' : '#eee',
                          color: row.liked ? '#fff' : '#333',
                        }}
                        onClick={() => handleToggleLike(row.seq)}
                      >
                        {row.liked ? '♥' : '♡'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이지네이션 */}
            <div style={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={{
                    ...styles.pageButton,
                    backgroundColor: page === currentPage ? '#4B9CFF' : '#fff',
                    color: page === currentPage ? '#fff' : '#333',
                  }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* 우측 차트 영역 */}
          <div style={styles.chartSection}>
            {/* 바 차트 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartTitle}>연도별 전체 리포트</div>
              <div style={{ width: '100%', height: '200px' }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            {/* 도넛 차트 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartHeader}>
                <div style={styles.chartTitle}>
                  {donutYear}년 전체 리포트
                </div>
                <button style={styles.nextYearButton} onClick={handleToggleDonutYear}>
                  옆으로 가기
                </button>
              </div>
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                {/* 중앙 텍스트(예: 총 52건) */}
                <div style={styles.doughnutCenterText}>
                  <div style={{ fontSize: 14, color: '#333' }}>
                    {/* 예시로 "총 XX건" */}
                    {donutYear === 2024 ? '총 52건' : '총 42건'}
                  </div>
                </div>
              </div>
              {/* 범례(수동) */}
              <div style={styles.doughnutLegend}>
                {doughnutData.labels.map((label: string, idx: number) => {
                  const bgColor = doughnutData.datasets[0].backgroundColor[idx];
                  const value = doughnutData.datasets[0].data[idx];
                  return (
                    <div style={styles.legendItem} key={label}>
                      <span
                        style={{ ...styles.legendColor, backgroundColor: bgColor }}
                      />
                      {label} ({value})
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ---------------------------------------
// 인라인 스타일 정의(비율/레이아웃 중심)
// ---------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    fontFamily: '"Noto Sans KR", sans-serif',
    color: '#333',
    backgroundColor: '#F5F5F5',
  },
  // 사이드바
  sidebar: {
    width: '220px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  logoArea: {
    padding: '20px',
    borderBottom: '1px solid #eee',
  },
  ttaLogoText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
  },
  navMenu: {
    flex: 1,
    padding: '20px 0',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
  },

  // 메인 영역
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '60px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  searchInput: {
    width: '220px',
    height: '36px',
    padding: '0 10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  searchButton: {
    height: '36px',
    padding: '0 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4B9CFF',
    color: '#fff',
    cursor: 'pointer',
  },

  // 컨텐츠 레이아웃
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },

  // 테이블 섹션
  tableSection: {
    flex: 1,
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  filterPanel: {
    display: 'flex',
    gap: '20px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
  },
  filterLabel: {
    marginRight: '6px',
    fontSize: '14px',
  },
  sortButton: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  filterButton: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  selectBox: {
    padding: '4px 6px',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 0 4px rgba(0,0,0,0.05)',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fafafa',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    verticalAlign: 'middle',
  },

  // 좋아요 버튼
  likeButton: {
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: '14px',
  },

  // 페이지네이션
  pagination: {
    marginTop: '10px',
    display: 'flex',
    gap: '8px',
  },
  pageButton: {
    minWidth: '32px',
    height: '32px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },

  // 차트 섹션
  chartSection: {
    width: '380px',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderLeft: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  chartBlock: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '10px 0',
    boxSizing: 'border-box',
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: '10px',
  },
  chartTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  nextYearButton: {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4B9CFF',
    color: '#fff',
    padding: '4px 10px',
    fontSize: '13px',
  },
  doughnutCenterText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  doughnutLegend: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontSize: '13px',
    paddingLeft: '10px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendColor: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '2px',
  },
};

export default MainPage;

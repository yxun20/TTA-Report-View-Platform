import React from 'react';
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

const MainPage: React.FC = () => {
  // ---------------------------------------
  // 바 차트(연도별 표준 채택도) 데이터 & 옵션
  // ---------------------------------------
  const barData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: '채택 건수',
        data: [3, 5, 6, 2, 9, 7], // 예시 데이터
        backgroundColor: '#4B9CFF',
        borderRadius: 4,
      },
    ],
  };

  const barOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  // ---------------------------------------
  // 도넛 차트(2025년 전체 표준 현황) 데이터 & 옵션
  // ---------------------------------------
  const doughnutData = {
    labels: ['인증', '평가', '표준', '기타'],
    datasets: [
      {
        data: [19, 11, 18, 4], // 예시 데이터
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // 도넛 두께
    plugins: {
      legend: {
        display: false, // 하단 범례 수동으로 표시
      },
    },
  };

  // 테이블에 표시할 예시 데이터
  const tableData = [
    { name: 'GT-4-24-0003', code: 'GC', type: 'Type A', year: 2024 },
    { name: 'GT-4-24-0004', code: 'GC', type: 'Type B', year: 2024 },
    { name: 'GT-4-24-0005', code: 'GC', type: 'Type C', year: 2024 },
    { name: 'GT-4-24-0006', code: 'GC', type: 'Type A', year: 2024 },
    { name: 'GT-4-24-0007', code: 'GC', type: 'Type B', year: 2024 },
    { name: 'GT-4-24-0008', code: 'GC', type: 'Type C', year: 2024 },
    { name: 'GT-4-24-0009', code: 'GC', type: 'Type A', year: 2024 },
    { name: 'GT-4-24-0010', code: 'GC', type: 'Type B', year: 2024 },
  ];

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
            <li style={styles.navItem}>표준</li>
            <li style={styles.navItem}>인증</li>
            <li style={styles.navItem}>평가</li>
            <li style={styles.navItem}>Settings</li>
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
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={styles.sortButton}>Sort</button>
                <button style={styles.filterButton}>Filter</button>
              </div>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Year</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} style={styles.tr}>
                    <td style={styles.td}>{row.name}</td>
                    <td style={styles.td}>{row.code}</td>
                    <td style={styles.td}>{row.type}</td>
                    <td style={styles.td}>{row.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 우측 차트 영역 */}
          <div style={styles.chartSection}>
            {/* 바 차트 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartTitle}>연도별 표준 채택도</div>
              <div style={{ width: '100%', height: '200px' }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>

            {/* 도넛 차트 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartTitle}>2025년 전체 표준 현황</div>
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                {/* 중앙 텍스트(총 52건) 표시 예시 */}
                <div style={styles.doughnutCenterText}>
                  <div style={{ fontSize: 14, color: '#333' }}>총 52건</div>
                </div>
              </div>
              {/* 범례(수동) */}
              <div style={styles.doughnutLegend}>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendColor, backgroundColor: '#FF6384' }} />
                  인증 (19)
                </div>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendColor, backgroundColor: '#36A2EB' }} />
                  평가 (11)
                </div>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendColor, backgroundColor: '#FFCE56' }} />
                  표준 (18)
                </div>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendColor, backgroundColor: '#8BC34A' }} />
                  기타 (4)
                </div>
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
  chartTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '10px',
    paddingLeft: '10px',
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

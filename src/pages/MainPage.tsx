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
import { Bar, Doughnut, getElementAtEvent } from 'react-chartjs-2';

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
  liked: boolean; // 즐겨찾기 여부
}

// 사이드바 메뉴 타입
type MenuType = '전체' | '국제화' | '현지화' | '컨설팅' | '설정' | '즐겨찾기';

const MainPage: React.FC = () => {
  // --------------------------------------------------
  // 0) 사이드바 선택 상태 (기본값: '전체')
  // --------------------------------------------------
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('전체');

  // --------------------------------------------------
  // 1) 데이터 (총 30개)
  // --------------------------------------------------
  const initialData: ReportData[] = [
    // seq: 111 ~ 140
    // 코드(GC/GT), 타입(국제화/현지화/컨설팅), 연도(2024/2023/2022/등등), liked=false
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
    { seq: 133, name: 'GT-4-24-0023', code: 'GT', type: '국제화',  year: 2021, liked: false },
    { seq: 134, name: 'GT-4-24-0024', code: 'GC', type: '현지화',  year: 2021, liked: false },
    { seq: 135, name: 'GT-4-24-0025', code: 'GT', type: '컨설팅', year: 2018, liked: false },
    { seq: 136, name: 'GT-4-24-0026', code: 'GC', type: '국제화',  year: 2017, liked: false },
    { seq: 137, name: 'GT-4-24-0027', code: 'GT', type: '현지화',  year: 2020, liked: false },
    { seq: 138, name: 'GT-4-24-0028', code: 'GC', type: '컨설팅', year: 2019, liked: false },
    { seq: 139, name: 'GT-4-24-0029', code: 'GT', type: '국제화',  year: 2018, liked: false },
    { seq: 140, name: 'GT-4-24-0030', code: 'GC', type: '현지화',  year: 2018, liked: false },

  ];

  const [reportData, setReportData] = useState<ReportData[]>(initialData);

  // --------------------------------------------------
  // 2) 사이드바 메뉴 클릭
  //    - '국제화/현지화/컨설팅' 선택 시 해당 type만 보이도록
  //    - '즐겨찾기'는 liked=true만
  //    - '전체'/'설정'은 필터 없음
  //    - 차트 제목도 바뀌도록
  // --------------------------------------------------
  const handleMenuClick = (menu: MenuType) => {
    setSelectedMenu(menu);
    // 사이드 메뉴 선택 시, 필터 패널은 별도로 존재하므로
    // 여기서 codeFilter, yearFilter 등은 초기화할지 여부는 상황에 따라 다릅니다.
    // 요청사항에 "국제화 클릭 시 국제화만 보이게" 라고 했으므로, 필터와 충돌을 피하기 위해
    // 여기서는 typeFilter 등도 초기화하겠습니다.
    if (menu === '국제화') {
      setTypeFilter('국제화');
    } else if (menu === '현지화') {
      setTypeFilter('현지화');
    } else if (menu === '컨설팅') {
      setTypeFilter('컨설팅');
    } else {
      // '전체', '설정', '즐겨찾기'에서는 typeFilter 해제
      setTypeFilter('');
    }
    // 코드/연도 필터도 해제
    setCodeFilter('');
    setYearFilter('');
    // 페이지도 첫 페이지로
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // 3) 검색 기능
  // --------------------------------------------------
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    // Search 버튼 클릭 시에만 검색 적용
    // (또는 onChange로 실시간 검색 가능하지만, 요청상 버튼 클릭으로 처리)
    setCurrentPage(1);
    setSearchExecuted(true);
  };

  // 검색 버튼이 눌렸는지 여부(검색창 clear 후, 다시 전체 보이게 등 제어)
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);

  // --------------------------------------------------
  // 4) 필터 + 정렬 + 페이지네이션
  // --------------------------------------------------
  // 정렬 (오름차순/내림차순)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 필터 (code, type, year)
  const [codeFilter, setCodeFilter] = useState<string>('');  // 'GC' or 'GT' or ''
  const [typeFilter, setTypeFilter] = useState<string>('');  // '국제화' or '현지화' or '컨설팅' or ''
  const [yearFilter, setYearFilter] = useState<string>('');  // '2024' or '2023' or '2022' or ''

  // 필터 패널 표시/숨김
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  // 필터 개수 (codeFilter, typeFilter, yearFilter 중 몇 개가 선택?)
  const filterCount = useMemo(() => {
    let cnt = 0;
    if (codeFilter) cnt++;
    if (typeFilter) cnt++;
    if (yearFilter) cnt++;
    return cnt;
  }, [codeFilter, typeFilter, yearFilter]);

  // 최종 테이블에 표시될 데이터 계산
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // 한 페이지 10개

  const filteredSortedData = useMemo(() => {
    let result = [...reportData];

    // 1) 사이드바 메뉴에 따른 1차 필터
    if (selectedMenu === '즐겨찾기') {
      // 즐겨찾기만
      result = result.filter((item) => item.liked === true);
    } else if (selectedMenu === '국제화') {
      // 이미 setTypeFilter('국제화')를 통해 필터도 걸리겠지만,
      // 혹시 중복 처리를 피하려면 여기서는 굳이 안 해도 됨
      // => 아래 2)번에서 typeFilter와 합쳐집니다.
    } else if (selectedMenu === '현지화') {
      // 동일
    } else if (selectedMenu === '컨설팅') {
      // 동일
    } else {
      // '전체', '설정'은 별도 필터 없음
    }

    // 2) 필터 패널
    if (codeFilter) {
      result = result.filter((item) => item.code === codeFilter);
    }
    if (typeFilter) {
      result = result.filter((item) => item.type === typeFilter);
    }
    if (yearFilter) {
      result = result.filter((item) => String(item.year) === yearFilter);
    }

    // 3) 검색(Search)
    // 검색 버튼을 눌렀을 때만 적용
    if (searchExecuted && searchTerm.trim() !== '') {
      const lower = searchTerm.trim().toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(lower)
      );
    }

    // 4) 정렬(순번 seq)
    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.seq - b.seq;
      } else {
        return b.seq - a.seq;
      }
    });

    return result;
  }, [
    reportData,
    selectedMenu,
    codeFilter,
    typeFilter,
    yearFilter,
    searchTerm,
    searchExecuted,
    sortOrder,
  ]);

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

  // 즐겨찾기 토글 (별표)
  const handleToggleLike = (seq: number) => {
    setReportData((prev) =>
      prev.map((item) =>
        item.seq === seq ? { ...item, liked: !item.liked } : item
      )
    );
  };

  // --------------------------------------------------
  // 5) 차트: 막대그래프, 도넛그래프
  //    - 사이드바 메뉴에 따라 그래프 제목 & 데이터 변경
  //    - 막대그래프 클릭 시 해당 연도의 도넛 그래프
  //    - <, > 버튼으로 2018~2024 범위 이동
  // --------------------------------------------------

  // (A) 차트 타이틀에서 메뉴명 표시
  const getReportTitle = () => {
    if (selectedMenu === '전체' || selectedMenu === '설정') return '전체';
    return selectedMenu; // '국제화' | '현지화' | '컨설팅' | '즐겨찾기'
  };

  // (B) 막대그래프 데이터 (2018~2024)
  //     - 사이드바 선택 상태에 맞게, initialData를 기준으로 연도별 개수를 계산
  const getBarChartData = () => {
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

    // 사이드바별로 어떤 조건으로 세는지 결정
    const countByYear = years.map((yr) => {
      // 해당 연도 + selectedMenu 조건에 맞는 개수
      let items = initialData.filter((item) => item.year === yr);

      if (selectedMenu === '즐겨찾기') {
        items = items.filter((i) => i.liked === true);
      } else if (selectedMenu === '국제화') {
        items = items.filter((i) => i.type === '국제화');
      } else if (selectedMenu === '현지화') {
        items = items.filter((i) => i.type === '현지화');
      } else if (selectedMenu === '컨설팅') {
        items = items.filter((i) => i.type === '컨설팅');
      } 
      // '전체'/'설정' 은 모든 데이터

      return items.length;
    });

    return {
      labels: years.map(String),
      datasets: [
        {
          label: '채택 건수',
          data: countByYear,
          backgroundColor: '#4B9CFF',
          borderRadius: 4,
        },
      ],
    };
  };

  // 막대그래프 옵션
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
    // 막대 클릭 이벤트를 사용하기 위해
    onClick: (event: any, elements: any) => {
      if (!elements || !elements.length) return;
      const element = elements[0];
      const index = element.index;
      const label = getBarChartData().labels[index];
      // label이 '2018' ~ '2024'
      const yearNum = parseInt(label, 10);
      setDonutYear(yearNum);
    },
  };

  // (C) 도넛 그래프
  //     - 2018~2024년, 사이드바 메뉴에 따른 분포
  //     - 분포는 "국제화 / 현지화 / 컨설팅 / 기타" 4가지
  //     - 실제론 데이터에서 동적으로 구할 수도 있지만, 여기서는 직접 계산
  const [donutYear, setDonutYear] = useState<number>(2024);

  // 이전/다음 연도 이동
  const handlePrevYear = () => {
    if (donutYear > 2018) {
      setDonutYear(donutYear - 1);
    }
  };
  const handleNextYear = () => {
    if (donutYear < 2024) {
      setDonutYear(donutYear + 1);
    }
  };

  // 해당 연도 + 메뉴에 맞는 도넛 데이터 계산
  const getDonutData = () => {
    // 해당 연도 & selectedMenu에 해당하는 데이터만 추출
    let items = initialData.filter((item) => item.year === donutYear);

    if (selectedMenu === '즐겨찾기') {
      items = items.filter((i) => i.liked === true);
    } else if (selectedMenu === '국제화') {
      items = items.filter((i) => i.type === '국제화');
    } else if (selectedMenu === '현지화') {
      items = items.filter((i) => i.type === '현지화');
    } else if (selectedMenu === '컨설팅') {
      items = items.filter((i) => i.type === '컨설팅');
    }
    // '전체'/'설정' 은 필터 없음

    // 이제 items를 type별로 집계
    const countByType = {
      국제화: 0,
      현지화: 0,
      컨설팅: 0,
      기타: 0,
    };

    items.forEach((it) => {
      if (it.type === '국제화') countByType.국제화++;
      else if (it.type === '현지화') countByType.현지화++;
      else if (it.type === '컨설팅') countByType.컨설팅++;
      else countByType.기타++;
    });

    const labels = ['국제화', '현지화', '컨설팅', '기타'];
    const dataValues = [
      countByType.국제화,
      countByType.현지화,
      countByType.컨설팅,
      countByType.기타,
    ];

    return {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A'],
          borderWidth: 0,
        },
      ],
    };
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
    },
  };

  // --------------------------------------------------
  // 렌더링
  // --------------------------------------------------
  return (
    <div style={styles.container}>
      {/* --- 사이드바 --- */}
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
            {/* 1) 전체 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '전체' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('전체')}
            >
              전체
            </li>
            {/* 2) 국제화 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '국제화' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('국제화')}
            >
              국제화
            </li>
            {/* 3) 현지화 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '현지화' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('현지화')}
            >
              현지화
            </li>
            {/* 4) 컨설팅 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '컨설팅' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('컨설팅')}
            >
              컨설팅
            </li>
          </ul>

          {/* 구분선 */}
          <hr style={styles.navDivider} />

          <ul style={styles.navList}>
            {/* 5) 설정 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '설정' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('설정')}
            >
              설정
            </li>
            {/* 6) 즐겨찾기 */}
            <li
              style={{
                ...styles.navItem,
                backgroundColor: selectedMenu === '즐겨찾기' ? '#EAF5FF' : 'transparent',
              }}
              onClick={() => handleMenuClick('즐겨찾기')}
            >
              즐겨찾기
            </li>
          </ul>
        </nav>
      </aside>

      {/* --- 메인 영역 --- */}
      <main style={styles.main}>
        {/* --- 상단 헤더 (검색 등) --- */}
        <header style={styles.header}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // 검색어를 바꾸면 아직 검색 실행 전 상태
                setSearchExecuted(false);
              }}
            />
            <button style={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>
        </header>

        {/* --- 컨텐츠 영역 (테이블 + 차트) --- */}
        <div style={styles.content}>
          {/* --- 테이블 영역 --- */}
          <div style={styles.tableSection}>
            <div style={styles.tableHeader}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* 정렬 선택란 */}
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

                {/* Filter 버튼 + 선택 개수 표시 */}
                <button
                  style={styles.filterButton}
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  Filter
                  {filterCount > 0 && (
                    <span style={styles.filterCountBadge}>{filterCount}</span>
                  )}
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
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
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
                  <th style={styles.th}>즐겨찾기</th>
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
                          backgroundColor: row.liked ? '#FFD700' : '#eee',
                          color: row.liked ? '#fff' : '#333',
                        }}
                        onClick={() => handleToggleLike(row.seq)}
                      >
                        {row.liked ? '★' : '☆'}
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

          {/* --- 우측 차트 영역 --- */}
          <div style={styles.chartSection}>
            {/* (1) 막대 그래프 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartTitle}>
                연도별 {getReportTitle()} 리포트
              </div>
              <div style={{ width: '100%', height: '200px' }}>
                <Bar data={getBarChartData()} options={barOptions} />
              </div>
            </div>

            {/* (2) 도넛 그래프 */}
            <div style={styles.chartBlock}>
              <div style={styles.chartHeader}>
                <div style={styles.chartTitle}>
                  {donutYear}년 {getReportTitle()} 리포트
                </div>
                <div>
                  <button style={styles.navYearButton} onClick={handlePrevYear}>
                    &lt;
                  </button>
                  <button style={styles.navYearButton} onClick={handleNextYear}>
                    &gt;
                  </button>
                </div>
              </div>
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Doughnut data={getDonutData()} options={doughnutOptions} />
                {/* 중앙 텍스트(예: 총 n건) */}
                <div style={styles.doughnutCenterText}>
                  <div style={{ fontSize: 14, color: '#333' }}>
                    총 {getDonutData().datasets[0].data.reduce((a: number, b: number) => a + b, 0)}건
                  </div>
                </div>
              </div>
              {/* 범례(수동) */}
              <div style={styles.doughnutLegend}>
                {getDonutData().labels.map((label: string, idx: number) => {
                  const bgColor = getDonutData().datasets[0].backgroundColor[idx];
                  const value = getDonutData().datasets[0].data[idx];
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
// 인라인 스타일 정의
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
  navDivider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #eee',
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
    userSelect: 'none',
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
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  // 검색창 + 버튼을 나란히 배치하고, 검색창을 크게
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
  },
  searchInput: {
    flex: 1,
    height: '36px',
    padding: '0 10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
  },
  searchButton: {
    height: '36px',
    padding: '0 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4B9CFF',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
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
    position: 'relative',
    padding: '6px 12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  filterCountBadge: {
    display: 'inline-block',
    marginLeft: '6px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#4B9CFF',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: '13px',
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

  // 즐겨찾기(별표) 버튼
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
  navYearButton: {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4B9CFF',
    color: '#fff',
    padding: '4px 8px',
    fontSize: '13px',
    marginLeft: '4px',
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

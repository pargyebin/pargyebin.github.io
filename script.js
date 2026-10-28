// 제공된 데이터 세트
const MATERIALS = {
  "PET": { "name": "PET", "category": "플라스틱" },
  "HDPE": { "name": "HDPE", "category": "플라스틱" },
  "LDPE": { "name": "LDPE", "category": "비닐류" },
  "PP": { "name": "PP", "category": "플라스틱" },
  "PS": { "name": "PS", "category": "플라스틱" },
  "PVC": { "name": "PVC", "category": "플라스틱" },
  "종이": { "name": "종이", "category": "종이류" },
  "종이팩": { "name": "종이팩", "category": "종이팩" },
  "유리": { "name": "유리", "category": "유리병" },
  "철": { "name": "철", "category": "금속류" },
  "알루미늄": { "name": "알루미늄", "category": "금속류" },
  "OTHER": { "name": "복합/기타 재질", "category": "제품별 확인" }
};

const ITEMS = {
  "페트병": {
    "keywords": ["페트병", "생수병", "생수", "음료수병"],
    "material": "PET",
    "waste_type": "플라스틱",
    "method": "내용물을 비우고 라벨을 제거한 뒤 압착하여 배출합니다."
  },
  "플라스틱 용기": {
    "keywords": ["플라스틱용기", "플라스틱", "용기"],
    "material": "PP",
    "waste_type": "플라스틱",
    "method": "내용물을 비우고 세척한 뒤 다른 재질의 부착물을 제거하여 배출합니다."
  },
  "세제통": {
    "keywords": ["세제", "세제통", "세탁세제", "주방세제"],
    "material": "HDPE",
    "waste_type": "플라스틱",
    "method": "내용물을 비우고 깨끗하게 세척한 뒤 플라스틱류로 배출합니다."
  },
  "비닐": {
    "keywords": ["비닐", "비닐봉투", "비닐봉지", "필름"],
    "material": "LDPE",
    "waste_type": "비닐류",
    "method": "내용물과 이물질을 제거한 뒤 비닐류로 배출합니다."
  },
  "우유팩": {
    "keywords": ["우유팩", "두유팩", "주스팩", "종이팩", "멸균팩"],
    "material": "종이팩",
    "waste_type": "종이팩",
    "method": "내용물을 비우고 헹군 뒤 펼쳐서 말린 후 종이팩으로 배출합니다."
  },
  "종이": {
    "keywords": ["종이", "신문", "신문지", "종이상자", "택배상자", "박스"],
    "material": "종이",
    "waste_type": "종이류",
    "method": "테이프와 비닐 등을 제거하고 깨끗하게 접어서 종이류로 배출합니다."
  },
  "유리병": {
    "keywords": ["유리병", "소주병", "맥주병", "음료수병", "유리"],
    "material": "유리",
    "waste_type": "유리병",
    "method": "내용물을 비우고 세척한 뒤 유리병류로 배출합니다."
  },
  "캔": {
    "keywords": ["캔", "철캔", "통조림"],
    "material": "철",
    "waste_type": "금속류",
    "method": "내용물을 비우고 세척한 뒤 금속류로 배출합니다."
  },
  "알루미늄캔": {
    "keywords": ["알루미늄캔", "맥주캔", "음료캔"],
    "material": "알루미늄",
    "waste_type": "금속류",
    "method": "내용물을 비우고 세척한 뒤 금속류로 배출합니다."
  },
  "건전지": {
    "keywords": ["건전지", "폐건전지", "배터리"],
    "material": "OTHER",
    "waste_type": "폐건전지",
    "method": "일반 쓰레기와 섞지 말고 폐건전지 전용 수거함에 배출합니다."
  },
  "스티로폼": {
    "keywords": ["스티로폼", "완충재", "발포폴리스티렌"],
    "material": "PS",
    "waste_type": "플라스틱",
    "method": "내용물과 테이프 등을 제거하고 깨끗한 경우 분리배출합니다."
  }
};

// DOM 요소 참조
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultCard = document.getElementById("resultCard");
const categoryChips = document.getElementById("categoryChips");

// 검색 실행 함수
function handleSearch(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    showPlaceholder();
    return;
  }

  // ITEMS에서 키워드 포함 여부 검색
  let foundKey = null;
  for (const [key, item] of Object.entries(ITEMS)) {
    if (item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase()))) {
      foundKey = key;
      break;
    }
  }

  if (foundKey) {
    const itemData = ITEMS[foundKey];
    const materialData = MATERIALS[itemData.material];
    renderResult(foundKey, itemData, materialData);
  } else {
    renderNotFound(cleanQuery);
  }
}

// 결과 카드 출력 함수
function renderResult(itemName, itemData, materialData) {
  resultCard.classList.remove("empty");
  resultCard.classList.add("active");

  const materialName = materialData ? materialData.name : itemData.material;

  resultCard.innerHTML = `
    <div class="result-header">
      <span class="result-title">${itemName}</span>
      <span class="badge">${itemData.waste_type}</span>
    </div>
    <div class="result-detail">
      <p><strong>주요 재질:</strong> ${materialName}</p>
      <p><strong>배출 방법:</strong> ${itemData.method}</p>
    </div>
  `;
}

// 검색 결과 없음 출력
function renderNotFound(query) {
  resultCard.classList.remove("empty");
  resultCard.classList.add("active");

  resultCard.innerHTML = `
    <div class="result-header">
      <span class="result-title">'${query}' 검색 결과 없음</span>
    </div>
    <div class="result-detail">
      <p>등록되지 않은 품목이거나 올바른 키워드가 아닙니다.</p>
      <p>우측 목록에서 해당 품목을 직접 찾아보세요.</p>
    </div>
  `;
}

// 기본 안내 문구 출력
function showPlaceholder() {
  resultCard.classList.remove("active");
  resultCard.classList.add("empty");
  resultCard.innerHTML = `<p class="placeholder-text">검색어를 입력하거나 우측 목록에서 항목을 선택해 보세요.</p>`;
}

// 우측 카테고리 칩 버튼 생성
function initCategoryChips() {
  Object.keys(ITEMS).forEach(key => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = key;
    chip.addEventListener("click", () => {
      searchInput.value = key;
      handleSearch(key);
    });
    categoryChips.appendChild(chip);
  });
}

// 이벤트 리스너 등록
searchBtn.addEventListener("click", () => handleSearch(searchInput.value));

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch(searchInput.value);
  }
});

// 초기화
initCategoryChips();

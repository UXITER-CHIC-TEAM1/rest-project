// 필터링 버튼 클릭 이벤트 js 코드
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-button');
  let selectedCategories = []; // 선택된 카테고리를 저장할 배열

  filterButtons.forEach(button => {
      button.addEventListener('click', function () {
          // 버튼이 이미 선택된 경우
          if (selectedCategories.includes(this.textContent)) {
              // 선택 해제
              this.style.backgroundColor = ''; // 기본 배경색으로 초기화
              this.style.color = ''; // 기본 글자색으로 초기화
              selectedCategories = selectedCategories.filter(category => category !== this.textContent); // 선택된 카테고리에서 제거
          } else {
              // 선택된 경우
              this.style.backgroundColor = '#384B60';
              this.style.color = 'white';
              selectedCategories.push(this.textContent); // 선택된 카테고리 추가
          }

          // 선택된 카테고리를 로컬 스토리지에 저장
          localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
      });
  });
});

  const modal = document.getElementById('place-modal');
  const openBtn = document.getElementById('open-modal-btn');

  // 모달이 열릴 때 지도를 생성하는 함수
  const initializeMap = () => {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 검색 버튼 또는 키워드 입력을 통한 검색
    document.getElementById('search-btn').addEventListener('click', () => {
        const keyword = document.getElementById('search-input').value;

        if (keyword) {
            ps.keywordSearch(keyword, (data, status, pagination) => {
                if (status === kakao.maps.services.Status.OK) {
                    const bounds = new kakao.maps.LatLngBounds();
                    data.forEach((place) => {
                        displayMarker(place);
                        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
                    });
                    map.setBounds(bounds);
                } else {
                    alert('검색 결과가 없습니다.');
                }
            });
        } else {
            alert('검색어를 입력해주세요.');
        }
    });

   // 마커 표시 및 클릭 이벤트

let selectedLocation; // 전역 변수로 location 정보 저장

// 마커 표시 및 클릭 이벤트
function displayMarker(place) {
  const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
  });

  const placeInfoInput = document.getElementById('search-input');

  let clickCount = 0;
  let selectedPlaceText = document.querySelector('.place-info p');

  kakao.maps.event.addListener(marker, 'click', () => {
      clickCount++;

      if (clickCount === 1) {
          infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
          infowindow.open(map, marker);
      } else if (clickCount === 2) {
          modal.style.display = 'none';
          placeInfoInput.value = place.place_name;
          clickCount = 0;

          // location 정보 설정 (위치 객체 생성 후 로컬 스토리지에 저장)
          selectedLocation = JSON.stringify({
              name: place.place_name,
              lat: place.y,
              lng: place.x,
          });
          localStorage.setItem('selectedLocation', selectedLocation); // 로컬 스토리지에 저장
          // 선택한 장소 이름을 '장소를 추가해주세요' 부분에 표시
      selectedPlaceText.textContent = place.place_name;
      }
  });
}

// 페이지 로드 시 로컬 스토리지에 저장된 장소 표시
window.addEventListener('DOMContentLoaded', () => {
  const savedLocation = localStorage.getItem('selectedLocation');
  if (savedLocation) {
    const parsedLocation = JSON.parse(savedLocation);
    selectedPlaceText.textContent = parsedLocation.name; // 저장된 장소 이름을 표시
  }
});


// 장소 정보를 데이터베이스에 저장하는 함수
async function saveLocation(locationData) {
  try {
      const response = await fetch('/create-post', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${yourToken}`, // JWT 토큰 추가
          },
          body: JSON.stringify(locationData),
      });

      const result = await response.json();
      if (result.success) {
          alert('장소 정보가 저장되었습니다.');
      } else {
          alert('장소 정보 저장에 실패했습니다.');
      }
  } catch (error) {
      console.error('장소 정보 저장 중 오류:', error);
      alert('장소 정보 저장 중 오류가 발생했습니다.');
  }
}

// 'create-post' 라우트와 함께 장소 정보 전송
document.querySelector('.place-info button').addEventListener('click', () => {
  const locationData = JSON.parse(document.querySelector('.place-info').dataset.location);
  saveLocation(locationData);
});


};

// 이미지 버튼 클릭 시 모달 열기 및 지도 초기화
openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    initializeMap(); // 모달이 열릴 때 지도 초기화
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// 필터링 버튼 부분 js 코드
document.addEventListener('DOMContentLoaded', () => {
  const placeFilterButtons = document.querySelectorAll('.place-filter-category .filter-button');
  const fillFilterButtons = document.querySelectorAll('.fill-filter-category .filter-button');

  // 장소 필터 버튼 클릭 이벤트 (하나만 선택 가능)
  placeFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // 클릭된 버튼이 이미 활성화된 경우 비활성화
          if (this.classList.contains('active')) {
              this.classList.remove('active');
          } else {
              // 다른 버튼들의 active 클래스 제거
              placeFilterButtons.forEach(btn => btn.classList.remove('active'));
              // 클릭된 버튼에 active 클래스 추가
              this.classList.add('active');
          }

          // 선택된 장소를 로컬 스토리지에 저장
          const selectedPlace = document.querySelector('.place-filter-category .filter-button.active');
          localStorage.setItem('selectedPlace', selectedPlace ? selectedPlace.textContent : null);
        });
  });

  // 분위기 필터 버튼 클릭 이벤트 (다중 선택 가능)
  fillFilterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // 클릭 시 active 클래스 토글
          this.classList.toggle('active');

          // 선택된 분위기를 로컬 스토리지에 저장
          const selectedCategories = Array.from(fillFilterButtons)
              .filter(btn => btn.classList.contains('active'))
              .map(btn => btn.textContent);
          localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
      });
  });
});


  const modal = document.getElementById('place-modal');
  const openBtn = document.getElementById('open-modal-btn');
  const openTextBtns = document.querySelectorAll('.open-modal-text-btn'); 

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

// 모바일 메뉴 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // 현재 페이지 링크 활성화
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 지도 초기화
    initializeMaps();

    // 폼 제출 이벤트 처리
    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('요청이 성공적으로 제출되었습니다! 검토 후 연락드리겠습니다.');
            requestForm.reset();
        });
    }
});

// 구글 지도 초기화 함수
function initializeMaps() {
    // 여수 지도
    const yeosuMap = document.getElementById('yeosu-map');
    if (yeosuMap) {
        // 여수 지도가 있을 경우, 실제 구현에서는 Google Maps API를 활용
        yeosuMap.innerHTML = `
            <div style="width: 100%; height: 100%; background-color: #e9f5f9; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 48px; color: #3498db; margin-bottom: 15px;"></i>
                    <h3>여수 지역 지도</h3>
                    <p>※ 실제 사이트에서는 Google Maps가 표시됩니다 ※</p>
                </div>
            </div>
        `;
    }

    // 제주도 지도
    const jejuMap = document.getElementById('jeju-map');
    if (jejuMap) {
        jejuMap.innerHTML = `
            <div style="width: 100%; height: 100%; background-color: #e9f5f9; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 48px; color: #3498db; margin-bottom: 15px;"></i>
                    <h3>제주도 지역 지도</h3>
                    <p>※ 실제 사이트에서는 Google Maps가 표시됩니다 ※</p>
                </div>
            </div>
        `;
    }

    // 전주 지도
    const jeonjuMap = document.getElementById('jeonju-map');
    if (jeonjuMap) {
        jeonjuMap.innerHTML = `
            <div style="width: 100%; height: 100%; background-color: #e9f5f9; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                <div style="text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 48px; color: #3498db; margin-bottom: 15px;"></i>
                    <h3>전주 지역 지도</h3>
                    <p>※ 실제 사이트에서는 Google Maps가 표시됩니다 ※</p>
                </div>
            </div>
        `;
    }
}

// 스크롤 시 헤더 축소 효과
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '';
        header.style.boxShadow = '';
    }
});

// 이미지 레이지 로딩 구현
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // 대체 방법: 브라우저가 IntersectionObserver를 지원하지 않는 경우
        let active = false;

        const lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove('lazy');

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationChange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});

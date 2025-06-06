
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Initialize map if it exists on the page
    if (document.getElementById('map')) {
        initMap();
    }

    // Initialize request form submission
    const requestForm = document.querySelector('.request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', handleFormSubmit);
    }
});

// Google Maps Initialization
function initMap() {
    // Default map center (South Korea)
    const defaultCenter = { lat: 35.9078, lng: 127.7669 };

    // Get the specific city coordinates if defined
    const mapElement = document.getElementById('map');
    let mapCenter = defaultCenter;
    let zoomLevel = 7; // Default zoom for all Korea

    if (mapElement.dataset.city) {
        switch(mapElement.dataset.city) {
            case 'yeosu':
                mapCenter = { lat: 34.7604, lng: 127.6622 };
                zoomLevel = 12;
                break;
            case 'jeju':
                mapCenter = { lat: 33.4996, lng: 126.5312 };
                zoomLevel = 10;
                break;
            case 'jeonju':
                mapCenter = { lat: 35.8242, lng: 127.1480 };
                zoomLevel = 13;
                break;
        }
    }

    // Create map
    const map = new google.maps.Map(mapElement, {
        center: mapCenter,
        zoom: zoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Add markers based on location data
    if (window.locationMarkers && window.locationMarkers.length > 0) {
        window.locationMarkers.forEach(location => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                title: location.name
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="info-window">
                        <h3>${location.name}</h3>
                        <p>${location.description || ''}</p>
                        ${location.address ? `<p><strong>주소:</strong> ${location.address}</p>` : ''}
                        ${location.phone ? `<p><strong>전화:</strong> ${location.phone}</p>` : ''}
                        ${location.type === 'restaurant' ? `<p><strong>대표 메뉴:</strong> ${location.menu || '-'}</p>` : ''}
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
    }
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const requestTypeSelect = form.querySelector('#requestType');
    const messageTextarea = form.querySelector('#message');

    // Validation
    let valid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, '이름을 입력해주세요.');
        valid = false;
    } else {
        clearError(nameInput);
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, '올바른 이메일 형식이 아닙니다.');
        valid = false;
    } else {
        clearError(emailInput);
    }

    if (!messageTextarea.value.trim()) {
        showError(messageTextarea, '메시지를 입력해주세요.');
        valid = false;
    } else {
        clearError(messageTextarea);
    }

    if (valid) {
        // In a real application, you would send this data to your backend
        alert('요청이 성공적으로 제출되었습니다!');
        form.reset();

        // Display the submission (in a real app this would be stored in a database)
        const submissionsContainer = document.querySelector('.recent-submissions');
        if (submissionsContainer) {
            const newSubmission = document.createElement('div');
            newSubmission.classList.add('submission-item');
            newSubmission.innerHTML = `
                <h4>${nameInput.value} (${requestTypeSelect.value})</h4>
                <p>${messageTextarea.value}</p>
                <small>방금 전</small>
                <hr>
            `;
            submissionsContainer.prepend(newSubmission);
        }
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show error message for form validation
function showError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group');

    // Clear any existing error
    clearError(inputElement);

    // Add error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.2rem';
    errorElement.textContent = message;

    formGroup.appendChild(errorElement);
    inputElement.style.borderColor = 'red';
}

// Clear error message
function clearError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        formGroup.removeChild(errorElement);
    }

    inputElement.style.borderColor = '';
}

document.addEventListener('DOMContentLoaded', function() {
    
    var openBtn = document.getElementById('open-invitation');
    var openingScreen = document.getElementById('opening-screen');
    var mainContent = document.getElementById('main-content');
    var audio = document.getElementById('bg-music');
    var musicBtn = document.getElementById('music-btn');
    
    openBtn.addEventListener('click', function() {
        openingScreen.style.opacity = '0';
        openingScreen.style.transition = 'opacity 0.8s ease';
        
        setTimeout(function() {
            openingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.display = 'block';
            
            setTimeout(function() {
                mainContent.style.transition = 'opacity 0.8s ease';
                mainContent.style.opacity = '1';
                checkAnimations();
            }, 50);
        }, 800);
        
        audio.play().then(function() {
            musicBtn.classList.add('playing');
            musicBtn.querySelector('i').classList.remove('fa-play');
            musicBtn.querySelector('i').classList.add('fa-compact-disc');
        }).catch(function() {});
    });

    musicBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
            musicBtn.querySelector('i').classList.remove('fa-play');
            musicBtn.querySelector('i').classList.add('fa-compact-disc');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.querySelector('i').classList.remove('fa-compact-disc');
            musicBtn.querySelector('i').classList.add('fa-play');
        }
    });

    var weddingDate = new Date('Dec 23, 2025 08:00:00').getTime();

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = weddingDate - now;

        if (distance > 0) {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    function checkAnimations() {
        var elements = document.querySelectorAll('.animate-section');
        var windowHeight = window.innerHeight;
        
        elements.forEach(function(el, index) {
            var rect = el.getBoundingClientRect();
            var elementTop = rect.top;
            var triggerPoint = windowHeight * 0.9;
            
            if (elementTop < triggerPoint) {
                setTimeout(function() {
                    el.classList.add('visible');
                }, index * 100);
            }
        });
    }

    window.addEventListener('scroll', checkAnimations);
    
    var rightPanel = document.querySelector('.right-panel');
    if (rightPanel) {
        rightPanel.addEventListener('scroll', checkAnimations);
    }

    var giftTabs = document.querySelectorAll('.gift-tab');
    giftTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var tabName = this.getAttribute('data-tab');
            
            giftTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            document.querySelectorAll('.gift-content').forEach(function(content) {
                content.classList.add('hidden');
            });
            document.getElementById('gift-' + tabName).classList.remove('hidden');
        });
    });

    var rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var name = document.getElementById('name').value;
        var attendance = document.getElementById('attendance').value;

        if (name && attendance) {
            alert('Terima kasih ' + name + '!\nKonfirmasi kehadiran Anda telah dikirim.');
            this.reset();
        } else {
            alert('Mohon lengkapi nama dan konfirmasi kehadiran Anda.');
        }
    });

    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('Nomor rekening berhasil disalin!');
        }).catch(function() {
            var temp = document.createElement('input');
            document.body.appendChild(temp);
            temp.value = text;
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            alert('Nomor rekening berhasil disalin!');
        });
    };

});
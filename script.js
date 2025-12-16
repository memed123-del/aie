$(document).ready(function() {
    
    // ========== OPEN INVITATION ==========
    $('#open-invitation').click(function() {
        $('#opening-screen').fadeOut(800);
        $('#main-content').removeClass('hidden').hide().fadeIn(800);
        
        // Try to autoplay music
        var audio = document.getElementById('bg-music');
        audio.play().then(function() {
            $('#music-btn').addClass('playing');
            $('#music-btn i').removeClass('fa-play').addClass('fa-compact-disc');
        }).catch(function() {
            // Autoplay blocked, user needs to click
        });
    });

    // ========== MUSIC PLAYER ==========
    var audio = document.getElementById('bg-music');
    
    $('#music-btn').click(function() {
        if (audio.paused) {
            audio.play();
            $(this).addClass('playing');
            $(this).find('i').removeClass('fa-play').addClass('fa-compact-disc');
        } else {
            audio.pause();
            $(this).removeClass('playing');
            $(this).find('i').removeClass('fa-compact-disc').addClass('fa-play');
        }
    });

    // ========== COUNTDOWN ==========
    var weddingDate = new Date('Feb 23, 2026 08:00:00').getTime();

    function updateCountdown() {
        var now = new Date().getTime();
        var distance = weddingDate - now;

        if (distance > 0) {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('#days').text(days.toString().padStart(2, '0'));
            $('#hours').text(hours.toString().padStart(2, '0'));
            $('#minutes').text(minutes.toString().padStart(2, '0'));
            $('#seconds').text(seconds.toString().padStart(2, '0'));
        } else {
            $('.countdown-wrapper').html('<p style="font-size: 18px; color: #8b6b7b;">Hari Bahagia Telah Tiba!</p>');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========== SCROLL ANIMATIONS ==========
    function animateOnScroll() {
        $('.section').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    $(window).scroll(animateOnScroll);
    animateOnScroll();

    // ========== GIFT TABS ==========
    $('.gift-tab').click(function() {
        var tab = $(this).data('tab');
        
        $('.gift-tab').removeClass('active');
        $(this).addClass('active');
        
        $('.gift-content').addClass('hidden');
        $('#gift-' + tab).removeClass('hidden');
    });

    // ========== RSVP FORM ==========
    $('#rsvp-form').submit(function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var attendance = $('#attendance').val();
        var message = $('#message').val();

        if (name && attendance) {
            alert('Terima kasih ' + name + '!\nKonfirmasi kehadiran Anda telah dikirim.');
            this.reset();
        } else {
            alert('Mohon lengkapi nama dan konfirmasi kehadiran Anda.');
        }
    });

    // ========== COPY TO CLIPBOARD ==========
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('Nomor rekening berhasil disalin!');
        }).catch(function() {
            // Fallback
            var temp = $('<input>');
            $('body').append(temp);
            temp.val(text).select();
            document.execCommand('copy');
            temp.remove();
            alert('Nomor rekening berhasil disalin!');
        });
    };

});

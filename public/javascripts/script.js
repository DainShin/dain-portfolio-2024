
$(document).ready(function () {
    const elts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2")
    };

    const texts = [
        "Hello,",
        "I'm Dain :)",
    ];

    const morphTime = 1; // duration for changing the text
    const cooldownTime = 0.25; // wait time between the texts

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    if (elts.text1 && elts.text2) { // Check if elements are found
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction) {
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;

            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";

            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        function animate() {
            requestAnimationFrame(animate);

            let newTime = new Date();  // Removed the extra 'S' character here
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime - time) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }
        animate();
    }

     // carousel
     $('.mhn-slide').owlCarousel({
        nav: true,
        //loop:true,
        slideBy: 'page',
        rewind: false,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            600: { items: 3 },
            1000: { items: 4 }
        },
        smartSpeed: 70,
        onInitialized: function (e) {
            $(e.target).find('img').each(function () {
                if (this.complete) {
                    $(this).closest('.mhn-inner').find('.loader-circle').hide();
                    $(this).closest('.mhn-inner').find('.mhn-img').css('background-image', 'url(' + $(e.target).attr('src') + ')');
                } else {
                    $(this).bind('load', function (e) {
                        $(e.target).closest('.mhn-inner').find('.loader-circle').hide();
                        $(e.target).closest('.mhn-inner').find('.mhn-img').css('background-image', 'url(' + $(e.target).attr('src') + ')');
                    });
                }
            });
        },
        navText: ['<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>', '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>']
    });
  
});

  // skills: when this function is in the first document.ready function, errors occur, so I put it out 
  $(document).ready(function () {
    // Function to trigger hard skill animation
    function animateHardSkills() {
        $(".skill-per").each(function () {
            var $this = $(this);
    
           
            if ($this.data('animated')) {
                return; 
            }
    
            var per = parseInt($this.attr("per"), 10);  
            $this.css("width", per + "%");
            $({ animatedValue: 0 }).animate(
                { animatedValue: per },
                {
                    duration: 1000,
                    step: function (now) {
                        $this.attr('data-per', Math.floor(now) + "%");
                    },
                    complete: function () {
                        $this.attr('data-per', per + "%");
                    }
                }
            );
           
            $this.data('animated', true);
        });
    }

     // Function to trigger soft skill animation
     function animateSoftSkills() {
        $(".circlechart").each(function () {
            var $this = $(this);
            var $circle = $this.find('.circle-chart__circle');

            // Add the animation class when the section is in view
            $circle.css('animation', 'circle-chart-fill 2s reverse');
        });
        
    }

    // Trigger animations when the scroll reaches the appropriate sections
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

             // Hard skills section animation trigger
             var skillsTop = $('.skills-container').offset().top - 100;  // Adjust the offset as needed
             if (scrollTop + windowHeight > skillsTop) {
                 animateHardSkills();
             }
    
        // Soft skills section animation trigger
        var softSkillsTop = $('.skills-area').offset().top + 200;  // Adjust the offset as needed
        if (scrollTop + windowHeight > softSkillsTop) {
            animateSoftSkills();
        }
    });
});


$(document).ready(function () {
    function checkVisibility() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        $('.experience.hidden').each(function () {
            const $this = $(this);
            const offsetTop = $this.offset().top + 100;

            console.log(offsetTop);

            console.log(`Element offsetTop: ${offsetTop}`);
            console.log(`Scroll position: ${scrollTop + windowHeight}`);

           
            if (scrollTop + windowHeight > offsetTop) {
                console.log('Element is becoming visible:', $this);
                $this.removeClass('hidden').addClass('visible');
            }
        });
    }

    
    checkVisibility();


    $(window).on('scroll', function () {
        requestAnimationFrame(checkVisibility);
    });
});


$(document).ready(function () {
    const sections = $('section[id]');
    const navLinks = $('.navbar-nav .nav-link');

    // IntersectionObserver 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 섹션의 50% 이상이 보일 때 활성화
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.removeClass('active');
                $(`.navbar-nav .nav-link[href="#${id}"]`).addClass('active');
            }
        });
    }, observerOptions);

    sections.each(function () {
        observer.observe(this);
    });

    // 메뉴 항목 클릭 시 스크롤과 active 클래스 변경
    navLinks.on('click', function (e) {
        e.preventDefault(); // 클릭 시 기본 동작 방지

        const targetId = $(this).attr('href');
        const $targetSection = $(targetId);

        // 메뉴 항목에서 active 제거하고 클릭된 항목에 추가
        navLinks.removeClass('active');
        $(this).addClass('active');

        // 부드럽게 스크롤
        $('html, body').animate({
            scrollTop: $targetSection.offset().top
        }, 500); // 스크롤 애니메이션 시간
    });
});

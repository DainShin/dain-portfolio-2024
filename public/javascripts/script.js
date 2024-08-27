
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


  
});

  // skills: when this function is in the first document.ready function, errors occur, so I put it out 
  $(document).ready(function () {
    // Change the color of the selected menu 
    var currentPage = window.location.pathname;

    // if the current page is the same as the clicked page then add the active class
    $(".nav-link").each(function () {
        var linkPage = $(this).attr("href");
        if (currentPage === linkPage) {
            $(this).addClass("active");
        }
    });

    // add the active class to the clicked menu
    $(".nav-link").click(function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });

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
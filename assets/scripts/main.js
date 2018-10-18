// SHOWS nav menu when burger menu is clicked
(function (){
    const nav = document.querySelector("nav");
    try {
        const burgerIcon = document.querySelector(".burger");

        burgerIcon.addEventListener('click', (event) => {
            event.preventDefault();
            nav.classList.toggle('responsive');
        });
    } catch (error) {
        
    };
}());

// COLLAPSE nav on scroll
(function (){
    const nav = document.querySelector("nav");
    window.addEventListener('scroll', () => {
        nav.classList.remove('responsive');
    })
}());


// =============================================================================
// SLIDER
// =============================================================================

// FROM all slides removes show class
// show class adds display: flex
function removeSlide(){
    const slides = Array.from(document.querySelectorAll(".slider"));
    slides.forEach((slide) => {
        slide.classList.remove('show');
    });
};

// SHOWS slide with slideIndex == index
// ADDS show class
function showCorrectSlide(index){
    const slides = Array.from(document.querySelectorAll(".slider"));
    slides.forEach((slide, slideIndex) => {
        if(index == slideIndex){
            slide.classList.add('show');
        }
    });
};

// RETURNS current slide index
// current slide always has show class
function getCurrentSlideIndex(){
    const slides = Array.from(document.querySelectorAll(".slider"));
    let indexToReturn;
    slides.forEach((slide, index) => {     
        if(slide.classList.contains('show')){
           indexToReturn = index;        
        }         
    });
    return indexToReturn;
};

// RETURNS tolal number of slides
function getSlidesLength(){
    const slides = Array.from(document.querySelectorAll(".slider"));
    return slides.length;
};

function decreaseSlideIndex(index, length){
    if(index > 0 && index <= length-1){
        --index;
    } else {
        index = length-1;
    };
    return index;
};

function increaseSlideIndex(index, length){
    if (index < length-1){
        ++index;
    } else {
        index = 0;
    };
    return index;
};

// ADDS slide left animation to slides
function addSlideLeft(){
    const slides = Array.from(document.querySelectorAll(".slider"));
    slides.forEach((slide) => {
        slide.classList.remove('slide-right')
        slide.classList.add('slide-left')
    });
};

// ADDS slide right animation to slides
function addSlideRight(){
    const slides = Array.from(document.querySelectorAll(".slider"));
    slides.forEach((slide) => {
        slide.classList.remove('slide-left')
        slide.classList.add('slide-right')
    });
};

// SET BUTTON FUNCTIONALITY
(function (){
    const leftArrows = Array.from(document.querySelectorAll(".left-arrow"));
    const rightArrows = Array.from(document.querySelectorAll(".right-arrow"));

    leftArrows.forEach(leftArrow => {
        leftArrow.addEventListener('click', (e) => {
            e.preventDefault();
            let correctIndex = decreaseSlideIndex(getCurrentSlideIndex(), getSlidesLength())
            removeSlide()
            addSlideLeft()
            showCorrectSlide(correctIndex)
        })
    });

    rightArrows.forEach(rightArrow => {
        rightArrow.addEventListener('click', (e) => {
            e.preventDefault();
            let correctIndex = increaseSlideIndex(getCurrentSlideIndex(), getSlidesLength())
            removeSlide()
            addSlideRight()
            showCorrectSlide(correctIndex)
        })
    });

}());

// GETS infoBlock by eleSelector
// CHECK if individual block id mathces index
//       TRUE add eleClass ---> display: block
//       FALSE removes eleClass ---> display: none;
function showCorrectInfoId(index, eleSelector, eleClass){
    const infoBlocks = document.querySelectorAll(eleSelector);

    infoBlocks.forEach((block) => {
        if(block.id === index) {
            block.classList.add(eleClass);
        } else {
            block.classList.remove(eleClass);
        };    
    });
};

// FOREACH element if index matches ele.hash ---> (a href="#index")
//         TRUE makes button active calls showCorrectInfoId()
//         ELSE removes from button active style
function checkMapActive(mapNavElements, index){
    mapNavElements.forEach((ele) => {
        if(ele.hash === index){
            ele.parentNode.classList.add('map-info-active');
            showCorrectInfoId(ele.hash, '.map-info-text', 'map-active');
        } else{
            ele.parentNode.classList.remove('map-info-active');
        };
    });
};

// ADD event listener for map window buttons
(function () {
    const mapNavElements = document.querySelectorAll('.map-info li a');
    mapNavElements.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            checkMapActive(mapNavElements, ele.hash);
        });
    });
}());


// GETS infoBlock by eleSelector
// CHECK if individual block id mathces index
//       TRUE add eleClass ---> display: block
//       FALSE removes eleClass ---> display: none;
// !!! Similar to showCorrectInfoId. Need optimization
function showCorrectInfo(eleIndex, eleSeletor, eleClass){
    const infoBlocks = document.querySelectorAll(eleSeletor);

    infoBlocks.forEach((block, index) => {
        if(eleIndex === index) {
            block.classList.add(eleClass);
        } else {
            block.classList.remove(eleClass);
        };    
    });
};

// FOREACH circle if index matches circleIndex
//         TRUE makes circle active
//         ELSE removes from circle active style
// !!! Similar to removeMapActive. Need optimization
function checkCircleActive(circles, circleIndex){
    circles.forEach((ele, index) => {
        if(index === circleIndex){
            ele.classList.add('icon-active');
            showCorrectInfo(index, '.slide-container', 'slide-container-active');
        } else{
            ele.classList.remove('icon-active');
        };
    });
};

// SLIDE SHOW CIRCLES FUNCTIONALITY ON click
(function slideShow(){
    const circles = document.querySelectorAll('.slide-circles a span'); 

    circles.forEach((circle, index) => {
        circle.parentNode.addEventListener('click', (e) => {
            e.preventDefault(); 
            checkCircleActive(circles, index);
        });
    });
}());

// ADD focusin event listener --> removes error message
// ADD focusout event listener
//     TEST regex
//     IF test returns false show error
function validation(input, regex, errorText){
    const error = document.querySelector("#form-error");
    let test = regex.test(input.value)

    if(test) {
        input.classList.remove('input-alert');
        input.classList.add('input-success');
        error.innerHTML = ""
    } else {
        input.classList.remove('input-success');
        input.classList.add('input-alert');
        error.innerHTML = errorText;
    };
};

// ON INPUT 'focusin' and 'focusout' 
// CHECKS if input is not empty ---> input.value.length > 0
//  TRUE add not-empty class to input
//  ELSE removes not-empty class from input
//  not-empty class makes input label to show above input
(function () {
    const inputs = Array.from(document.querySelectorAll('input'))
    inputs.forEach((input) => {
        input.addEventListener('focusin', (e) => {
            if(e.target.value.length  > 0){
                input.classList.add('not-empty')
            }else{
                input.classList.remove('not-empty')
            }
        })
        input.addEventListener('focusout', (e) => {
            if(e.target.value.length  > 0){
                input.classList.add('not-empty')
            }else{
                input.classList.remove('not-empty')
            }
        })
    })
}());

// ON FORM input checks input id
// Depending on the id calls specific validation function
(function () {
    const inputs = Array.from(document.querySelectorAll('input'))

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            switch (input.id){
                case 'email':
                    emailValidation()
                    break;
                case 'phone':
                    phoneValidation()
                    break;
                case 'time':
                    timeValidation()
                    break;
            }
        })
    })
}());

// CHECKS IF inputs are not empty and there is no errors
//        TRUE shows success message. Sends information to server
//        FALSE shows erro message
function checkFormInputs(){
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const timeInput = document.querySelector("#time");
    const error = document.querySelector("#form-error");

    if(emailInput.value && phoneInput.value && timeInput.value && !error.innerHTML){
        error.classList.remove('form-error')
        error.classList.add('form-success')
        error.innerHTML = "Rezervacija įvykdyta." 
        const form = document.querySelector('#rezervacija-form');
        form.submit();
    } else {
        error.classList.remove('form-success')
        error.classList.add('form-error')
        error.innerHTML = "Neužpildytas vienas ar keli laukai"
    }
}
// EMAIL validation using  REGEX  set of code ---> /\S+@\S+\.\S+/
function emailValidation() {
    const emailRe = /\S+@\S+\.\S+/;
    const emailInput = document.querySelector("#email");
    validation(emailInput, emailRe, "Patikrinkite El. pašto adresą");
}

// PHONE validation using  REGEX  set of code ---> /^(\+[0-9]{3}|8)[0-9]{8}\b/
function phoneValidation(){
    const phoneRe = /^(\+[0-9]{3}|8)[0-9]{8}\b/;
    const phoneInput = document.querySelector("#phone");
    validation(phoneInput, phoneRe, "Patikrinkite Telefono numerį");
}

// TME validation using  REGEX  set of code ---> /((\d+\s+[d]+\.)|(\d+\S+[d]+\.))+(\s|\S)+(((\d+\s+[val]+\.))|((\d+\S+[val]+\.)))/
function timeValidation(){
    const timeRe = /((\d+\s+[d]+\.)|(\d+\S+[d]+\.))+(\s|\S)+(((\d+\s+[val]+\.))|((\d+\S+[val]+\.)))/;
    const timeInput = document.querySelector("#time");
    validation(timeInput, timeRe, "Patikrinkite rezervacijos laiką (x d. x val.)");
}

//FORM VALIDATION ON SUBMIT
(function() {
    const button = document.querySelector("#formButton");

    button.addEventListener('click', (e)=> {
        e.preventDefault();
        emailValidation();
        phoneValidation();
        timeValidation()
        checkFormInputs();
    })
}());

(function() {
    // Add smooth scrolling
    $(".up-button").click(function(event) {
        event.preventDefault();
  
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
}());

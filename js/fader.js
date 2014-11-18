Fader = function(fader) 
{   
    //settings
    var fadeTime = 1000;
    var viewTime = 6000;
    
    //number of items
    var numItems = fader.find(".faderItem").size();
    
    //show controls
    if(numItems > 1) {
        fader.find(".faderControls, .next, .prev").css("display", "block");
    }
    
    //control buttons
    var nextBtn = fader.find(".next");
    var prevBtn = fader.find(".prev");
    var quickBtn = fader.find(".quick");
    
    //controls
    nextBtn.click(function(event) {
        event.preventDefault()
        
        resetTimer();
        fadeItem();
    });    
    
    prevBtn.click(function(event) {
        event.preventDefault()
        
        resetTimer();
        fadeItem(-1);
    });
    
    quickBtn.click(function(event) {
        event.preventDefault();
        
        if(!$(event.delegateTarget).hasClass("selected"))
        {
            resetTimer();
            
            var slideTo = fader.find($(event.delegateTarget).parent()).index();
            
            fadeItem(slideTo);
        }
    });
    
    //variable for all slides
    var slides = fader.find(".faderItem");
    
    //variable for all controls
    var controls = fader.find(".quick");
    
    //fade out all slides
    slides.fadeOut(0);
    
    //set first slide to selected, and fade it in
    slides.first().addClass('selected');
    slides.first().fadeIn(0);  
    controls.first().addClass('selected');
    
    //on resize calculate new highest slide height
    var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(hasResized, 100);
    });
    
    //set display to height of tallest slide
    hasResized();
    
    function hasResized()
    {
        var highest = [];
        
        slides.each(function()
        {
            highest.push($(this).height());
        });
        
        highest = Math.max.apply(null, highest);
        
        fader.find(".faderDisplay").css("height", highest);
    }
    
    //auto scroll items
    var timer;
    resetTimer();
    
    function resetTimer()
    {
        if(numItems > 1) {
            clearInterval(timer);
            
            timer = setInterval(function()
            {
                fadeItem();
            }, fadeTime + viewTime);
        }
    }
    
    //fade items when needed
    function fadeItem(slide)
    {
        //get current and next slide index
        var currentSlide = fader.find('.faderItem.selected').index();
        var nextSlide = currentSlide + 1;
        
        //fade out current slide
        slides.eq(currentSlide).removeClass('selected');
        slides.eq(currentSlide).fadeOut(fadeTime);
        
        //if request for a certain slide
        if(slide)
        {
            nextSlide = slide;
        }
        if(slide == 0)
        {
            nextSlide = slide;
        }
        if(slide == -1)
        {
            nextSlide = currentSlide - 1;
        }
        
        //loop to start if reached the end
        if (slides.size() == nextSlide) {
            nextSlide = 0;
        }
        
        //fade in new slide
        slides.eq(nextSlide).fadeIn(fadeTime);
        slides.eq(nextSlide).addClass('selected');
        
        //update controls
        controls.removeClass('selected');
        controls.eq(nextSlide).addClass('selected');
    }
};

$(window).load(function()
{
    $(".fader").each(function()
    {
        new Fader($(this));
    });
});

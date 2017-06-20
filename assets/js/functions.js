$(document).ready( function () {
   randomPost();
   reportPost();
   showMore();
   
   if ( $(window).width() >= 950 ) {
      fixedAds();
   }
})

function fixedAds() {
   var $this = $('#sidebar'),
       parntContainer = $('#sidebar').parent(),
       parntWidth = parntContainer.width(),
       parntOtLeft = parntContainer.offset().left;
   
   var toFixed = function() {
      var left = (parntWidth + parntOtLeft) - 300,
          st = $(window).scrollTop(),
          ot = parntContainer.offset().top;

         if ( st > ot + 32 ) {
            $this.css({ 'position' : 'fixed', 'top' : '0px', 'left' : left+'px' });
         }

         if ( st <= ot ) {
            $this.css({'position' : '', 'top' : '', 'right' : ''});
         }
   }      
   $(document).scroll(toFixed);      
   toFixed();    
}

function showMore() {
   $('#post .show-more').click( function() {      
      $('#post .other').removeClass('hidden');
      $('#post .show-more').addClass('hidden');
   })   
}

function randomPost() {
    var randomIndexUsed = [];
    var counter = 0;
    var numberOfPosts = 1;

    while (counter < numberOfPosts)
    {
        var randomIndex;
        var postHREF;
        var postTitle;
       
        randomIndex = Math.floor(Math.random() * postsHREF.length);

        if (randomIndexUsed.indexOf(randomIndex) == "-1")
        {
            postHREF = postsHREF[randomIndex];
            postTitle = postsTitle[randomIndex];

            if (counter == (numberOfPosts - 1))
            {
               document.getElementById("random").setAttribute("href",postHREF);
            }
            else
            {
               document.write('<a href="' + postHREF + '">' + postTitle + '</a>');
            }
            randomIndexUsed.push(randomIndex);
            counter++;
        }
    }
}

function reportPost() {
   $('#form').submit( function (event){
      event.preventDefault();
      
      $.ajax({
         url: 'https://formspree.io/'+siteEmail,
         method: 'POST',
         data: {
            name: $('#title').val(),
            url: $('#url').val(),
         },
         dataType: 'json'
         }).done(function() {
            alert('Report Submitted, Thank you so much!!\n\nWere going to redirect you in our homepage');
            setTimeout(
              function() 
              {
                  window.location = siteUrl;
              }, 1000);
         }).fail(function() {
            alert('report not submitted');         
         });         
   });
}

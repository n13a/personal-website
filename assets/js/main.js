/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);
const modal = document.querySelector('.modal')
const openModal = document.querySelector('.open-button')
const closeModal = document.querySelector('.close-button')

openModal.addEventListener('click', ()=>{
	window.scrollTo(0, 0);
	modal.showModal();
	modal.scrollTop = 0;
	
})

closeModal.addEventListener('click', ()=>{
	modal.close();
})



fetch('https://api.nasa.gov/planetary/apod?api_key=hjZWQLG9inotOShvMdkKIDVoxRI8asQnQCnqfPNK')
.then(res => res.json())
.then(data => {

	if(data.media_type == 'video'){
		document.getElementById('apod-image').remove()
		
		const theIframe = document.createElement("iframe");
		theIframe.src = data.url
		const target = document.querySelector('#description');

		target.parentNode.insertBefore(theIframe, target);
	} else {
		document.getElementById('apod-image').src = data.hdurl
		
	}
	if (data.copyright != undefined){
		document.getElementById('credit').innerHTML = `Image Credit & Copyright:  ${data.copyright}`
	}
    document.getElementById('description').innerHTML = data.explanation
    document.getElementById('image-title').innerHTML = data.title
	
    


})
.catch(err => {
    console.log(`error ${err}`)
})

window.onclick = function(event) {

	if (event.target == modal) {
 
	   modal.close();
 
	 }
}


fetch('https://api.quotable.io/random?tags=famous-quotes,technology')
.then(res => res.json())
.then(data => {
	console.log(data)
    document.querySelector('#quote').textContent = data.content
    document.querySelector('#quoteAuth').textContent =  `~ ${data.author}`
	

})
.catch(err => {
    console.log(`error ${err}`)
})
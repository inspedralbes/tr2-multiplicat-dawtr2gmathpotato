!function($){
	'use strict'

	$.fn.boom = function(opts){

		var defaultOptions = {
			img_url: '',
			piece_size: 20,
			gravity: false,
			duration: 1000
		}

		var opts = $.extend({}, defaultOptions, opts);

		var $target = this,
			imgUrl = opts.img_url || '',
			pieceSize = opts.piece_size,
			gravity = opts.gravity,
			duration = opts.duration;

		var sx,
			sy,
			count = 0;

		var n = $target.width() / pieceSize,
			m = $target.height() / pieceSize;

		try {
			if (imgUrl === '') throw new Error('empty image url');
			$target.css({
				position: 'relative',
				persperctive: 0,
				background: 'url('+imgUrl+') no-repeat',
				cursor: 'pointer',
				hidden: true
			})
			
		} catch(e) {
			console.error(e.message)
		}


		function makeSprite(x, y) {
			$target.children('img').remove();
			for (let i = 0; i < m; i++) {
				for (let j = 0; j < n; j++) {
					var newSprite = document.createElement('div');
					$(newSprite).attr('id', i + '-' + j);
					$(newSprite).css({
						width: pieceSize,
						height: pieceSize,
						position: 'absolute',
						background: 'url('+imgUrl+') no-repeat',
						top: i * pieceSize,
						left: j * pieceSize,
						backgroundPosition: -j*pieceSize + 'px ' + (-i*pieceSize) + 'px',
					})
					$target.append(newSprite)
				}
			}

			$target.css({
				background: ''
			})
			$('body').css({
				overflow: 'hidden'
			})

			for (let i = 0; i < m; i++) {
				for (let j = 0; j < n; j++) {
					sx = j * pieceSize < x ? -1 * Math.random() * duration : Math.random() * duration;
					sy = Math.abs(sx * (i*pieceSize-y)/(j*pieceSize-x));
					sy = i * pieceSize < y ? -sy : sy;
					if (!gravity) {
						$('#'+i+'-'+j).animate({
							top: '+='+sy,
							left: '+='+sx,
							opacity: 0
						}, Math.random()*duration+duration)
					}
				}
			}	
			
			

		}


		setTimeout(function() {makeSprite(300,200)}, 3000);

		return $target;
	}


}(jQuery);

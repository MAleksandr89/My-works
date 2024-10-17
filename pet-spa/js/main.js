const swiper = new Swiper('.swiper', {
	// slidesPerView: 1,
	slidesPerView: 'auto',

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// function startCounter () {
// 	let counter = 0;

// 	return {
// 		increase: function(){
// 			++counter;
// 		},
// 		getCounter: function(){
// 			return counter;
// 		}
// 	}
// }

// const counter = startCounter();
// console.log(counter.getCounter());
// counter.increase();
// counter.increase();
// counter.increase();
// console.log(counter.getCounter());

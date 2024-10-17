document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.section');
	const links = document.querySelectorAll('.main-nav-link');

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {

				// Если граница не пересекает границу = выход их функции
				if (!entry.isIntersecting) return;

				const id = entry.target.getAttribute('id');
				const link = document.querySelector(`a[href="#${id}"]`);

				console.log(`Секция ${id} "пересекает" границу вьюпорта `);
				console.log('(50% видимости)');
				console.log(entry);

				if (entry.isIntersecting) {
					links.forEach((link) => link.classList.remove('active'));
					link.classList.add('active');
				}
			});
		},
		{
			threshold: 0.5
		}
	);

	sections.forEach((section) => {
		observer.observe(section);
	});
});

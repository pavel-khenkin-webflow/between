import { gsap } from 'gsap'

export function hidePreloader() {
	const preloader = document.querySelector('.preloader')
	gsap.to(preloader, {
		opacity: 0,
		duration: 0.5, // добавьте продолжительность для плавности
		onComplete: () => {
			preloader.style.display = 'none'
		},
	})
}

export function animatePreloader() {
	const preloader = document.querySelector('.preloader')
	const dots = preloader.querySelectorAll('.prelaoder_dot')
	const tl = gsap.timeline({ repeat: -1 })

	// Создаем анимацию для каждой точки с задержкой, чтобы они начинали анимацию последовательно
	dots.forEach((dot, index) => {
		tl.fromTo(
			dot,
			{
				opacity: 0.2,
				scale: 1,
			},
			{
				opacity: 1,
				scale: 1.6,
				duration: 0.6,
				yoyo: true,
				repeat: 1,
				ease: 'power1.inOut',
				// repeatDelay: 0.3, // добавляем задержку повторения
			},
			index * 0.3 // задержка старта анимации для каждой точки
		)
	})
}

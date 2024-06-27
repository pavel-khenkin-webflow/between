// use a script tag or an external JS file
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* The following plugins are Club GSAP perks */
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

document.addEventListener('DOMContentLoaded', (event) => {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
	// gsap code here!
	// Найти все кнопки с атрибутом data-form='open'
	const formBtnOpen = document.querySelectorAll("[data-form='open']")
	const formCloseBtn = document.querySelector('.close-icon')
	const modalForm = document.querySelector('#modal-form')

	formBtnOpen.forEach((btn) => {
		btn.addEventListener('click', () => {
			console.log('form open!')
			// Выполнить анимацию с opacity и height
			gsap.to(modalForm, {
				height: '100vh',
				duration: 0.5,
				ease: 'power1.out',
			})
		})
	})

	formCloseBtn.addEventListener('click', () => {
		gsap.to(modalForm, {
			height: '0vh',
			duration: 0.5,
			ease: 'power1.out',
		})
	})

	const smoother = ScrollSmoother.create({
		smooth: 2,
		effects: true,
	})

	// Проверить, есть ли якорь в URL
	const hash = window.location.hash
	if (hash) {
		const targetElement = document.querySelector(hash)

		if (targetElement) {
			// Используем GSAP для плавного скроллинга к секции
			smoother.scrollTo(targetElement, true, 'top top')
		}
	}

	// Animation functions

	const animateHeading = (className, tl) => {
		var split = new SplitText(className, { type: 'lines' })
		var lines = split.lines
		tl.from(
			lines,
			{
				opacity: 0,
				stagger: 0.1,
				duration: 3,
			},
			0
		)
	}

	const animateText = (className, tl) => {
		var split = new SplitText(className, { type: 'lines' })
		var lines = split.lines
		tl.from(
			lines,
			{
				opacity: 0,
				y: '100%',
				duration: 2,
				stagger: 0.2,
				ease: 'power3.out',
			},
			0
		)
	}

	const animateElement = (className, tl) => {
		tl.from(
			className,
			{
				opacity: 0,
				y: '100%',
				duration: 1,
				stagger: 0.2,
				ease: 'power3.out',
			},
			0
		)
	}

	const animateImage = (className, tl) => {
		var element = document.querySelectorAll(className)
		tl.from(
			element,
			{
				opacity: 0,
				stagger: 0.1,
				duration: 1.5,
				ease: 'power2.in',
			},
			0
		)
		tl.from(
			element,
			{
				y: '5%',
				duration: 3,
				stagger: 0.1,
				ease: 'power2.out',
			},
			0
		)
	}

	const heroTl = gsap.timeline({ paused: true })
	heroTl.to(".industries-main_section [animate='reveal-heading']", {
		opacity: 1,
		duration: 3,
		stagger: 0.1,
	})
	heroTl.to(
		'.industries-main_section [animate="reveal-effect-text"]',
		{
			opacity: 1,
			y: '0%',
			duration: 3,
		},
		0
	)

	window.addEventListener('load', () => {
		heroTl.play()
		// Найти все элементы с классами "w-background-video" или "w-background-video-atom"
		var videoElements = document.querySelectorAll(
			'.video.w-background-video, .w-background-video-atom'
		)
		// animate inputs
		const inputs = document.querySelectorAll('.field')

		inputs.forEach((input) => {
			const line = input.nextElementSibling

			input.addEventListener('focus', function () {
				gsap.to(line, { duration: 1, width: '100%' })
			})

			input.addEventListener('blur', function () {
				gsap.to(line, { duration: 1, width: '0%' })
			})
		})

		let mobileIgnore = gsap.matchMedia()
		// Desktop only
		//---------------------------------------------------------------------//
		mobileIgnore.add('(min-width: 480px)', () => {
			console.log('desktop work!')
			// Проходимся по всем найденным элементам
			const videoElements = document.querySelectorAll('.video')

			// Проходимся по всем найденным элементам
			videoElements.forEach(function (element) {
				// Найти видео внутри текущего элемента
				var video = element.querySelector('video')

				// Проверить, что видео существует
				if (video) {
					// Останавливаем видео по умолчанию и добавляем класс "grayscale"
					video.pause()
					element.classList.add('grayscale')

					// Добавляем обработчики событий для наведения и ухода курсора
					element.addEventListener('mouseenter', function () {
						element.classList.remove('grayscale')
						video.play()
					})

					element.addEventListener('mouseleave', function () {
						video.pause()
						element.classList.add('grayscale')
					})
				}
			})
			return
		})

		//-----------------------------------------------//
		//mobile only

		mobileIgnore.add('(max-width: 479px)', () => {
			console.log('mobile work!')
			// Проходимся по всем найденным элементам
			videoElements.forEach(function (element) {
				// Найти видео внутри текущего элемента
				var video = element.querySelector('video')

				// Проверить, что видео существует
				if (video) {
					// Добавляем обработчики событий для наведения и ухода курсора
					element.addEventListener('mouseenter', function () {
						video.play()
					})

					element.addEventListener('mouseleave', function () {
						video.pause()
					})
				}
			})
			return
		})

		//section_ali

		const aliTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.sections_mission',
				start: 'top 60%',
				end: 'bottom center',
			},
		})
		animateHeading('.sections_mission [animate="reveal-heading"]', aliTl)
		animateText('.sections_mission [animate="reveal-effect-text"]', aliTl)
		animateImage('.sections_mission [animate="image"]', aliTl)

		//section_welcome

		const financeTl = gsap.timeline({
			scrollTrigger: {
				trigger: "[section='finance']",
				start: 'top 60%',
				end: 'bottom center',
			},
		})
		animateHeading('[section="finance"] [animate="reveal-heading"]', financeTl)
		animateImage('[section="finance"] [animate="image"]', financeTl)
		animateText('[section="finance"] [animate="reveal-effect-text"]', financeTl)

		// animation section_3d

		const threedTl = gsap.timeline({
			scrollTrigger: {
				trigger: "[section='3d']",
				start: 'top center',
				end: 'bottom center',
			},
		})
		animateHeading('[section="3d"] [animate="reveal-heading"]', threedTl)
		animateImage('[section="3d"] [animate="img"]', threedTl)
		animateText('[section="3d"] [animate="reveal-effect-text"]', threedTl)

		// animation section_robots

		const robotsTl = gsap.timeline({
			scrollTrigger: {
				trigger: "[section='robots']",
				start: 'top center',
				end: 'bottom center',
			},
		})
		animateHeading('[section="robots"] [animate="reveal-heading"]', robotsTl)
		animateImage('[section="robots"] [animate="img"]', robotsTl)
		animateText('[section="robots"] [animate="reveal-effect-text"]', robotsTl)

		// section other

		const otherTl = gsap.timeline({
			scrollTrigger: {
				trigger: "[section='other']",
				start: 'top center',
				end: 'bottom center',
			},
		})
		animateHeading('[section="other"] [animate="reveal-heading"]', otherTl)
		animateImage('[section="other"] [animate="img"]', otherTl)
		animateText('[section="other"] [animate="reveal-effect-text"]', otherTl)
	})
})

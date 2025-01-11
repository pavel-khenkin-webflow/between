import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* The following plugins are Club GSAP perks */
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(
	ScrollTrigger,
	DrawSVGPlugin,
	ScrollSmoother,
	SplitText,
	ScrollToPlugin
)

export const animateHeading = (className, tl) => {
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

export const animateText = (className, tl) => {
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

export const animateElement = (className, tl) => {
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

export const animateImage = (className, tl) => {
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

function Init() {
	// Здесь вызываем анимации после загрузки страницы
	console.log('loaded')

	const burger = document.querySelector('.burger')
	console.log(burger)
	const linkIndr = document.getElementById('link-industries')

	linkIndr.addEventListener('click', function () {
		console.log('link clicked!')
		burger.click()
	})

	// Create the observer for checking if video is in view
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.play()
				} else {
					entry.target.pause()
				}
			})
		},
		{
			threshold: 0.2, // 0 (default) - element must be totally offscreen, 0.5 - 50%, 1 - element fully on screen
		}
	)

	// Select all videos with data attribute wb-embed="video"
	const videos = document.querySelectorAll('[wb-embed="video"]')

	// Loop through all the videos
	videos.forEach(video => {
		// Pause on initial load
		video.pause()
		// Watch for entering viewport
		observer.observe(video)
	})

	let mobileIgnore = gsap.matchMedia()
	ScrollSmoother.create({
		smooth: 2,
		effects: true,
	})
	// Desktop only
	//---------------------------------------------------------------------//
	mobileIgnore.add('(min-width: 480px)', () => {
		console.log('desktop work!')
		// Найти все элементы с классом .video
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

		// HORIZONTAL scrolling

		const indrScrollTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_indastries',
				start: '20% top',
				end: 'bottom bottom',
				scrub: 1,
				pin: '.indastries-cadr',
				// markers: true,
			},
		})

		indrScrollTl.to('.industries_wrapper', {
			delay: 0.1,
			x: '-130vw',
		})

		return
	})

	//-----------------------------------------------//
	//mobile only

	mobileIgnore.add('(max-width: 479px)', () => {
		console.log('mobile work!')
		const videoElements = document.querySelectorAll('.video')
		const videoElements2 = document.querySelectorAll('.video-popup')

		// Проходимся по всем найденным элементам
		videoElements.forEach(function (element) {
			// Найти видео внутри текущего элемента
			var video = element.querySelector('video')

			// Проверить, что видео существует
			if (video) {
				// Удаляем класс "grayscale" и воспроизводим видео
				element.classList.remove('grayscale')
				video.play()
			}
		})

		videoElements2.forEach(function (element) {
			// Найти видео внутри текущего элемента
			var video = element.querySelector('video')

			// Проверить, что видео существует
			if (video) {
				// Удаляем класс "grayscale" и воспроизводим видео
				element.classList.remove('grayscale')
				video.play()
			}
		})

		return
	})

	// gsap code here!

	// Hero animate loading ---------------------------------------------------------------HERO

	const heroTl = gsap.timeline({ paused: true, delay: 0.1 })
	heroTl.to('[animate="reveral-effect-line"]', {
		opacity: 1,
		duration: 1.5,
		stagger: 0.2,
		ease: 'power3.inOut',
	})
	heroTl.to(
		'.section_hero [animate="reveal-effect-text"]',
		{
			opacity: 1,
			y: '0%',
			duration: 2,
			stagger: 0.3,
			ease: 'power3.out',
		},
		0
	)
	heroTl.play()

	// section -------------------------------------------------------------------------------CHAIR MAN

	const chairManTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_chairman',
			start: 'top 60%',
			end: 'bottom center',
		},
	})

	animateImage('.section_chairman [animate="image"]', chairManTl)
	animateHeading('.section_chairman [animate="reveal-heading"]', chairManTl)
	animateText('.section_chairman [animate="reveal-effect-text"]', chairManTl)
	animateElement(
		'.section_chairman [animate="reveal-effect-element"]',
		chairManTl
	)

	// section ------------------------------------------------------------------------------------INDUSTRIES

	const indastriesTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_indastries',
			start: 'top 60%',
			end: 'bottom center',
		},
	})
	animateImage('.section_indastries [animate="image"]', indastriesTl)
	animateHeading('.section_indastries [animate="reveal-heading"]', indastriesTl)
	animateElement(
		'.section_indastries [animate="reveal-effect-element"]',
		indastriesTl
	)

	// Выбор всех карточек и попапов
	const industriesCards = document.querySelectorAll('.industries_card')
	const industriesPopups = document.querySelectorAll('.industries_popup')
	const closeButtons = document.querySelectorAll('.popup-ind-close')

	// Функция для показа и анимации попапа
	function showIndPopUp(card) {
		const popupValue = card.getAttribute('data-value')
		industriesPopups.forEach(popup => {
			const popupId = popup.getAttribute('id')
			if (popupId === popupValue) {
				// Убедитесь, что стили обновляются при повторном открытии
				gsap.set(popup, {
					opacity: 0,
					height: '0vh',
					y: '-110%',
				})
				console.log('dooble work')
				// Анимация показа попапа с использованием GSAP
				gsap.to(popup, {
					height: '100vh',
					y: '0%',
					opacity: 1,
					duration: 0.5,
				})
				console.log(popupId)
			} else {
				// Скрытие других попапов
				gsap.to(popup, {
					height: '0vh',
					y: '-110%',
					opacity: 0,
					duration: 0.5,
				})
			}
		})
	}

	// Функция для закрытия всех попапов
	function closeAllPopUps() {
		industriesPopups.forEach(popup => {
			gsap.to(popup, {
				height: '0vh',
				y: '-110%',
				opacity: 0,
				duration: 0.5,
			})
		})
	}

	// Добавление обработчиков событий для каждой карточки
	industriesCards.forEach(card => {
		card.addEventListener('click', () => showIndPopUp(card))
	})

	// Добавление обработчиков событий для каждой кнопки закрытия
	closeButtons.forEach(btn => {
		btn.addEventListener('click', closeAllPopUps)
	})
	// animation section_talk -----------------------------------------------------------TALK

	const ctaTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_talk',
			start: 'top center',
			end: 'bottom center',
		},
	})
	animateHeading('.section_talk [animate="reveal-heading"]', ctaTl)
	animateElement('.section_talk [animate="reveal-effect-element"]', ctaTl)

	// Найти все кнопки с атрибутом data-form='open'
	const formBtnOpen = document.querySelectorAll("[data-form='open']")
	const formCloseBtn = document.querySelector('.close-icon')
	const modalForm = document.querySelector('#modal-form')

	formBtnOpen.forEach(btn => {
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
	// animate inputs
	const inputs = document.querySelectorAll('.field')

	inputs.forEach(input => {
		const line = input.nextElementSibling

		input.addEventListener('focus', function () {
			gsap.to(line, { duration: 1, width: '100%' })
		})

		input.addEventListener('blur', function () {
			gsap.to(line, { duration: 1, width: '0%' })
		})
	})
}

if (document.readyState === 'complete') {
	Init()
} else {
	window.addEventListener('load', function () {
		Init()
	})
}

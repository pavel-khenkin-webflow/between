// use a script tag or an external JS file
import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* The following plugins are Club GSAP perks */
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

document.addEventListener('DOMContentLoaded', event => {
	gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollSmoother, SplitText)
	// gsap code here!
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
	heroTl.to(".section_about-hero [animate='reveal-heading']", {
		opacity: 1,
		duration: 3,
		stagger: 0.1,
	})
	heroTl.to(
		'.section_about-hero [animate="reveal-effect-text"]',
		{
			opacity: 1,
			y: '0%',
			duration: 3,
		},
		0
	)
	animateText('.section_discover [animate="reveal-effect-t"]', heroTl)

	heroTl.play()

	const burger = document.querySelector('.burger')
	console.log(burger)
	const linkIndr = document.getElementById('link-industries')

	linkIndr.addEventListener('click', function () {
		console.log('link clicked!')
		burger.click()
	})

	// discover section ----------------------------------DISCOVER

	const discoverTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.discover_bot',
			start: '-50% top',
			end: 'bottom bottom',
		},
	})
	animateHeading('.discover_bot [animate="reveal-heading"]', discoverTl)
	animateText('.discover_bot [animate="reveal-effect-text"]', discoverTl)

	// hero discover show text

	const discoverBtn = document.querySelector('.discover_btn')
	const discoverTexts = document.querySelectorAll('.discover-text')

	discoverBtn.addEventListener('click', function () {
		this.clickCount = (this.clickCount || 0) + 1

		if (this.clickCount % 2 === 1) {
			// Первая анимация при первом и каждом нечетном клике
			gsap.to(discoverTexts, {
				opacity: 0,
				height: 0,
			})
			gsap.to(
				discoverBtn,
				{
					rotation: 0,
					duration: 0.4,
				},
				0
			)
		} else {
			// Вторая анимация при втором и каждом четном клике
			gsap.to(discoverTexts, {
				opacity: 1,
				height: 'auto',
			})
			gsap.to(
				discoverBtn,
				{
					rotation: 180,
					duration: 0.4,
				},
				0
			)
		}
	})

	//section_ali

	const aliTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_ali',
			start: 'top 60%',
			end: 'bottom center',
		},
	})
	animateHeading('.section_ali [animate="reveal-heading"]', aliTl)
	animateText('.section_ali [animate="reveal-effect-text"]', aliTl)
	animateImage('.section_ali [animate="image"]', aliTl)

	//section_family

	const familyTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_family',
			start: 'top 60%',
			end: 'bottom center',
		},
	})
	animateHeading('.section_family [animate="reveal-heading"]', familyTl)
	animateElement('.section_family [animate="reveal-element"]', familyTl)
	animateText('.section_family [animate="reveal-effect-text"]', familyTl)
	animateImage('.section_family [animate="image"]', familyTl)

	// animation section_talk

	const ctaTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_talk',
			start: 'top center',
			end: 'bottom center',
		},
	})
	animateHeading('.section_talk [animate="reveal-heading"]', ctaTl)
	animateElement('.section_talk [animate="reveal-effect-element"]', ctaTl)
})

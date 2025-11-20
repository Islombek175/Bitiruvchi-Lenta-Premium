window.addEventListener('DOMContentLoaded', () => {
	const loaderWrapper = document.querySelector('.loader-wrapper')

	setTimeout(() => {
		loaderWrapper.style.display = 'none'
	}, 1700)

	const navToggle = document.querySelector('.nav-toggle')
	const siteNav = document.querySelector('.site-nav')
	const navLinks = siteNav ? siteNav.querySelectorAll('a') : []

	if (navToggle && siteNav) {
		navToggle.addEventListener('click', () => {
			const isOpen = navToggle.classList.toggle('active')
			siteNav.classList.toggle('open', isOpen)
			navToggle.setAttribute('aria-expanded', String(isOpen))
		})

		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (window.innerWidth <= 900 && siteNav.classList.contains('open')) {
					siteNav.classList.remove('open')
					navToggle.classList.remove('active')
					navToggle.setAttribute('aria-expanded', 'false')
				}
			})
		})
	}

	// Asosiy slayderni ishga tushirish
	initHeroSlider()
})

function initHeroSlider() {
	// Slayder logikasi va boshqaruv elementlari shu yerda yaratiladi
	const sliderTrack = document.querySelector('.slider-track')
	const sliderDots = document.querySelector('.slider-dots')
	const sliderWindow = document.querySelector('.slider-window')
	const prevBtn = document.querySelector('.slider-btn.prev')
	const nextBtn = document.querySelector('.slider-btn.next')

	if (!sliderTrack || !sliderWindow || !prevBtn || !nextBtn || !sliderDots)
		return

	const galleryImages = [
		{
			src: 'img/represent1.JPG',
			caprion: 'Presentatsiya 1',
		},
		{
			src: 'img/represent2.JPG',
			caprion: 'Presentatsiya 2',
		},
		{
			src: 'img/represent3.JPG',
			caprion: 'Presentatsiya 3',
		},
		{
			src: 'img/represent4.JPG',
			caprion: 'Presentatsiya 4',
		},
		{
			src: 'img/represent5.JPG',
			caprion: 'Presentatsiya 5',
		},
		{
			src: 'img/represent6.JPG',
			caprion: 'Presentatsiya 6',
		},
		{
			src: 'img/represent7.JPG',
			caprion: 'Presentatsiya 7',
		},
		{
			src: 'img/represent8.JPG',
			caprion: 'Presentatsiya 8',
		},
		{
			src: 'img/represent9.JPG',
			caprion: 'Presentatsiya 9',
		},
		{
			src: 'img/represent10.JPG',
			caprion: 'Presentatsiya 10',
		},
	]

	// Slayder - asosiy rasmlar
	galleryImages.forEach(({ src, caprion }) => {
		const figure = document.createElement('figure')
		figure.className = 'slider-item'

		const img = document.createElement('img')
		img.src = src
		img.alt = caprion

		figure.append(img)
		sliderTrack.appendChild(figure)
	})

	// Cheksiz aylanish uchun birinchi va oxirgi rasmlarni klonlash
	const firstClone = sliderTrack.firstElementChild.cloneNode(true)
	const lastClone = sliderTrack.lastElementChild.cloneNode(true)
	sliderTrack.insertBefore(lastClone, sliderTrack.firstElementChild)
	sliderTrack.appendChild(firstClone)

	// Nuqtalar slayder tagidagi
	galleryImages.forEach((_, index) => {
		const dot = document.createElement('button')
		dot.type = 'button'
		dot.setAttribute('aria-label', `${index + 1}-slayd`)
		dot.addEventListener('click', () => {
			if (isTransitioning) return
			goToSlide(index + 1) // +1 chunki birinchi element klon
		})
		sliderDots.appendChild(dot)
	})

	const dots = sliderDots.querySelectorAll('button')
	let currentSlide = 1 // Klonlangan birinchi rasm bilan boshlaymiz
	let startX = 0
	let currentX = 0
	let isSwiping = false
	let isTransitioning = false

	const totalSlides = galleryImages.length

	const goToSlide = (index, withTransition = true) => {
		if (isTransitioning && withTransition) return

		const total = totalSlides + 2 // Asosiy rasmlar + 2 klon

		// Chegaralarni tekshirish va klonlarga o'tish
		if (index < 0) {
			// Oldinga o'tish: oxirgi klon rasmga (total - 1)
			index = total - 1
		} else if (index >= total) {
			// Keyinga o'tish: birinchi klon rasmga (0)
			index = 0
		}

		if (withTransition) {
			sliderTrack.style.transition = 'transform 0.5s ease'
		} else {
			sliderTrack.style.transition = 'none'
		}

		currentSlide = index
		sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`

		// Haqiqiy slayd indeksini hisoblash (klonlarni hisobga olmasdan)
		const realIndex =
			currentSlide === 0
				? totalSlides - 1
				: currentSlide === total - 1
				? 0
				: currentSlide - 1

		updateDots(realIndex)

		// Cheksiz aylanish uchun klonlardan haqiqiy rasmlarga o'tish
		if (withTransition && currentSlide === total - 1) {
			// Oxirgi klon rasmga yetib kelganda, birinchi haqiqiy rasmga o'tish
			setTimeout(() => {
				isTransitioning = true
				goToSlide(1, false)
				setTimeout(() => {
					isTransitioning = false
				}, 50)
			}, 500)
		} else if (withTransition && currentSlide === 0) {
			// Birinchi klon rasmga yetib kelganda, oxirgi haqiqiy rasmga o'tish
			setTimeout(() => {
				isTransitioning = true
				goToSlide(totalSlides, false)
				setTimeout(() => {
					isTransitioning = false
				}, 50)
			}, 500)
		}
	}

	const updateDots = realIndex => {
		dots.forEach((dot, idx) => {
			dot.classList.toggle('active', idx === realIndex)
		})
	}

	const handlePrev = () => {
		if (isTransitioning) return
		goToSlide(currentSlide - 1)
	}

	const handleNext = () => {
		if (isTransitioning) return
		goToSlide(currentSlide + 1)
	}

	prevBtn.addEventListener('click', handlePrev)
	nextBtn.addEventListener('click', handleNext)

	const onTouchStart = event => {
		startX = event.touches[0].clientX
		isSwiping = true
	}

	const onTouchMove = event => {
		if (!isSwiping) return
		currentX = event.touches[0].clientX
	}

	const onTouchEnd = () => {
		if (!isSwiping) return
		const diff = currentX - startX
		if (Math.abs(diff) > 50) {
			diff > 0 ? handlePrev() : handleNext()
		}
		isSwiping = false
		startX = 0
		currentX = 0
	}

	sliderWindow.addEventListener('touchstart', onTouchStart, { passive: true })
	sliderWindow.addEventListener('touchmove', onTouchMove, { passive: true })
	sliderWindow.addEventListener('touchend', onTouchEnd)

	// Klonlangan birinchi rasm bilan boshlash (indeks 1)
	goToSlide(1, false)
}

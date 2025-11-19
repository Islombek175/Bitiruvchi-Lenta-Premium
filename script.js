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
			src: 'img/all-colors.jpg',
			caption: 'Gradient palitradagi premium lenta namunasi',
		},
		{
			src: 'img/logo.png',
			caption: 'Individual logotip',
		},
	]

	// Slayder
	galleryImages.forEach(({ src, caption }) => {
		const figure = document.createElement('figure')
		figure.className = 'slider-item'

		const img = document.createElement('img')
		img.src = src
		img.alt = caption

		figure.append(img)
		sliderTrack.appendChild(figure)
	})

	// Nuqtalar slayder tagidagi
	galleryImages.forEach((_, index) => {
		const dot = document.createElement('button')
		dot.type = 'button'
		dot.setAttribute('aria-label', `${index + 1}-slayd`)
		dot.addEventListener('click', () => goToSlide(index))
		sliderDots.appendChild(dot)
	})

	const dots = sliderDots.querySelectorAll('button')
	let currentSlide = 0
	let startX = 0
	let currentX = 0
	let isSwiping = false

	const goToSlide = index => {
		const total = galleryImages.length
		currentSlide = (index + total) % total
		sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`
		updateDots()
	}

	const updateDots = () => {
		dots.forEach((dot, idx) => {
			dot.classList.toggle('active', idx === currentSlide)
		})
	}

	const handlePrev = () => goToSlide(currentSlide - 1)
	const handleNext = () => goToSlide(currentSlide + 1)

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

	goToSlide(0)

}

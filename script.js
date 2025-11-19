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
})

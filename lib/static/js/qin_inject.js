;(function() {
  function show() {
    document.querySelectorAll('.navGroup ul').forEach(node => {
      if (node.classList.contains('hide')) {
        node.classList.remove('hide')
      }
    })
    document.querySelectorAll('.navGroup .arrow').forEach(node => {
      if (!node.classList.contains('rotate')) {
        node.classList.add('rotate')
      }
    })
  }
  function hide() {
    document.querySelectorAll('.navGroup ul').forEach(node => {
      if (!node.classList.contains('hide')) {
        node.classList.add('hide')
      }
    })
    document.querySelectorAll('.navGroup .arrow').forEach(node => {
      if (node.classList.contains('rotate')) {
        node.classList.remove('rotate')
      }
    })
  }
  let isShow = localStorage.getItem('isShow') ? true : false

  document.addEventListener('DOMContentLoaded', () => {
    if (isShow) {
      show()
    }
    // Find the active nav item in the sidebar
    const item = document.getElementsByClassName('navListItemActive')[0]
    if (!item) {
      return
    }
    const bounding = item.getBoundingClientRect()
    if (
      bounding.top >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      // Already visible.  Do nothing.
    } else {
      // Not visible.  Scroll sidebar.
      item.scrollIntoView({ block: 'center', inline: 'nearest' })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    document.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode === 27) {
        if (isShow) {
          hide()
          localStorage.removeItem('isShow')
        } else {
          show()
          localStorage.setItem('isShow', 1)
        }
        isShow = !isShow
      }
    })
  })
})()

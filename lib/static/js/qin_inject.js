;(function() {
  function show() {
    document.querySelectorAll('.navGroup ul').forEach(node => {
      if (node.classList.contains('hide')) {
        node.classList.remove('hide')
      }
    })
    document.querySelectorAll('.navGroup .arrow').forEach(node => {
      if (!node.classList.contains('rotate')) {
        node.classList.add('rotate');
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
        node.classList.remove('rotate');
      }
    })
  }
  let isShow = false;

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keyup', ({ keyCode }) => {
      if(keyCode === 27) {
        if(isShow) {
          hide()
        } else {
          show()
        }
        isShow = !isShow
      }
    })
  })
})();

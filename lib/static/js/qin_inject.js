;(function() {
  function show() {
    document.querySelectorAll('.navGroup ul').forEach(node => {
      if (node.classList.contains('hide')) {
        node.classList.remove('hide')
      }
    })
  }
  function hide() {
    document.querySelectorAll('.navGroup ul').forEach(node => {
      if (!node.classList.contains('hide')) {
        node.classList.add('hide')
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

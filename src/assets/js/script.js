$(document).ready(function () {
  var picker = $('.selectpicker')
  picker.on('shown.bs.select', function () {
    var self = $(this)
    var input = self.parent().find('input')
    input.on('keyup', function (e, clickedIndex, isSelected, previousValue) {
      var dropdown = self.parent().find('.dropdown-menu.inner').first()
      if (e.keyCode === 13 && $(this).val().length && dropdown.children('.no-results').length) {
        var selected = self.selectpicker('val')
        var value = $(this).val()
        var option = "<option>" + value + "</option>"
        self.prepend(option)
        selected.push(value)
        self.selectpicker('val', selected)
        self.selectpicker('refresh')
      }
    })
  });
  picker.on('refreshed.bs.select', function () {
    var self = $(this)
    var input = self.parent().find('input')
    input.val('')
  });

})

$(document).on('ready',function(){
  var add_item_modal = $('#add-new-item'),
      add_item_form = $('#createNewItem');

  add_item_form.on('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.dim').show();
    $.ajax({
      url: add_item_form.attr('action'),
      dataType: 'JSON',
      data: add_item_form.serialize(),
      type: 'POST',
      success: function(data) {
        add_item_modal.modal('hide');
        addToList(data);
        $('.dim').hide();
      }
    });
  });
  add_item_modal.on('hidden.bs.modal', function() {
    clearData(add_item_form);
  });

  $('.list_items .list_item').each(function(){
    bindItem($(this));
  });
});

function clearData(form) {
  form.find('input').each(function(){
    $(this).val('');
  });
}

function addToList(data, bottom) {
  bottom = bottom || false;
  var checked = data.done? "checked" : "";
  var item = $('#hidden_stuff .list_item').clone();
  item.find('label').html('<input type="checkbox" class="item_checkbox" data-item_id="'+data.id+'" '+checked+'>' + data.name);
  item.find('.description').text(data.description);
  item.find('.price').text(data.price);
  bindItem(item);
  if (bottom) {
    $('.list_items').append(item);
  } else {
    $('.list_items').prepend(item);
  }
  $.material.checkbox(item.find('.item_checkbox'));
}

function bindItem(item) {
  item.find('.item_checkbox').on('change', function(){
    var that = $(this); // that is the checkbox input
    $('.dim').show();
    $.ajax({
      url: "items/" + that.attr('data-item_id') + "/toggle",
      type: "post",
      dataType: "JSON",
      success: function(data) {
        that.closest('.list_item').remove();
        addToList(data, true);
        $('.dim').hide();
      },
      error: function(data) {
        $('.dim').hide();
      }
    });
  });
}

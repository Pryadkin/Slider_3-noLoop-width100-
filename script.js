const get_slider = (function() {
  return function(slider_class) {

    let
      slider = document.querySelector(slider_class);
      slider_wrapper = slider.querySelector('.slider_wrapper');
      wrapper_width = parseFloat(getComputedStyle(slider_wrapper).width);
      slider_items = slider.querySelectorAll('.slider_item');
      item_width = parseFloat(getComputedStyle(slider_items[0]).width);
      slider_control = slider.querySelectorAll('.slider_control');
      slider_control_right = slider.querySelector('.slider_control_right');
      slider_control_left = slider.querySelector('.slider_control_left');
      step = item_width / wrapper_width * 100;
      position_left_item = 0;
      transform = 0;
      items = [];

    slider_items.forEach(function(item, index) {
      items.push({item: item, position: index});
    })

    let position = {
      getMin: 0,
      getMax: items.length - 1,
    }

    let get_transform_slider = function(direction) {
      if(direction === 'right') {
        if((position_left_item + wrapper_width / item_width) >= position.getMax) {
          slider_control_right.classList.remove('slider_control_show');
        }
        if(position_left_item >= 0) {
          slider_control_left.classList.add('slider_control_show');
        }
        position_left_item++;
        transform -= step;
      }

      if(direction === 'left') {
        if(position_left_item - 1 <= position.getMin) {
          slider_control_left.classList.remove('slider_control_show');
        }
        if(position_left_item >= 0) {
          slider_control_right.classList.add('slider_control_show');
        }
        position_left_item--;
        transform += step;
      }
      slider_wrapper.style.transform = 'translateX(' + transform + '%)';
    }

    let get_direct_control = function() {
      let direction = this.classList.contains('slider_control_right') ? 'right' : 'left';
      get_transform_slider(direction);
    }

    let setUp_listener = function() {
      slider_control.forEach(function(item) {
        item.addEventListener('click', get_direct_control)
      })
    }
    setUp_listener();

  }
}())

const slider = get_slider('.slider');

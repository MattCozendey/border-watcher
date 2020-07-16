//let propertyValue = input.value.replace(/(?:[^px\%]*)/g, '');
const DIV = document.querySelector('.rectangle');
const TRANSFORMERS = document.querySelectorAll('select');
const TRANSFORMER_INPUTS = document.querySelectorAll('input');
const SELECTOR_VALUES = ['px', '%'];

let divMesh = {
  border_radius: '35px',
  border_top_left_radius: '35px',
  border_top_right_radius: '35px',
  border_bottom_left_radius: '35px',
  border_bottom_right_radius: '35px',
  reset: (borderValue, borderMeasure) => {
    divMesh.border_radius = borderValue + borderMeasure;
    divMesh.border_top_left_radius = borderValue + borderMeasure;
    divMesh.border_top_right_radius = borderValue + borderMeasure;
    divMesh.border_bottom_left_radius = borderValue + borderMeasure;
    divMesh.border_bottom_right_radius = borderValue + borderMeasure;
    let length = TRANSFORMER_INPUTS.length;
    for (let i = 1; i < length; i++) {
      TRANSFORMER_INPUTS[i].value = '';
    }
  },
  Update: (borderValue, borderSide, borderMeasure) => {
    if (borderSide == 0) {
      DIV.setAttribute('style', `border-radius: ${borderValue}${borderMeasure}`);
      divMesh.border_radius = borderValue + borderMeasure;
      divMesh.reset(borderValue, borderMeasure);
    } else {
      TRANSFORMER_INPUTS[0].value = '';
      switch (borderSide) {
        case 1:
          if (borderValue == '') {
            borderValue = divMesh.border_top_left_radius.slice(0, -2);
          }
          DIV.setAttribute('style', `border-top-left-radius: ${borderValue}${borderMeasure}`);
          divMesh.border_top_left_radius = borderValue + borderMeasure;
          break;
        case 2:
          if (borderValue == '') {
            borderValue = divMesh.border_top_right_radius.slice(0, -2);
          }
          DIV.setAttribute('style', `border-top-right-radius: ${borderValue}${borderMeasure}`);
          divMesh.border_top_right_radius = borderValue + borderMeasure;
          break;
        case 3:
          if (borderValue == '') {
            borderValue = divMesh.border_bottom_left_radius.slice(0, -2);
          }
          DIV.setAttribute('style', `border-bottom-left-radius: ${borderValue}${borderMeasure}`);
          divMesh.border_bottom_left_radius = borderValue + borderMeasure;
          break;
        case 4:
          if (borderValue == '') {
            borderValue = divMesh.border_bottom_right_radius.slice(0, -2);
          }
          DIV.setAttribute('style', `border-bottom-right-radius: ${borderValue}${borderMeasure}`);
          divMesh.border_bottom_right_radius = borderValue + borderMeasure;
          break;
      }
      DIV.setAttribute(
        'style',
        `border-radius: ${divMesh.border_top_left_radius} ${divMesh.border_top_right_radius}
        ${divMesh.border_bottom_left_radius} ${divMesh.border_bottom_right_radius}`
      );
    }
    console.table(divMesh);
  },
};

TRANSFORMERS.forEach((transformer) => {
  SELECTOR_VALUES.forEach((value) => {
    const NEW_SELECTOR_VALUE = document.createElement('option');
    NEW_SELECTOR_VALUE.setAttribute('value', value);
    NEW_SELECTOR_VALUE.innerText = value;
    transformer.appendChild(NEW_SELECTOR_VALUE);
  });
});

TRANSFORMER_INPUTS.forEach((input, inputIndex) => {
  input.addEventListener('keydown', (event) => {
    if (event.key == 'Tab') {
      TRANSFORMERS[inputIndex].focus();
    }
    if (event.key == 'Enter' && !(input.value.length == 0)) {
      TRANSFORMER_INPUTS[inputIndex + 1].focus();
    }
  });

  TRANSFORMERS[inputIndex].addEventListener('change', (event) => {
    divMesh.Update(input.value, inputIndex, TRANSFORMERS[inputIndex].value);
  });

  input.addEventListener('keyup', (event) => {
    divMesh.Update(input.value, inputIndex, TRANSFORMERS[inputIndex].value);
  });
});

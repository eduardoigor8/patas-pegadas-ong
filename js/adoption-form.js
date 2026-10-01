export function initializeAdoptionForm() {
  const adoptionForm = document.querySelector('.adoption-form');
  const formFeedback = document.getElementById('form-feedback');
  const formToast = document.getElementById('form-toast');
  const toastClose = formToast ? formToast.querySelector('.toast-close') : null;

  if (!adoptionForm || !formFeedback || !formToast || !toastClose) return;

  let toastTimer;
  const formControls = [...adoptionForm.querySelectorAll('input, select, textarea')];
  const errorMessages = new Map();

  const hideToast = () => {
    formToast.hidden = true;
    window.clearTimeout(toastTimer);
  };

  const getValidationMessage = (control) => {
    const empty = control.type === 'checkbox'
      ? !control.checked
      : control.value.trim() === '';

    if (control.required && empty) {
      return control.type === 'checkbox'
        ? 'Você precisa aceitar este contato para continuar.'
        : 'Este campo é obrigatório.';
    }

    if (control.validity.typeMismatch) {
      return 'Informe um e-mail válido.';
    }

    if (control.validity.patternMismatch) {
      return control.title || 'Confira o formato informado.';
    }

    return '';
  };

  const validateField = (control) => {
    const message = getValidationMessage(control);
    const hasError = Boolean(message);
    const hasValue = control.type === 'checkbox'
      ? control.checked
      : control.value.trim() !== '';
    const field = control.closest('.field');
    const errorMessage = errorMessages.get(control);

    control.classList.toggle('is-invalid', hasError);
    control.classList.toggle('is-valid', !hasError && hasValue);
    control.setAttribute('aria-invalid', String(hasError));
    field?.classList.toggle('is-invalid', hasError);
    field?.classList.toggle('is-valid', !hasError && hasValue);
    errorMessage.textContent = message;
    errorMessage.hidden = !hasError;

    return !hasError;
  };

  formControls.forEach((control, index) => {
    const field = control.closest('.field');
    if (!field) return;

    const errorMessage = document.createElement('small');
    errorMessage.className = 'field-error';
    errorMessage.id = `${control.id || `adoption-field-${index + 1}`}-error`;
    errorMessage.hidden = true;
    errorMessage.setAttribute('aria-live', 'polite');
    field.append(errorMessage);
    control.setAttribute('aria-describedby', errorMessage.id);
    errorMessages.set(control, errorMessage);

    ['input', 'change'].forEach((eventName) => {
      control.addEventListener(eventName, () => {
        validateField(control);
        if (formControls.every((item) => !getValidationMessage(item))) {
          formFeedback.hidden = true;
        }
      });
    });
  });

  adoptionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalidControls = formControls.filter((control) => !validateField(control));
    formFeedback.hidden = invalidControls.length === 0;

    if (invalidControls.length) {
      formFeedback.textContent = 'Confira os campos destacados antes de enviar.';
      invalidControls[0].focus();
      return;
    }

    formToast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 6000);
  });

  toastClose.addEventListener('click', hideToast);
}
document.addEventListener('DOMContentLoaded', () => {

  // COMPACT HEADER ON SCROLL

  const header = document.getElementById('pageHeader');

  const updateHeader = () => {
    if (header) {
      header.classList.toggle('is-compact', window.scrollY > 28);
    }
  };

  updateHeader();

  window.addEventListener('scroll', updateHeader, {
    passive: true
  });


  // WHOLESALE ENQUIRY FORM

  const form = document.getElementById('wholesaleForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (event) => {

    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const products = data.getAll('products');

    if (!products.length) {

      feedback.textContent =
        'Please select at least one product category.';

      form.querySelector('fieldset').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      return;
    }

    const lines = [

      "Hello Zel's Hair Collection, I'd like to make a wholesale enquiry.",

      '',

      `Full name: ${data.get('fullName')}`,

      `Business name: ${data.get('businessName') || 'Not provided'}`,

      `WhatsApp number: ${data.get('phone')}`,

      `Customer type: ${data.get('customerType')}`,

      `Products: ${products.join(', ')}`,

      `Estimated quantity: ${data.get('quantity') || 'Not specified'}`,

      `Additional information: ${data.get('notes') || 'None'}`

    ];

    const message = encodeURIComponent(lines.join('\n'));

    const whatsappNumber = '233536115258';

    const url =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    feedback.textContent =
      'Opening WhatsApp with your enquiry. Review the message and press send.';

    window.open(url, '_blank', 'noopener,noreferrer');

  });


  // FAQ ACCORDION

  document.querySelectorAll('.faq-list details').forEach((item) => {

    item.addEventListener('toggle', () => {

      if (!item.open) return;

      document.querySelectorAll('.faq-list details').forEach((other) => {

        if (other !== item) {
          other.open = false;
        }

      });

    });

  });

});

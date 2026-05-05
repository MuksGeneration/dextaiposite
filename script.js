  // ──────────────────────────────────────────────────
  // IPO SHARE CALCULATOR
  // ──────────────────────────────────────────────────
  const shareQtyInput = document.getElementById('shareQuantity');
  const shareCountDisplay = document.getElementById('shareCount');
  const totalInvestmentDisplay = document.getElementById('totalInvestment');
  const ipoPrice = 150;

  if (shareQtyInput) {
    shareQtyInput.addEventListener('input', function() {
      const quantity = Math.max(100, parseInt(this.value) || 100);
      const total = quantity * ipoPrice;
      shareCountDisplay.textContent = quantity;
      totalInvestmentDisplay.textContent = 'Ksh ' + total.toLocaleString();
    });
  }

  // ──────────────────────────────────────────────────
  // IPO FORM SUBMISSION
  // ──────────────────────────────────────────────────
  const ipoSubmitBtn = document.getElementById('ipoSubmit');
  const sendOtpBtn = document.getElementById('sendOtpBtn');

  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', async function() {
      const email = document.getElementById('ipoEmail').value;
      const phone = document.getElementById('ipoPhone').value;

      if (!email || !phone) {
        alert('Please enter email and phone number');
        return;
      }

      this.textContent = 'Sending OTP...';
      this.disabled = true;

      try {
        // Simulate OTP sending
        setTimeout(() => {
          alert('OTP sent to ' + phone);
          this.textContent = 'OTP Sent ✓';
          this.style.background = '#2d9e5f';
        }, 1500);
      } catch (error) {
        this.textContent = 'Send OTP';
        this.disabled = false;
        alert('Error sending OTP');
      }
    });
  }

  if (ipoSubmitBtn) {
    ipoSubmitBtn.addEventListener('click', async function() {
      const name = document.getElementById('ipoName').value;
      const email = document.getElementById('ipoEmail').value;
      const phone = document.getElementById('ipoPhone').value;
      const nid = document.getElementById('ipoNID').value;
      const shares = parseInt(document.getElementById('shareQuantity').value) || 100;
      const otp = document.getElementById('ipoOTP').value;

      if (!name || !email || !phone || !nid || !otp) {
        alert('Please fill all fields including OTP');
        return;
      }

      this.textContent = 'Processing...';
      this.disabled = true;

      try {
        const response = await fetch('/api/ipo/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, shares, name, phone, nid })
        });

        const result = await response.json();

        if (response.ok) {
          this.textContent = '✓ Successfully Subscribed!';
          this.style.background = '#2d9e5f';
          
          // Clear form after 2 seconds
          setTimeout(() => {
            document.getElementById('ipoName').value = '';
            document.getElementById('ipoEmail').value = '';
            document.getElementById('ipoPhone').value = '';
            document.getElementById('ipoNID').value = '';
            document.getElementById('ipoOTP').value = '';
            document.getElementById('shareQuantity').value = '100';
            
            this.textContent = 'Complete Registration';
            this.disabled = false;
            this.style.background = '';
          }, 2000);
        } else {
          this.textContent = '✗ ' + (result.error || 'Error');
          this.style.background = '#cc4444';
          this.disabled = false;
        }
      } catch (error) {
        console.error('Error:', error);
        this.textContent = '✗ Network Error';
        this.style.background = '#cc4444';
        this.disabled = false;
      }
    });
  }

  // Pay Now Button - Payment Gateway Integration
  const payNowBtn = document.getElementById('payNowBtn');
  if (payNowBtn) {
    payNowBtn.addEventListener('click', function() {
      const email = document.getElementById('ipoEmail').value;
      const shares = parseInt(document.getElementById('shareQuantity').value) || 100;
      const amount = shares * ipoPrice;

      if (!email) {
        alert('Please enter your email address');
        return;
      }

      alert(`Ready to pay Ksh ${amount.toLocaleString()} for ${shares} shares\n\nPayment gateway integration coming soon!`);
      // Future: Integrate Flutterwave, M-Pesa, or other payment provider
    });
  }
  let ipoData = {
    price: 150,
    subscription: 68,
    volume: 125400
  };

  async function fetchIPOPrice() {
    try {
      const response = await fetch('/api/ipo/price');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Using local IPO data:', error.message);
      return null;
    }
  }

  function updateIPOTicker(serverData = null) {
    const priceDisplay = document.querySelector('.price-display span:last-child');
    const progressFill = document.querySelector('.progress-fill');
    const subPercentage = document.querySelector('.ipo-bar-label span:last-child');

    if (priceDisplay) {
      if (serverData) {
        ipoData.price = serverData.price;
      } else {
        // Simulate price fluctuation ±0.5%
        const change = (Math.random() - 0.5) * 1.5;
        ipoData.price = Math.max(148, Math.min(155, ipoData.price + change));
      }
      
      priceDisplay.textContent = ipoData.price.toFixed(2);
      
      // Color change based on price movement
      const priceContainer = document.querySelector('.price-display');
      if (ipoData.price > 150.5) {
        priceContainer.style.color = '#4CC978';
      } else if (ipoData.price < 149.5) {
        priceContainer.style.color = '#E94B3C';
      } else {
        priceContainer.style.color = 'var(--text)';
      }
      setTimeout(() => {
        priceContainer.style.color = 'var(--text)';
      }, 2000);
    }

    if (progressFill && subPercentage) {
      if (serverData && serverData.subscription) {
        ipoData.subscription = serverData.subscription;
      } else {
        ipoData.subscription = Math.min(99, ipoData.subscription + Math.random() * 0.8);
      }
      progressFill.style.width = ipoData.subscription + '%';
      subPercentage.textContent = Math.floor(ipoData.subscription) + '%';
    }
  }

  // Fetch from server and update
  async function updateFromServer() {
    const data = await fetchIPOPrice();
    if (data) {
      updateIPOTicker(data);
    } else {
      updateIPOTicker();
    }
  }

  // Initial fetch
  updateFromServer();

  // Update every 4 seconds
  setInterval(updateFromServer, 4000);

  // ──────────────────────────────────────────────────
  // SCROLL REVEAL & ANIMATIONS
  // ──────────────────────────────────────────────────
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // Stagger service cards
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // Stagger req cards
  document.querySelectorAll('.req-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    card.classList.add('reveal');
    observer.observe(card);
  });

  // Animate stats counter
  function animateCount(el, target, prefix='', suffix='') {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(start) + suffix;
    }, 16);
  }

  // Form submit feedback with API integration
  document.querySelector('.form-submit').addEventListener('click', async function() {
    const inputs = document.querySelectorAll('.form-input');
    let filled = true;
    const formData = {};
    
    inputs.forEach(i => {
      if (!i.value) filled = false;
      const name = i.getAttribute('placeholder')?.toLowerCase() || i.name;
      formData[i.name || 'field'] = i.value;
    });

    if (!filled) {
      this.textContent = 'Please Fill All Fields';
      this.style.background = '#cc4444';
      setTimeout(() => {
        this.textContent = 'Submit Registration';
        this.style.background = '';
      }, 2000);
      return;
    }

    // Map form fields to API
    const registrationData = {
      name: document.querySelector('input[placeholder*="legal"]')?.value || '',
      email: document.querySelector('input[type="email"]')?.value || '',
      phone: document.querySelector('input[type="tel"]')?.value || '',
      national_id: document.querySelector('input[placeholder*="National"]')?.value || '',
      service: document.querySelector('select')?.value || 'Loan'
    };

    try {
      this.textContent = 'Submitting...';
      this.disabled = true;
      this.style.background = '#888899';

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (response.ok) {
        this.textContent = '✓ Submitted! We\'ll contact you soon';
        this.style.background = '#2d9e5f';
        // Clear form
        inputs.forEach(i => i.value = '');
      } else {
        this.textContent = '✗ Error: ' + (result.error || 'Failed');
        this.style.background = '#cc4444';
        this.disabled = false;
      }
    } catch (error) {
      console.error('Submission error:', error);
      this.textContent = '✗ Network error. Try again.';
      this.style.background = '#cc4444';
      this.disabled = false;
    }
  });
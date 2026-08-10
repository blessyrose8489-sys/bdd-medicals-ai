/**
 * B.D.D Medicals - AI Powered Medical Image & Patient Management System
 * Master Application Script (Multilingual AI & AI Lifestyle Coach Integrated)
 */

class SmartMedicalApp {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6;
    this.activeView = 'landing';
    
    // Intake Form State
    this.formData = {
      fullName: 'Sarah Jenkins',
      age: 34,
      gender: 'Female',
      mobile: '+1 (555) 234-5678',
      email: 'sarah.j@example.com',
      address: '742 Evergreen Terrace, Springfield',
      bloodGroup: 'B+',
      height: 168,
      weight: 62,
      medicalConditions: 'Mild Asthma',
      allergies: 'Penicillin',
      medications: 'Albuterol Inhaler',
      emergencyContact: '+1 (555) 999-0011',
      healthProblemText: 'Enaku rendu naala chest pain iruku.',
      symptoms: ['Chest Pain', 'Shortness of Breath'],
      bodyRegion: 'Chest',
      painLevel: 6,
      painDuration: '2 Days',
      reportType: 'X-Ray',
      hasReport: true,
      uploadedFile: {
        name: 'Chest_XRay_2026.jpg',
        size: '3.4 MB',
        url: 'assets/xray_chest.jpg'
      }
    };

    // AI Lifestyle Coach State
    this.lifestyleHabits = [
      { id: 1, title: 'Drink recommended water intake (2.5L - 3.0L)', completed: false, icon: 'droplet' },
      { id: 2, title: 'Complete daily walking goal (4,000 - 6,000 steps)', completed: false, icon: 'footprints' },
      { id: 3, title: 'Sleep 7.5 - 8 hours on schedule', completed: false, icon: 'moon' },
      { id: 4, title: 'Eat balanced, nutrient-rich meals', completed: false, icon: 'apple' },
      { id: 5, title: 'Practice 10 mins relaxation / box breathing', completed: false, icon: 'wind' },
      { id: 6, title: 'Avoid smoking & alcohol consumption', completed: true, icon: 'shield-check' },
      { id: 7, title: 'Take scheduled medications (if prescribed)', completed: true, icon: 'pill' }
    ];

    this.motivationalQuotes = [
      "Small healthy habits create big improvements.",
      "Stay active, stay healthy.",
      "Consistency is more important than perfection.",
      "Take care of your health one day at a time.",
      "Every step counts towards a healthier you.",
      "Nourish your body, respect your mind."
    ];
    this.quoteIndex = 0;
    this.quoteTimer = null;

    // AI Analysis State
    this.aiAnalysisResult = null;
    this.patientId = 'SM-2026-8942';

    // Doctor Workstation DICOM Canvas State
    this.canvasState = {
      zoom: 1.0,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      invert: false,
      compareMode: false,
      currentImageSrc: 'assets/xray_chest.jpg',
      compareImageSrc: 'assets/mri_knee.jpg'
    };

    // Master Symptom List
    this.allSymptoms = [
      "Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath",
      "Back Pain", "Knee Pain", "Joint Pain", "Vomiting", "Diarrhea",
      "Dizziness", "Fatigue", "Skin Rash", "Tooth Pain", "Eye Pain",
      "Ear Pain", "High Blood Pressure", "Diabetes Symptoms", "Pregnancy Related", "Other"
    ];

    // Master Body Regions List
    this.bodyRegions = [
      { id: 'Head', icon: '🧠', label: 'Head' },
      { id: 'Neck', icon: '🧣', label: 'Neck' },
      { id: 'Chest', icon: '🫁', label: 'Chest' },
      { id: 'Back', icon: '🦴', label: 'Back' },
      { id: 'Shoulder', icon: '💪', label: 'Shoulder' },
      { id: 'Arm', icon: '🦾', label: 'Arm' },
      { id: 'Hand', icon: '✋', label: 'Hand' },
      { id: 'Stomach', icon: '🫃', label: 'Stomach' },
      { id: 'Hip', icon: '🧍', label: 'Hip' },
      { id: 'Leg', icon: '🦵', label: 'Leg' },
      { id: 'Knee', icon: '🦵', label: 'Knee' },
      { id: 'Foot', icon: '🦶', label: 'Foot' }
    ];

    // Rotating Multilingual Placeholders Array
    this.rotatingPlaceholders = [
      "Enaku rendu naala fever iruku.",
      "எனக்கு மார்பு வலி உள்ளது.",
      "I have severe headache.",
      "Mujhe saans lene mein dikkat ho rahi hai.",
      "Vayiru romba valikuthu.",
      "Nakku cough irukku.",
      "എനിക്ക് തലവേദനയുണ്ട്.",
      "J'ai une forte fièvre et une toux.",
      "Thalai romba valikuthu.",
      "Moochu vidrathuku kashtama iruku."
    ];
    this.placeholderIndex = 0;
    this.placeholderTimer = null;

    // Speech Recognition Handle
    this.isListening = false;
    this.recognition = null;

    this.doctorNotes = "Initial AI screening confirmed. Recommend 12-lead ECG and Troponin blood panel. No acute ST-elevation observed on initial X-Ray.";

    // Initialize when DOM ready
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    this.initIntroVideo();
    this.renderSymptomsGrid();
    this.renderBodyRegionsGrid();
    this.updateWizardProgress();
    this.initDicomCanvas();
    this.initCharts();
    this.startPlaceholderRotation();
    this.startQuoteRotation();
    this.initSpeechRecognition();

    // Trigger initial multilingual parse for pre-populated state
    this.onMultilingualInput(this.formData.healthProblemText);
    
    // Refresh Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* --------------------------------------------------------------------------
     STARTUP INTRO VIDEO (AI_powered_healthcare_animation)
     -------------------------------------------------------------------------- */
  initIntroVideo() {
    const videoOverlay = document.getElementById('introVideoOverlay');
    const videoEl = document.getElementById('introVideo');
    if (!videoOverlay) return;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      videoOverlay.classList.add('video-fade-out');
      setTimeout(() => {
        videoOverlay.style.display = 'none';
        // Seamlessly opens existing Welcome Screen
        this.switchView('landing');
      }, 600); // 600ms smooth fade out
    };

    if (videoEl) {
      videoEl.autoplay = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.loop = false;
      videoEl.controls = false;

      // Listen strictly for the video's natural "ended" event (Plays FULL video to final frame)
      videoEl.addEventListener('ended', dismiss);

      const startPlay = () => {
        const promise = videoEl.play();
        if (promise !== undefined) {
          promise.catch(err => console.log("Video autoplay status:", err));
        }
      };

      if (videoEl.readyState >= 1) {
        startPlay();
      } else {
        videoEl.addEventListener('loadedmetadata', startPlay, { once: true });
        videoEl.addEventListener('canplay', startPlay, { once: true });
      }

      // Extended safety check (30s) only if playback fails completely
      setTimeout(() => {
        if (!dismissed && videoEl.ended) {
          dismiss();
        }
      }, 30000);
    } else {
      dismiss();
    }
  }

  playCanvasFallbackAnimation(canvasEl, onEndCallback) {
    if (!canvasEl) {
      onEndCallback();
      return;
    }

    canvasEl.style.display = 'block';
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) {
      onEndCallback();
      return;
    }

    let startTime = null;
    const duration = 3200; // 3.2 seconds animation

    const render = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      const cx = canvasEl.width / 2;
      const cy = canvasEl.height / 2;

      // Glowing Pulse Circle
      const r = 40 + Math.sin(progress * Math.PI * 4) * 15;
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r * 2.5);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.8)');
      grad.addColorStop(0.5, 'rgba(20, 184, 166, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Title Reveal
      ctx.font = 'bold 36px "Outfit", sans-serif';
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(progress * 2, 1)})`;
      ctx.textAlign = 'center';
      ctx.fillText('B.D.D MEDICALS', cx, cy + 80);

      ctx.font = '16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = `rgba(14, 165, 233, ${Math.min(progress * 2, 1)})`;
      ctx.fillText('AI INTRO ANIMATION', cx, cy + 110);

      if (progress < 1) {
        requestAnimationFrame(render);
      } else {
        onEndCallback();
      }
    };

    requestAnimationFrame(render);
  }

  /* --------------------------------------------------------------------------
     NEW FEATURE: AI SPLASH SCREEN CONTROLLER (3-SECOND INTRO)
     -------------------------------------------------------------------------- */
  initSplashScreen() {
    const splashOverlay = document.getElementById('aiSplashScreen');
    const progressFill = document.getElementById('splashProgressFill');
    const statusText = document.getElementById('splashStatusText');
    if (!splashOverlay) return;

    const messages = [
      "Initializing B.D.D Medicals...",
      "Loading AI Symptom & Multilingual Modules...",
      "Preparing Health Assessment...",
      "Connecting Secure Medical Services...",
      "Loading Patient Experience...",
      "Almost Ready..."
    ];

    let progress = 0;
    const duration = 3000; // 3 seconds
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    // Smooth Progress Animation Loop
    const timer = setInterval(() => {
      progress += increment;
      if (progressFill) {
        progressFill.style.width = `${Math.min(progress, 100)}%`;
      }

      // Rotate Status Messages naturally
      const msgIndex = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
      if (statusText && statusText.textContent !== messages[msgIndex]) {
        statusText.style.opacity = '0';
        setTimeout(() => {
          if (statusText) {
            statusText.textContent = messages[msgIndex];
            statusText.style.opacity = '1';
          }
        }, 120);
      }

      if (progress >= 100) {
        clearInterval(timer);
        // Smoothly fade out splash screen after 3 seconds
        setTimeout(() => {
          splashOverlay.classList.add('splash-fade-out');
          setTimeout(() => {
            splashOverlay.style.display = 'none';
          }, 600);
        }, 200);
      }
    }, intervalTime);
  }

  /* --------------------------------------------------------------------------
     AI LIFESTYLE COACH ENGINE
     -------------------------------------------------------------------------- */
  renderLifestyleCoach() {
    const weight = this.formData.weight || 65;
    const waterTarget = (weight * 0.04).toFixed(1); // e.g. 2.5L to 3.0L
    const pain = this.formData.painLevel;
    const isRestAdvised = pain >= 7 || this.formData.symptoms.includes('Chest Pain') || this.formData.symptoms.includes('Shortness of Breath');

    // 1. Personalized Daily Plan Container
    const dailyPlanBox = document.getElementById('dailyPlanContainer');
    if (dailyPlanBox) {
      dailyPlanBox.innerHTML = `
        <div class="result-card-item" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="clock" style="color: var(--amber-500); font-size: 1.5rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">Wake-up Time</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">Recommended: 6:30 AM (Consistent rhythm)</div>
            </div>
          </div>
          <span style="font-weight: 700; color: var(--primary-300);">6:30 AM</span>
        </div>

        <div class="result-card-item" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="moon" style="color: var(--indigo-500); font-size: 1.5rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">Sleep Duration</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">Target: 7.5 - 8.0 Hours uninterrupted</div>
            </div>
          </div>
          <span style="font-weight: 700; color: var(--primary-300);">7.5 Hrs</span>
        </div>

        <div class="result-card-item" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="droplets" style="color: var(--primary-400); font-size: 1.5rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">Daily Water Hydration</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">Based on weight (${weight}kg): ${waterTarget} Liters / day</div>
            </div>
          </div>
          <span style="font-weight: 700; color: var(--teal-400);">${waterTarget} L</span>
        </div>

        <div class="result-card-item" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="footprints" style="color: var(--emerald-500); font-size: 1.5rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">Daily Walking Goal</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">${isRestAdvised ? 'Light pacing only (2,000 steps)' : '4,000 - 6,000 steps daily'}</div>
            </div>
          </div>
          <span style="font-weight: 700; color: var(--emerald-500);">${isRestAdvised ? '2,000 Steps' : '6,000 Steps'}</span>
        </div>

        <div class="result-card-item" style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="eye" style="color: var(--teal-400); font-size: 1.5rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">Screen-time Break</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">20-20-20 rule every 45 minutes</div>
            </div>
          </div>
          <span style="font-weight: 700; color: var(--teal-300);">Every 45m</span>
        </div>
      `;
    }

    // 2. Nutrition Guidance Boxes
    const foodsInclude = document.getElementById('foodsToIncludeBox');
    if (foodsInclude) {
      foodsInclude.innerHTML = `
        <span class="food-pill">🍃 Leafy Spinach & Kale</span>
        <span class="food-pill">🫐 Antioxidant Berries</span>
        <span class="food-pill">🌾 Whole Grain Oats</span>
        <span class="food-pill">🥜 Almonds & Walnuts</span>
        <span class="food-pill">🐟 Lean Protein / Tofu</span>
        <span class="food-pill">🍋 Warm Lemon Hydration</span>
      `;
    }

    const foodsReduce = document.getElementById('foodsToReduceBox');
    if (foodsReduce) {
      foodsReduce.innerHTML = `
        <span class="food-pill food-pill-reduce">🍟 Deep-fried greasy snacks</span>
        <span class="food-pill food-pill-reduce">🍬 Refined white sugars</span>
        <span class="food-pill food-pill-reduce">🥤 Carbonated sodas</span>
        <span class="food-pill food-pill-reduce">🧂 High sodium canned food</span>
      `;
    }

    // 3. Activity Recommendations Container
    const activitiesBox = document.getElementById('activitiesContainer');
    if (activitiesBox) {
      if (isRestAdvised) {
        activitiesBox.innerHTML = `
          <div class="disclaimer-box" style="background: rgba(244, 63, 94, 0.15); border-color: var(--rose-500); color: #fda4af;">
            <i data-lucide="alert-octagon" style="color: var(--rose-500); font-size: 1.5rem; flex-shrink: 0;"></i>
            <div>
              <strong>Rest & Recovery Advisory:</strong> Based on your reported symptoms (${this.formData.symptoms.join(', ')}) and pain level (${pain}/10), heavy physical exercise is NOT recommended right now. Please rest and consult your physician before starting physical activity.
            </div>
          </div>

          <div class="result-card-item">
            <strong style="color: var(--teal-300);"><i data-lucide="wind"></i> Gentle Diaphragmatic Breathing</strong>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">Inhale slowly for 4s, hold for 4s, exhale for 6s to ease anxiety and muscle tension.</p>
          </div>
        `;
      } else {
        activitiesBox.innerHTML = `
          <div class="result-card-item">
            <strong style="color: var(--emerald-500);"><i data-lucide="footprints"></i> Light Walking (20-30 Mins)</strong>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">Low-impact brisk walk in outdoor greenery or well-ventilated space.</p>
          </div>
          <div class="result-card-item">
            <strong style="color: var(--primary-300);"><i data-lucide="sparkles"></i> Gentle Morning Yoga & Stretching</strong>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">Focus on spine flexibility, hamstring openers, and neck rotations.</p>
          </div>
          <div class="result-card-item">
            <strong style="color: var(--indigo-500);"><i data-lucide="wind"></i> Relaxation & Mindfulness (10 Mins)</strong>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">Calming box breathing prior to bedtime to improve restorative sleep quality.</p>
          </div>
        `;
      }
    }

    // 4. Weekly Goals Grid
    const goalsGrid = document.getElementById('weeklyGoalsGrid');
    if (goalsGrid) {
      goalsGrid.innerHTML = `
        <div class="preview-card">
          <div class="preview-icon"><i data-lucide="droplet"></i></div>
          <h4>Increase Water Consistency</h4>
          <p>Maintain daily target of ${waterTarget}L across all 7 days.</p>
        </div>
        <div class="preview-card">
          <div class="preview-icon" style="color: var(--teal-400); background: rgba(20,184,166,0.15);"><i data-lucide="moon"></i></div>
          <h4>Improve Sleep Regularity</h4>
          <p>Maintain fixed bed time before 10:30 PM for 5 consecutive days.</p>
        </div>
        <div class="preview-card">
          <div class="preview-icon" style="color: var(--amber-500); background: rgba(245,158,11,0.15);"><i data-lucide="heart"></i></div>
          <h4>Reduce Daily Stress</h4>
          <p>Complete 10 minutes of box breathing or guided meditation daily.</p>
        </div>
      `;
    }

    // 5. Render Habit Checklist Items
    this.updateHabitChecklistUI();

    if (window.lucide) window.lucide.createIcons();
  }

  updateHabitChecklistUI() {
    const checklistContainer = document.getElementById('habitChecklistContainer');
    if (!checklistContainer) return;

    checklistContainer.innerHTML = this.lifestyleHabits.map((habit, idx) => `
      <div class="habit-item ${habit.completed ? 'completed' : ''}" onclick="app.toggleHabit(${idx})">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''} onclick="event.stopPropagation(); app.toggleHabit(${idx});">
          <span class="habit-title" style="color: #fff; font-size: 0.95rem; font-weight: 500;">${habit.title}</span>
        </div>
        <i data-lucide="${habit.icon}" style="color: ${habit.completed ? 'var(--emerald-500)' : 'var(--text-muted)'}; font-size: 1.1rem;"></i>
      </div>
    `).join('');

    // Calculate Completion Metrics
    const completedCount = this.lifestyleHabits.filter(h => h.completed).length;
    const totalCount = this.lifestyleHabits.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    // Update Progress Counter & Bar
    const counterEl = document.getElementById('habitCompletionCounter');
    if (counterEl) counterEl.textContent = `${completedCount} / ${totalCount} Done`;

    const barEl = document.getElementById('habitProgressBar');
    if (barEl) barEl.style.width = `${percentage}%`;

    // Update Circular Progress Ring (circumference = 2 * PI * 58 = 364)
    const textEl = document.getElementById('circularProgressText');
    if (textEl) textEl.textContent = `${percentage}%`;

    const fillRing = document.getElementById('circularProgressFill');
    if (fillRing) {
      const offset = 364 - (364 * percentage / 100);
      fillRing.style.strokeDashoffset = offset;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  toggleHabit(index) {
    if (this.lifestyleHabits[index]) {
      this.lifestyleHabits[index].completed = !this.lifestyleHabits[index].completed;
      this.updateHabitChecklistUI();
    }
  }

  startQuoteRotation() {
    this.quoteTimer = setInterval(() => {
      this.quoteIndex = (this.quoteIndex + 1) % this.motivationalQuotes.length;
      const quoteEl = document.getElementById('motivationalQuoteText');
      if (quoteEl) {
        quoteEl.style.opacity = '0';
        setTimeout(() => {
          quoteEl.textContent = `"${this.motivationalQuotes[this.quoteIndex]}"`;
          quoteEl.style.opacity = '1';
        }, 300);
      }
    }, 4000);
  }

  /* --------------------------------------------------------------------------
     MULTILINGUAL AI & TANGLISH NLP ENGINE
     -------------------------------------------------------------------------- */
  startPlaceholderRotation() {
    const textarea = document.getElementById('healthProblemText');
    if (!textarea) return;

    this.placeholderTimer = setInterval(() => {
      if (document.activeElement !== textarea && !textarea.value.trim()) {
        this.placeholderIndex = (this.placeholderIndex + 1) % this.rotatingPlaceholders.length;
        textarea.placeholder = this.rotatingPlaceholders[this.placeholderIndex];
      }
    }, 2800);
  }

  onMultilingualInput(text) {
    this.formData.healthProblemText = text;
    const badge = document.getElementById('aiLanguageBadge');
    const langTag = document.getElementById('aiLangTag');
    const summarySpan = document.getElementById('aiParsedSummary');

    if (!text.trim()) {
      if (badge) badge.style.display = 'none';
      return;
    }

    const nlpResult = this.parseMultilingualAi(text);

    if (badge) badge.style.display = 'flex';
    if (langTag) langTag.textContent = nlpResult.detectedLanguage;
    if (summarySpan) {
      summarySpan.innerHTML = `<i data-lucide="brain"></i> Extracted: <strong>${nlpResult.symptoms.join(', ') || 'General Symptoms'}</strong> (Region: ${nlpResult.bodyRegion}, Severity: ${nlpResult.painLevel}/10)`;
    }

    // Auto-update internal formData state
    if (nlpResult.symptoms.length > 0) {
      this.formData.symptoms = nlpResult.symptoms;
      this.renderSymptomsGrid();
    }
    if (nlpResult.bodyRegion) {
      this.formData.bodyRegion = nlpResult.bodyRegion;
      this.renderBodyRegionsGrid();
    }
    if (nlpResult.painLevel) {
      this.updatePainLevel(nlpResult.painLevel);
      const painRange = document.getElementById('painRange');
      if (painRange) painRange.value = nlpResult.painLevel;
    }
    if (nlpResult.painDuration) {
      this.formData.painDuration = nlpResult.painDuration;
      const durationSelect = document.getElementById('painDuration');
      if (durationSelect) durationSelect.value = nlpResult.painDuration;
    }

    // Automatically update AI Lifestyle Coach whenever health input changes!
    this.renderLifestyleCoach();

    if (window.lucide) window.lucide.createIcons();
  }

  parseMultilingualAi(text) {
    const raw = text.toLowerCase().trim();

    let detectedLanguage = "English";
    let symptoms = [];
    let bodyRegion = "Chest";
    let painLevel = 5;
    let painDuration = "2 Days";

    // 1. Language Detection Engine
    const isTamilScript = /[\u0B80-\u0BFF]/.test(text);
    const isHindiScript = /[\u0900-\u097F]/.test(text);
    const isTeluguScript = /[\u0C00-\u0C7F]/.test(text);
    const isMalayalamScript = /[\u0D00-\u0D7F]/.test(text);
    const isArabicScript = /[\u0600-\u06FF]/.test(text);

    const tanglishKeywords = ['enaku', 'rendu', 'naala', 'valikuthu', 'iruku', 'thalai', 'vayiru', 'moochu', 'marbu', 'kaachal', 'kashtama', 'romba', 'kaaikal', 'irukku'];
    const hinglishKeywords = ['mujhe', 'saans', 'dikkat', 'ho rahi', 'sir dard', 'bukhar', 'pet', 'dard', 'se'];

    if (isTamilScript) {
      detectedLanguage = "Tamil (தமிழ்)";
    } else if (isHindiScript) {
      detectedLanguage = "Hindi (हिंदी)";
    } else if (isTeluguScript) {
      detectedLanguage = "Telugu (తెలుగు)";
    } else if (isMalayalamScript) {
      detectedLanguage = "Malayalam (മലയാളം)";
    } else if (isArabicScript) {
      detectedLanguage = "Arabic (العربية)";
    } else if (tanglishKeywords.some(kw => raw.includes(kw))) {
      detectedLanguage = "Tanglish (Tamil + English)";
    } else if (hinglishKeywords.some(kw => raw.includes(kw))) {
      detectedLanguage = "Hinglish (Hindi + English)";
    } else {
      detectedLanguage = "Multilingual AI (Detected)";
    }

    // 2. Symptom & Anatomical Entity Extraction
    if (raw.includes('chest') || raw.includes('marbu') || raw.includes('moochu') || raw.includes('saans') || raw.includes('chati') || raw.includes('heart') || raw.includes('மார்பு')) {
      symptoms.push('Chest Pain', 'Shortness of Breath');
      bodyRegion = 'Chest';
      painLevel = 7;
    }

    if (raw.includes('vayiru') || raw.includes('stomach') || raw.includes('pet') || raw.includes('gastric') || raw.includes('വയറു')) {
      symptoms.push('Stomach Pain', 'Vomiting');
      bodyRegion = 'Stomach';
      painLevel = 6;
    }

    if (raw.includes('thalai') || raw.includes('head') || raw.includes('sir dard') || raw.includes('headache') || raw.includes('தலை')) {
      symptoms.push('Headache', 'Dizziness');
      bodyRegion = 'Head';
      painLevel = 6;
    }

    if (raw.includes('fever') || raw.includes('kaachal') || raw.includes('bukhar') || raw.includes('cough') || raw.includes('காய்ச்சல்')) {
      symptoms.push('Fever', 'Cough', 'Fatigue');
      painLevel = 5;
    }

    if (raw.includes('knee') || raw.includes('joint') || raw.includes('kal') || raw.includes('kaaikal') || raw.includes('walk') || raw.includes('முழங்கால்')) {
      symptoms.push('Knee Pain', 'Joint Pain');
      bodyRegion = 'Knee';
      painLevel = 6;
    }

    if (raw.includes('rendu naala') || raw.includes('2 days') || raw.includes('do din')) {
      painDuration = '2 Days';
    } else if (raw.includes('1 week') || raw.includes('oru vaaram')) {
      painDuration = '1 Week';
    } else if (raw.includes('today') || raw.includes('iniku')) {
      painDuration = 'Today';
    }

    if (raw.includes('romba') || raw.includes('severe') || raw.includes('extreme')) {
      painLevel = Math.min(10, painLevel + 2);
    }

    if (symptoms.length === 0) {
      symptoms = ['Fever', 'Cough'];
    }

    return {
      detectedLanguage,
      symptoms: [...new Set(symptoms)],
      bodyRegion,
      painLevel,
      painDuration
    };
  }

  /* --------------------------------------------------------------------------
     VOICE SPEECH-TO-TEXT SUPPORT
     -------------------------------------------------------------------------- */
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        const textarea = document.getElementById('healthProblemText');
        if (textarea) {
          textarea.value = transcript;
          this.onMultilingualInput(transcript);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        const micBtn = document.getElementById('micBtn');
        if (micBtn) micBtn.classList.remove('listening');
      };
    }
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("Voice speech recognition active! Type or speak symptoms naturally.");
      return;
    }

    const micBtn = document.getElementById('micBtn');
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
    } else {
      try {
        this.recognition.start();
        this.isListening = true;
        if (micBtn) micBtn.classList.add('listening');
      } catch (e) {
        console.log("Speech recognition error:", e);
      }
    }
  }

  /* --------------------------------------------------------------------------
     VIEW ROUTING & NAVIGATION
     -------------------------------------------------------------------------- */
  switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.add('active');
      this.activeView = viewId;
    }

    // Update Top Role Switcher Nav Buttons
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    if (viewId === 'landing' || viewId === 'intake') {
      document.getElementById('navIntakeBtn')?.classList.add('active');
    } else if (viewId === 'lifestyle-coach') {
      document.getElementById('navCoachBtn')?.classList.add('active');
      this.renderLifestyleCoach();
    } else if (viewId === 'patient-dashboard') {
      document.getElementById('navPatientBtn')?.classList.add('active');
      this.renderPatientDashboard();
    } else if (viewId === 'doctor-dashboard') {
      document.getElementById('navDoctorBtn')?.classList.add('active');
      this.renderDoctorDashboard();
    } else if (viewId === 'admin-dashboard') {
      document.getElementById('navAdminBtn')?.classList.add('active');
      this.renderAdminDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startAssessment() {
    this.currentStep = 1;
    this.switchView('intake');
    this.showStep(1);
  }

  /* --------------------------------------------------------------------------
     HEALTH INTAKE WIZARD LOGIC
     -------------------------------------------------------------------------- */
  showStep(stepNumber) {
    this.currentStep = stepNumber;
    
    document.querySelectorAll('.wizard-step').forEach(stepEl => {
      stepEl.style.display = 'none';
    });

    const activeStepEl = document.getElementById(`step-${stepNumber}`);
    if (activeStepEl) {
      activeStepEl.style.display = 'block';
    }

    this.updateWizardProgress();

    // Controls visibility
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.style.visibility = stepNumber === 1 ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (stepNumber === 5) {
        nextBtn.innerHTML = `Run AI Analysis <i data-lucide="brain-circuit"></i>`;
      } else if (stepNumber === 6) {
        nextBtn.innerHTML = `Proceed to Solution <i data-lucide="arrow-right"></i>`;
      } else {
        nextBtn.innerHTML = `Next Step <i data-lucide="arrow-right"></i>`;
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  updateWizardProgress() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    for (let i = 1; i <= this.totalSteps; i++) {
      const indicator = document.getElementById(`stepIndicator-${i}`);
      if (indicator) {
        indicator.classList.remove('active', 'completed');
        if (i === this.currentStep) {
          indicator.classList.add('active');
        } else if (i < this.currentStep) {
          indicator.classList.add('completed');
        }
      }
    }
  }

  nextStep() {
    this.collectFormData();

    if (this.currentStep === 1) {
      if (!this.formData.fullName || !this.formData.mobile) {
        alert("Please provide at least your Full Name and Mobile Number to continue.");
        return;
      }
    } else if (this.currentStep === 2) {
      if (!this.formData.healthProblemText.trim()) {
        alert("Please describe your health concern or click a sample prompt.");
        return;
      }
      this.onMultilingualInput(this.formData.healthProblemText);
    } else if (this.currentStep === 5) {
      this.runAiPreliminaryAnalysis();
    } else if (this.currentStep === 6) {
      this.triggerDepartmentRedirection();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.showStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.showStep(this.currentStep - 1);
    }
  }

  collectFormData() {
    this.formData.fullName = document.getElementById('fullName')?.value || this.formData.fullName;
    this.formData.age = parseInt(document.getElementById('age')?.value) || 30;
    this.formData.gender = document.getElementById('gender')?.value || 'Female';
    this.formData.mobile = document.getElementById('mobile')?.value || '';
    this.formData.email = document.getElementById('email')?.value || '';
    this.formData.address = document.getElementById('address')?.value || '';
    this.formData.bloodGroup = document.getElementById('bloodGroup')?.value || 'O+';
    this.formData.height = parseInt(document.getElementById('height')?.value) || 170;
    this.formData.weight = parseInt(document.getElementById('weight')?.value) || 65;
    this.formData.medicalConditions = document.getElementById('medicalConditions')?.value || '';
    this.formData.allergies = document.getElementById('allergies')?.value || '';
    this.formData.medications = document.getElementById('medications')?.value || '';
    this.formData.emergencyContact = document.getElementById('emergencyContact')?.value || '';
    this.formData.healthProblemText = document.getElementById('healthProblemText')?.value || '';
    this.formData.painDuration = document.getElementById('painDuration')?.value || 'Today';

    this.renderLifestyleCoach();
  }

  setQuickPrompt(promptText) {
    const textarea = document.getElementById('healthProblemText');
    if (textarea) {
      textarea.value = promptText;
      this.onMultilingualInput(promptText);
    }
  }

  /* --------------------------------------------------------------------------
     SYMPTOMS & BODY REGIONS RENDERERS
     -------------------------------------------------------------------------- */
  renderSymptomsGrid() {
    const grid = document.getElementById('symptomsGrid');
    if (!grid) return;

    grid.innerHTML = this.allSymptoms.map(symptom => {
      const isSelected = this.formData.symptoms.includes(symptom);
      return `
        <div class="symptom-chip ${isSelected ? 'selected' : ''}" onclick="app.toggleSymptom('${symptom}', this)">
          <span>${symptom}</span>
          <i data-lucide="check" class="chip-check"></i>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleSymptom(symptomName, element) {
    const index = this.formData.symptoms.indexOf(symptomName);
    if (index > -1) {
      this.formData.symptoms.splice(index, 1);
      element.classList.remove('selected');
    } else {
      this.formData.symptoms.push(symptomName);
      element.classList.add('selected');
    }
    this.renderLifestyleCoach();
  }

  filterSymptoms() {
    const query = document.getElementById('symptomSearch')?.value.toLowerCase() || '';
    document.querySelectorAll('.symptom-chip').forEach(chip => {
      const text = chip.textContent.toLowerCase();
      chip.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }

  renderBodyRegionsGrid() {
    const grid = document.getElementById('bodyRegionsGrid');
    if (!grid) return;

    grid.innerHTML = this.bodyRegions.map(region => {
      const isSelected = this.formData.bodyRegion === region.id;
      return `
        <div class="body-region-card ${isSelected ? 'selected' : ''}" onclick="app.selectBodyRegion('${region.id}', this)">
          <span class="body-region-icon">${region.icon}</span>
          <span style="font-weight: 600; font-size: 0.9rem;">${region.label}</span>
        </div>
      `;
    }).join('');
  }

  selectBodyRegion(regionId, cardElement) {
    this.formData.bodyRegion = regionId;
    document.querySelectorAll('.body-region-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
    this.renderLifestyleCoach();
  }

  updatePainLevel(val) {
    this.formData.painLevel = parseInt(val);
    const badge = document.getElementById('painBadge');
    if (badge) {
      badge.textContent = `Level ${val} / 10`;
      if (val <= 3) {
        badge.style.background = 'var(--emerald-500)';
      } else if (val <= 6) {
        badge.style.background = 'var(--amber-500)';
      } else {
        badge.style.background = 'var(--rose-500)';
      }
    }
    this.renderLifestyleCoach();
  }

  /* --------------------------------------------------------------------------
     IMAGE UPLOAD SELECTION & DROPOUT
     -------------------------------------------------------------------------- */
  selectReportType(type, buttonElement) {
    document.querySelectorAll('.report-type-btn').forEach(btn => btn.classList.remove('selected'));
    buttonElement.classList.add('selected');

    this.formData.reportType = type;
    const dropzoneSection = document.getElementById('uploadDropzoneSection');
    const noUploadMessage = document.getElementById('noUploadMessage');

    if (type === 'No') {
      this.formData.hasReport = false;
      if (dropzoneSection) dropzoneSection.style.display = 'none';
      if (noUploadMessage) noUploadMessage.style.display = 'flex';
    } else {
      this.formData.hasReport = true;
      if (dropzoneSection) dropzoneSection.style.display = 'block';
      if (noUploadMessage) noUploadMessage.style.display = 'none';

      if (type === 'MRI') {
        this.formData.uploadedFile.url = 'assets/mri_knee.jpg';
        this.formData.uploadedFile.name = 'Knee_MRI_Scan.dcm';
      } else {
        this.formData.uploadedFile.url = 'assets/xray_chest.jpg';
        this.formData.uploadedFile.name = 'Chest_Radiograph_PA.jpg';
      }
    }
  }

  handleFileUpload(files) {
    if (!files || files.length === 0) return;
    const file = files[0];
    this.formData.uploadedFile = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: URL.createObjectURL(file)
    };

    const statusBox = document.getElementById('fileUploadStatus');
    const fileNameEl = document.getElementById('uploadedFileName');
    const fileSizeEl = document.getElementById('uploadedFileSize');

    if (statusBox) statusBox.style.display = 'block';
    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = `${this.formData.uploadedFile.size} • DICOM Verified`;
  }

  removeUploadedFile() {
    this.formData.uploadedFile = null;
    const statusBox = document.getElementById('fileUploadStatus');
    if (statusBox) statusBox.style.display = 'none';
  }

  /* --------------------------------------------------------------------------
     AI TRIAGE & ANALYSIS ENGINE
     -------------------------------------------------------------------------- */
  runAiPreliminaryAnalysis() {
    const text = (this.formData.healthProblemText + ' ' + this.formData.symptoms.join(' ')).toLowerCase();
    const pain = this.formData.painLevel;

    let department = "General Medicine";
    let doctorType = "General Practitioner";
    let urgency = "Medium";
    let urgencyClass = "urgency-medium";
    let possibleConditions = [];
    let tests = [];
    let selfCare = [];
    let deptIcon = "activity";

    if (text.includes('chest') || text.includes('marbu') || text.includes('moochu') || text.includes('saans') || text.includes('chati') || text.includes('heart') || this.formData.bodyRegion === 'Chest') {
      department = "Cardiology";
      doctorType = "Interventional Cardiologist";
      deptIcon = "heart-pulse";
      tests = ["12-Lead ECG", "Chest Radiograph (X-Ray)", "Troponin Blood Test", "Echocardiogram"];
      possibleConditions = [
        { name: "Angina Pectoris / Acute Coronary Syndrome", confidence: "78%" },
        { name: "Costochondritis / Musculoskeletal Pain", confidence: "15%" },
        { name: "Gastroesophageal Reflux", confidence: "7%" }
      ];
      selfCare = [
        "Rest in an upright comfortable position",
        "Avoid strenuous physical exertional activities",
        "Keep emergency medication (e.g. Nitroglycerin) accessible if prescribed",
        "Seek immediate emergency care if pain radiates to left arm or jaw"
      ];
      urgency = pain >= 7 ? "Emergency" : "High";
      urgencyClass = pain >= 7 ? "urgency-emergency" : "urgency-high";
    } else if (text.includes('knee') || text.includes('joint') || text.includes('kal') || text.includes('kaaikal') || text.includes('walk') || this.formData.bodyRegion === 'Knee' || this.formData.bodyRegion === 'Leg') {
      department = "Orthopedics";
      doctorType = "Orthopedic Surgeon / Rheumatologist";
      deptIcon = "bone";
      tests = ["Knee Joint X-Ray (Weight Bearing)", "MRI Knee Joint", "Inflammatory Marker Panel (ESR/CRP)"];
      possibleConditions = [
        { name: "Patellofemoral Ligament Strain / Meniscal Tear", confidence: "72%" },
        { name: "Knee Osteoarthritis", confidence: "20%" },
        { name: "Joint Effusion / Bursitis", confidence: "8%" }
      ];
      selfCare = [
        "Apply RICE protocol (Rest, Ice, Compression, Elevation)",
        "Use supportive knee braces during short walks",
        "Avoid deep squatting or climbing stairs unnecessarily"
      ];
      urgency = pain >= 8 ? "High" : "Medium";
      urgencyClass = pain >= 8 ? "urgency-high" : "urgency-medium";
    } else if (text.includes('headache') || text.includes('thalai') || text.includes('head') || text.includes('sir dard') || text.includes('dizziness') || this.formData.bodyRegion === 'Head') {
      department = "Neurology";
      doctorType = "Neurologist";
      deptIcon = "brain";
      tests = ["Brain CT / MRI Scan", "Neurological Reflex Assessment", "Blood Pressure Monitoring"];
      possibleConditions = [
        { name: "Migraine with Aura / Tension Headache", confidence: "81%" },
        { name: "Cervicogenic Headache", confidence: "12%" },
        { name: "Transient Ischemic Symptoms", confidence: "7%" }
      ];
      selfCare = [
        "Rest in a quiet, dark, well-ventilated room",
        "Maintain adequate hydration with water & electrolytes",
        "Avoid prolonged screen time or bright flashing lights"
      ];
      urgency = pain >= 8 ? "Emergency" : "Medium";
      urgencyClass = pain >= 8 ? "urgency-emergency" : "urgency-medium";
    } else if (text.includes('rash') || text.includes('skin') || text.includes('itching')) {
      department = "Dermatology";
      doctorType = "Dermatologist";
      deptIcon = "sparkles";
      tests = ["Dermoscopy Examination", "Skin Biopsy / Allergen Panel"];
      possibleConditions = [
        { name: "Contact Dermatitis / Urticaria", confidence: "85%" },
        { name: "Eczema Flare-up", confidence: "15%" }
      ];
      selfCare = [
        "Avoid scratching the affected skin areas",
        "Apply mild hypoallergenic moisturizer",
        "Take non-drowsy oral antihistamines if advised"
      ];
      urgency = "Low";
      urgencyClass = "urgency-low";
    } else if (text.includes('stomach') || text.includes('vayiru') || text.includes('pet') || text.includes('vomit') || this.formData.bodyRegion === 'Stomach') {
      department = "Gastroenterology";
      doctorType = "Gastroenterologist";
      deptIcon = "utensils";
      tests = ["Abdominal Ultrasound", "Complete Blood Count & Electrolyte Panel", "Endoscopy if indicated"];
      possibleConditions = [
        { name: "Acute Gastritis / Peptic Ulcer", confidence: "75%" },
        { name: "Gastroenteritis", confidence: "25%" }
      ];
      selfCare = [
        "Sip oral rehydration solution (ORS) frequently",
        "Eat bland foods (BRAT diet: Banana, Rice, Applesauce, Toast)",
        "Avoid spicy, greasy, or acidic meals"
      ];
      urgency = pain >= 7 ? "High" : "Medium";
      urgencyClass = pain >= 7 ? "urgency-high" : "urgency-medium";
    } else {
      possibleConditions = [
        { name: "General Systemic Inflammatory Response", confidence: "65%" },
        { name: "Viral Upper Respiratory Infection", confidence: "35%" }
      ];
      tests = ["Complete Blood Count (CBC)", "Basic Metabolic Panel"];
      selfCare = ["Ensure adequate bed rest", "Stay hydrated and monitor temperature"];
    }

    this.aiAnalysisResult = {
      department,
      doctorType,
      urgency,
      urgencyClass,
      deptIcon,
      possibleConditions,
      tests,
      selfCare
    };

    // Render Step 6 Content
    const container = document.getElementById('aiResultsContent');
    if (container) {
      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <div>
            <h3 style="color: #fff; font-size: 1.35rem;">AI Clinical Synthesis</h3>
            <span style="color: var(--text-muted); font-size: 0.85rem;">Patient: ${this.formData.fullName} (${this.formData.age} y/o ${this.formData.gender})</span>
          </div>
          <span class="urgency-badge ${urgencyClass}">${urgency} Priority</span>
        </div>

        <div class="ai-result-grid">
          <div class="result-card-item">
            <h4 style="color: var(--primary-300); margin-bottom: 0.5rem;"><i data-lucide="file-text"></i> Intake Summary</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5;">
              "${this.formData.healthProblemText}"<br>
              <strong>Pain Region:</strong> ${this.formData.bodyRegion} (${this.formData.painLevel}/10)<br>
              <strong>Duration:</strong> ${this.formData.painDuration}
            </p>
          </div>

          <div class="result-card-item">
            <h4 style="color: var(--teal-300); margin-bottom: 0.5rem;"><i data-lucide="activity"></i> Possible Conditions</h4>
            <ul style="color: #fff; font-size: 0.9rem; padding-left: 1.25rem; line-height: 1.6;">
              ${possibleConditions.map(c => `<li><strong>${c.name}</strong> <span style="color: var(--teal-400);">(${c.confidence})</span></li>`).join('')}
            </ul>
          </div>

          <div class="result-card-item">
            <h4 style="color: var(--amber-500); margin-bottom: 0.5rem;"><i data-lucide="stethoscope"></i> Recommended Department</h4>
            <p style="color: #fff; font-weight: 700; font-size: 1.1rem;">${department}</p>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Specialist: ${doctorType}</p>
          </div>
        </div>

        <div class="disclaimer-box">
          <i data-lucide="shield-alert"></i> 
          <span><strong>Medical Disclaimer:</strong> This AI preliminary assessment is generated for guidance & triage sorting only and is NOT a confirmed medical diagnosis. Always consult a licensed healthcare physician.</span>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();
    }
  }

  /* --------------------------------------------------------------------------
     AUTOMATIC REDIRECTION & SOLUTION PAGE
     -------------------------------------------------------------------------- */
  triggerDepartmentRedirection() {
    this.switchView('redirecting');

    const subtext = document.getElementById('redirectSubtext');
    if (subtext) {
      subtext.textContent = `Directing ${this.formData.fullName} to the ${this.aiAnalysisResult.department} Department Triage Hub...`;
    }

    setTimeout(() => {
      this.renderSolutionPage();
      this.switchView('solution');
    }, 1600);
  }

  renderSolutionPage() {
    const res = this.aiAnalysisResult;
    if (!res) return;

    document.getElementById('solDeptName').textContent = `${res.department} Department`;
    document.getElementById('solDeptDesc').textContent = `Recommended based on reported ${this.formData.bodyRegion.toLowerCase()} discomfort and symptom matching.`;
    
    const badge = document.getElementById('solPriorityBadge');
    if (badge) {
      badge.textContent = `${res.urgency} Priority`;
      badge.className = `urgency-badge ${res.urgencyClass}`;
    }

    document.getElementById('solDoctorType').textContent = res.doctorType;
    document.getElementById('solRecommendedTests').textContent = `Suggested Diagnostics: ${res.tests.join(', ')}`;

    document.getElementById('solPatientSummary').innerHTML = `
      <strong>Patient:</strong> ${this.formData.fullName} (${this.formData.age} y/o)<br>
      <strong>Chief Complaint:</strong> ${this.formData.healthProblemText}<br>
      <strong>Pain Scale:</strong> ${this.formData.painLevel}/10 (${this.formData.bodyRegion})<br>
      <strong>Uploaded Report:</strong> ${this.formData.hasReport ? this.formData.reportType : 'None'}
    `;

    const selfCareList = document.getElementById('solSelfCareList');
    if (selfCareList) {
      selfCareList.innerHTML = res.selfCare.map(tip => `<li>${tip}</li>`).join('');
    }
  }

  proceedToRegistration() {
    this.patientId = `SM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    document.getElementById('regPatientId').textContent = this.patientId;
    document.getElementById('regPatientName').textContent = this.formData.fullName;
    document.getElementById('regDeptName').textContent = this.aiAnalysisResult?.department || 'Cardiology';

    this.switchView('registration');
  }

  /* --------------------------------------------------------------------------
     PATIENT DASHBOARD RENDERER
     -------------------------------------------------------------------------- */
  renderPatientDashboard() {
    document.getElementById('patMetricsId').textContent = this.patientId;
    document.getElementById('patScansCount').textContent = this.formData.hasReport ? '1 DICOM Scan' : '0 Scans';

    const healthSummaryBox = document.getElementById('patientHealthSummaryBox');
    if (healthSummaryBox) {
      healthSummaryBox.innerHTML = `
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: #fff;">Name:</strong> ${this.formData.fullName} (${this.formData.age} y/o ${this.formData.gender})
        </div>
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: #fff;">Blood Group:</strong> <span style="color: var(--teal-400);">${this.formData.bloodGroup}</span> | <strong>Height/Weight:</strong> ${this.formData.height}cm / ${this.formData.weight}kg
        </div>
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: #fff;">Existing Conditions:</strong> ${this.formData.medicalConditions || 'None reported'}
        </div>
        <div>
          <strong style="color: #fff;">Allergies:</strong> <span style="color: var(--rose-500);">${this.formData.allergies || 'None'}</span>
        </div>
      `;
    }

    const scansListBox = document.getElementById('patientScansListBox');
    if (scansListBox) {
      scansListBox.innerHTML = this.formData.hasReport ? `
        <div class="result-card-item" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="file-digit" style="color: var(--primary-400); font-size: 1.75rem;"></i>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">${this.formData.uploadedFile?.name || 'Chest_XRay.dcm'}</strong>
              <div style="color: var(--text-muted); font-size: 0.8rem;">Uploaded Aug 7, 2026 • ${this.formData.reportType}</div>
            </div>
          </div>
          <button class="btn-secondary-glass" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="app.switchView('doctor-dashboard')">
            View Scan
          </button>
        </div>
      ` : `
        <div style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1.5rem;">
          No medical scans uploaded yet.
        </div>
      `;
    }

    const doctorNotesBox = document.getElementById('patientDoctorNotesBox');
    if (doctorNotesBox) {
      doctorNotesBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <strong style="color: var(--teal-300); font-size: 1rem;">Dr. Robert Vance, MD (Cardiology)</strong>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Aug 7, 2026 10:45 AM</span>
        </div>
        <p style="color: #fff; font-size: 0.95rem; line-height: 1.6;">
          "${this.doctorNotes}"
        </p>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     DOCTOR DASHBOARD & DICOM CANVAS WORKSTATION
     -------------------------------------------------------------------------- */
  renderDoctorDashboard() {
    const queueList = document.getElementById('doctorQueueList');
    if (queueList) {
      queueList.innerHTML = `
        <div class="result-card-item" style="border-left: 3px solid var(--primary-400); cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #fff; font-size: 0.95rem;">${this.formData.fullName}</strong>
            <span class="urgency-badge ${this.aiAnalysisResult?.urgencyClass || 'urgency-high'}" style="font-size: 0.7rem;">${this.aiAnalysisResult?.urgency || 'High'}</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem;">
            ${this.formData.bodyRegion} Pain (${this.formData.painLevel}/10) • ${this.formData.reportType}
          </div>
        </div>

        <div class="result-card-item" style="opacity: 0.75; cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #fff; font-size: 0.95rem;">Marcus Brody</strong>
            <span class="urgency-badge urgency-medium" style="font-size: 0.7rem;">Medium</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem;">
            Knee Stiffness • MRI Scan
          </div>
        </div>

        <div class="result-card-item" style="opacity: 0.75; cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #fff; font-size: 0.95rem;">Elena Rostova</strong>
            <span class="urgency-badge urgency-emergency" style="font-size: 0.7rem;">Emergency</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem;">
            Severe Migraine • Brain CT
          </div>
        </div>
      `;
    }

    const docInput = document.getElementById('docDiagnosisInput');
    if (docInput) {
      docInput.value = this.doctorNotes;
    }

    this.redrawCanvas();
  }

  initDicomCanvas() {
    this.canvas = document.getElementById('dicomCanvas');
    this.compareCanvas = document.getElementById('compareCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.compareCtx = this.compareCanvas ? this.compareCanvas.getContext('2d') : null;

    this.scanImage = new Image();
    this.scanImage.src = this.canvasState.currentImageSrc;
    this.scanImage.onload = () => this.redrawCanvas();

    this.compareImage = new Image();
    this.compareImage.src = this.canvasState.compareImageSrc;
    this.compareImage.onload = () => this.redrawCanvas();
  }

  redrawCanvas() {
    if (!this.canvas || !this.ctx || !this.scanImage.complete) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    // Clear main canvas
    this.ctx.save();
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, w, h);

    // Apply Filter & Transforms
    let filterStr = `brightness(${this.canvasState.brightness}%) contrast(${this.canvasState.contrast}%)`;
    if (this.canvasState.invert) {
      filterStr += ` invert(100%)`;
    }
    this.ctx.filter = filterStr;

    this.ctx.translate(w / 2, h / 2);
    this.ctx.rotate((this.canvasState.rotation * Math.PI) / 180);
    this.ctx.scale(this.canvasState.zoom, this.canvasState.zoom);

    // Draw main image centered
    const imgRatio = this.scanImage.width / this.scanImage.height;
    let drawW = w;
    let drawH = w / imgRatio;
    if (drawH > h) {
      drawH = h;
      drawW = h * imgRatio;
    }

    this.ctx.drawImage(this.scanImage, -drawW / 2, -drawH / 2, drawW, drawH);
    this.ctx.restore();

    // Render Compare Canvas if enabled
    if (this.canvasState.compareMode && this.compareCanvas && this.compareCtx) {
      const cw = this.compareCanvas.width;
      const ch = this.compareCanvas.height;

      this.compareCtx.save();
      this.compareCtx.fillStyle = '#000000';
      this.compareCtx.fillRect(0, 0, cw, ch);
      this.compareCtx.filter = filterStr;
      this.compareCtx.translate(cw / 2, ch / 2);
      this.compareCtx.rotate((this.canvasState.rotation * Math.PI) / 180);
      this.compareCtx.scale(this.canvasState.zoom, this.canvasState.zoom);

      const cRatio = this.compareImage.width / this.compareImage.height;
      let cW = cw;
      let cH = cw / cRatio;
      if (cH > ch) {
        cH = ch;
        cW = ch * cRatio;
      }

      this.compareCtx.drawImage(this.compareImage, -cW / 2, -cH / 2, cW, cH);
      this.compareCtx.restore();
    }
  }

  adjustZoom(factor) {
    this.canvasState.zoom = Math.min(Math.max(this.canvasState.zoom * factor, 0.5), 4.0);
    this.redrawCanvas();
  }

  rotateScan() {
    this.canvasState.rotation = (this.canvasState.rotation + 90) % 360;
    this.redrawCanvas();
  }

  updateBrightness(val) {
    this.canvasState.brightness = val;
    this.redrawCanvas();
  }

  updateContrast(val) {
    this.canvasState.contrast = val;
    this.redrawCanvas();
  }

  toggleInvert() {
    this.canvasState.invert = !this.canvasState.invert;
    this.redrawCanvas();
  }

  toggleCompareMode() {
    this.canvasState.compareMode = !this.canvasState.compareMode;
    const btn = document.getElementById('compareModeBtn');
    const compareCanvas = document.getElementById('compareCanvas');

    if (btn) btn.classList.toggle('active', this.canvasState.compareMode);
    if (compareCanvas) compareCanvas.style.display = this.canvasState.compareMode ? 'block' : 'none';

    this.redrawCanvas();
  }

  resetScanCanvas() {
    this.canvasState.zoom = 1.0;
    this.canvasState.rotation = 0;
    this.canvasState.brightness = 100;
    this.canvasState.contrast = 100;
    this.canvasState.invert = false;
    this.redrawCanvas();
  }

  saveDoctorDiagnosis() {
    const input = document.getElementById('docDiagnosisInput');
    if (input) {
      this.doctorNotes = input.value;
      alert("Doctor findings updated and synced to Patient Dashboard!");
      this.switchView('patient-dashboard');
    }
  }

  /* --------------------------------------------------------------------------
     ADMIN DASHBOARD & CHARTS
     -------------------------------------------------------------------------- */
  renderAdminDashboard() {
    const tbody = document.getElementById('adminTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td><span style="font-family: monospace; color: var(--primary-300);">${this.patientId}</span></td>
          <td><strong>${this.formData.fullName}</strong></td>
          <td>${this.aiAnalysisResult?.department || 'Cardiology'}</td>
          <td>${this.formData.healthProblemText.substring(0, 35)}...</td>
          <td><span class="urgency-badge ${this.aiAnalysisResult?.urgencyClass || 'urgency-high'}">${this.aiAnalysisResult?.urgency || 'High'}</span></td>
          <td><span style="color: var(--teal-400); font-weight: 600;">Doctor Reviewed</span></td>
        </tr>
        <tr>
          <td><span style="font-family: monospace; color: var(--primary-300);">SM-2026-1049</span></td>
          <td><strong>Marcus Brody</strong></td>
          <td>Orthopedics</td>
          <td>Knee hurts while walking...</td>
          <td><span class="urgency-badge urgency-medium">Medium</span></td>
          <td><span style="color: var(--amber-500); font-weight: 600;">Pending Scan</span></td>
        </tr>
        <tr>
          <td><span style="font-family: monospace; color: var(--primary-300);">SM-2026-9812</span></td>
          <td><strong>Elena Rostova</strong></td>
          <td>Neurology</td>
          <td>Throbbing headache & blurry vision...</td>
          <td><span class="urgency-badge urgency-emergency">Emergency</span></td>
          <td><span style="color: var(--rose-500); font-weight: 600;">In ER Consult</span></td>
        </tr>
        <tr>
          <td><span style="font-family: monospace; color: var(--primary-300);">SM-2026-4402</span></td>
          <td><strong>David Miller</strong></td>
          <td>Pulmonology</td>
          <td>Shortness of breath & dry cough...</td>
          <td><span class="urgency-badge urgency-high">High</span></td>
          <td><span style="color: var(--emerald-500); font-weight: 600;">Completed</span></td>
        </tr>
      `;
    }
  }

  initCharts() {
    const deptCanvas = document.getElementById('deptChart');
    if (deptCanvas && window.Chart) {
      new Chart(deptCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Cardiology', 'Orthopedics', 'Neurology', 'Pulmonology', 'Gastroenterology', 'Dermatology'],
          datasets: [{
            label: 'Patient Count',
            data: [340, 210, 180, 145, 120, 95],
            backgroundColor: 'rgba(14, 165, 233, 0.7)',
            borderColor: '#0ea5e9',
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
          }
        }
      });
    }

    const urgencyCanvas = document.getElementById('urgencyChart');
    if (urgencyCanvas && window.Chart) {
      new Chart(urgencyCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Emergency', 'High', 'Medium', 'Low'],
          datasets: [{
            data: [12, 38, 42, 8],
            backgroundColor: ['#f43f5e', '#f59e0b', '#0ea5e9', '#10b981'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: '#f8fafc', font: { family: 'Plus Jakarta Sans' } } }
          }
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     EMERGENCY & DOWNLOAD HELPERS
     -------------------------------------------------------------------------- */
  openEmergencyModal() {
    document.getElementById('emergencyModal')?.classList.add('active');
  }

  closeEmergencyModal() {
    document.getElementById('emergencyModal')?.classList.remove('active');
  }

  downloadSummaryPDF() {
    window.print();
  }
}

// Global instance handle
const app = new SmartMedicalApp();

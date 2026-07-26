// State data CV
let cvLanguage = "en"; // 'en' or 'id'
let cvFont = "Arial"; // 'Arial', 'Calibri', 'Times New Roman', etc.
const translations = {
  en: {
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    profile: "Profile",
    contact: "Contact",
    hardSkills: "Hard Skills",
    softSkills: "Soft Skills",
    thesis: "Thesis/Final Project",
    emptyExp: "No experience details yet.",
    emptyEdu: "No education details yet.",
    emptySkills: "No skills listed yet."
  },
  id: {
    experience: "Pengalaman Kerja",
    education: "Pendidikan",
    skills: "Keahlian",
    languages: "Bahasa",
    certifications: "Sertifikasi",
    profile: "Profil",
    contact: "Kontak",
    hardSkills: "Keahlian Teknis (Hard Skills)",
    softSkills: "Keahlian Interpersonal (Soft Skills)",
    thesis: "Tesis / Tugas Akhir",
    emptyExp: "Belum ada pengalaman kerja.",
    emptyEdu: "Belum ada riwayat pendidikan.",
    emptySkills: "Belum ada daftar keahlian."
  }
};

const defaultCVData = {
  name: "BUDI SANTOSO",
  title1: "Digital Marketing Specialist",
  title2: "Social Media Manager",
  title3: "Content Creator",
  title: "Digital Marketing Specialist | Social Media Manager | Content Creator",
  email: "budi.santoso@email.com",
  phone: "0812-3456-7890",
  website: "linkedin.com/in/budisantoso",
  portfolio: "github.com/budisantoso",
  location: "Jakarta, Indonesia",
  summary: "Spesialis Pemasaran Digital dengan pengalaman lebih dari 3 tahun dalam mengelola kampanye iklan berbayar (Meta Ads, Google Ads) dan strategi konten media sosial. Berhasil meningkatkan pertumbuhan audiens organik sebesar 45% dan memimpin tim kreatif untuk mencapai target konversi penjualan produk hingga 25%. Memiliki sertifikasi profesional di bidang analisis data dan pemasaran digital serta memiliki etos kerja yang tinggi.",
  photo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='90' height='120'><rect width='100' height='120' fill='%23e2e8f0'/><circle cx='50' cy='45' r='22' fill='%2394a3b8'/><path d='M20 95c0-15 12-25 30-25s30 10 30 25v15H20z' fill='%2364748b'/><circle cx='46' cy='44' r='2' fill='%23ffffff'/><circle cx='54' cy='44' r='2' fill='%23ffffff'/><path d='M47 53 q3 2 6 0' stroke='%23ffffff' stroke-width='1.5' fill='none'/></svg>",
  experiences: [
    {
      title: "Senior Digital Marketing Specialist",
      company: "PT Maju Jaya Kreatif",
      location: "Jakarta",
      date: "Januari 2023 - Sekarang",
      bullets: [
        "Merancang dan mengeksekusi strategi pemasaran digital multi-channel yang berhasil meningkatkan omzet bulanan perusahaan hingga 30%.",
        "Mengelola anggaran iklan bulanan sebesar Rp50 juta dengan tingkat ROI (Return on Investment) mencapai 4.2x.",
        "Memimpin tim kreatif yang terdiri dari 5 orang desainer grafis dan penulis naskah untuk memproduksi 50+ aset konten bulanan."
      ]
    },
    {
      title: "Social Media Officer",
      company: "Tech StartUp Indonesia",
      location: "Bandung",
      date: "Maret 2021 - Desember 2022",
      bullets: [
        "Mengelola akun Instagram dan TikTok resmi perusahaan, meningkatkan jumlah pengikut dari 10 ribu menjadi 50 ribu secara organik.",
        "Melakukan analisis tren pasar dan riset audiens mingguan untuk menyusun kalender editorial media sosial yang efektif."
      ]
    }
  ],
  educations: [
    {
      degree: "S1 Ilmu Komunikasi",
      school: "Universitas Indonesia",
      location: "Depok",
      date: "IPK: 3.75 / 4.00 (Cum Laude)",
      thesis: "Analisis Pengaruh Kampanye Video Pendek terhadap Keputusan Pembelian Generasi Z"
    }
  ],
  hardSkills: [
    { name: "Google Analytics", level: "Advanced" },
    { name: "Meta Ads Manager", level: "Advanced" },
    { name: "Copywriting", level: "Intermediate" },
    { name: "SEO Optimization", level: "Intermediate" }
  ],
  softSkills: [
    { name: "Kepemimpinan Tim", level: "Advanced" },
    { name: "Komunikasi Publik", level: "Advanced" },
    { name: "Penyelesaian Masalah", level: "Intermediate" }
  ],
  languages: [
    { name: "Bahasa Indonesia", level: "Native" },
    { name: "Bahasa Inggris", level: "Professional" }
  ],
  certifications: [
    { name: "Google Digital Garage - Fundamentals of Digital Marketing", date: "2022" },
    { name: "Meta Certified Digital Marketing Associate", date: "2023" }
  ]
};

let cvData = JSON.parse(JSON.stringify(defaultCVData));

// UI State
let currentTemplate = "classic";
let currentAccentColor = "#2c5f8a";
let currentNameColor = "#1a252f";
let zoomLevel = 1.0;
let showPhoto = true;
let photoShape = "round"; // 'round', 'square', 'rounded-square'
let photoRatio = "1:1";  // '1:1', '3:4'
let showSkillLevel = true;
let contactLayout = "horizontal"; // 'horizontal', 'vertical', 'grid'
let currentDocumentId = null;

// Init App
window.addEventListener("DOMContentLoaded", () => {
  // Load last active CV or default
  loadLastSession();
  
  // Show welcome modal if first time
  const welcomeShown = localStorage.getItem("ats_cv_maker_welcome_shown");
  if (!welcomeShown) {
    document.getElementById("welcomeModal").classList.add("active");
  }
  
  // Load initial data into inputs
  loadInputsFromState();
  
  // Render lists
  renderExperienceList();
  renderEducationList();
  renderHardSkillList();
  renderSoftSkillList();
  renderLanguageList();
  renderCertificationList();
  
  // Render Saved List
  renderSavedCVList();
  
  // Render Preview
  updateCV();
});

function showHelpModal() {
  document.getElementById("welcomeModal").classList.add("active");
}

function closeWelcomeModal(useExample = false) {
  document.getElementById("welcomeModal").classList.remove("active");
  localStorage.setItem("ats_cv_maker_welcome_shown", "true");
  if (useExample) {
    cvData = JSON.parse(JSON.stringify(defaultCVData));
    loadInputsFromState();
    refreshAllLists();
    updateCV();
    showToast("CV diisi dengan data contoh bawaan.");
  } else {
    cvData = {
      name: "",
      title1: "", title2: "", title3: "", title: "",
      email: "", phone: "", website: "", portfolio: "", location: "", summary: "", photo: "",
      experiences: [], educations: [], hardSkills: [], softSkills: [], languages: [], certifications: []
    };
    document.getElementById("cvDocName").value = "CV Baru Saya";
    loadInputsFromState();
    refreshAllLists();
    updateCV();
    showToast("Form CV dikosongkan, silakan mulai menulis.");
  }
}

// Load state into inputs
function loadInputsFromState() {
  document.getElementById("inName").value = cvData.name || "";
  // Parse separated titles or split from legacy title string
  if (cvData.title1 !== undefined) {
    document.getElementById("inTitle1").value = cvData.title1 || "";
    document.getElementById("inTitle2").value = cvData.title2 || "";
    document.getElementById("inTitle3").value = cvData.title3 || "";
  } else if (cvData.title) {
    const splitTitles = cvData.title.split(" | ");
    document.getElementById("inTitle1").value = splitTitles[0] || "";
    document.getElementById("inTitle2").value = splitTitles[1] || "";
    document.getElementById("inTitle3").value = splitTitles[2] || "";
  } else {
    document.getElementById("inTitle1").value = "";
    document.getElementById("inTitle2").value = "";
    document.getElementById("inTitle3").value = "";
  }
  document.getElementById("inEmail").value = cvData.email || "";
  document.getElementById("inPhone").value = cvData.phone || "";
  document.getElementById("inWebsite").value = cvData.website || "";
  if (document.getElementById("inPortfolio")) {
    document.getElementById("inPortfolio").value = cvData.portfolio || "";
  }
  document.getElementById("inLocation").value = cvData.location || "";
  document.getElementById("inSummary").value = cvData.summary || "";
  document.getElementById("showPhotoToggle").checked = showPhoto;
  if (document.getElementById("showSkillLevelToggle")) {
    document.getElementById("showSkillLevelToggle").checked = showSkillLevel;
  }
  if (document.getElementById("photoShapeSelect")) {
    document.getElementById("photoShapeSelect").value = photoShape;
  }
  if (document.getElementById("photoRatioSelect")) {
    document.getElementById("photoRatioSelect").value = photoRatio;
  }
  if (document.getElementById("contactLayoutSelect")) {
    document.getElementById("contactLayoutSelect").value = contactLayout;
  }
  
  const photoSettingsGroup = document.getElementById("photoSettingsGroup");
  if (photoSettingsGroup) {
    photoSettingsGroup.style.display = showPhoto ? "flex" : "none";
  }
  
  if (document.getElementById("cvLanguageSelect")) {
    document.getElementById("cvLanguageSelect").value = cvLanguage;
  }
  if (document.getElementById("cvFontSelect")) {
    document.getElementById("cvFontSelect").value = cvFont;
  }
  
  const sidebarPhotoArea = document.getElementById("sidebarPhotoArea");
  if (cvData.photo) {
    document.getElementById("photoPreview").src = cvData.photo;
    document.getElementById("photoPreview").style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  } else {
    document.getElementById("photoPreview").style.display = "none";
    document.getElementById("photoPlaceholder").style.display = "flex";
  }
}

// Collapsible Panels
function togglePanel(id) {
  const panel = document.getElementById(id);
  panel.classList.toggle("collapsed");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}

// Photo toggle display (No Photo template option)
function togglePhotoDisplay(checked) {
  showPhoto = checked;
  const photoSettingsGroup = document.getElementById("photoSettingsGroup");
  if (photoSettingsGroup) {
    photoSettingsGroup.style.display = checked ? "flex" : "none";
  }
  saveCurrentCVLocalState();
  updateCV();
}

function toggleSkillLevelDisplay(checked) {
  showSkillLevel = checked;
  saveCurrentCVLocalState();
  updateCV();
}

function changeCVLanguage(lang) {
  cvLanguage = lang;
  saveCurrentCVLocalState();
  updateCV();
}

function changeCVFont(font) {
  cvFont = font;
  saveCurrentCVLocalState();
  updateCV();
}

// Accent Colors
function setColor(color, element) {
  currentAccentColor = color;
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--accent-light", color + "1a");
  
  if (element) {
    document.querySelectorAll(".color-dot:not(.name-dot)").forEach(dot => dot.classList.remove("active"));
    element.classList.add("active");
  }
  document.getElementById("customColor").value = color;
  saveCurrentCVLocalState();
  updateCV();
}

function setNameColor(color, element) {
  currentNameColor = color;
  document.documentElement.style.setProperty("--name-color", color);
  
  if (element) {
    document.querySelectorAll(".name-dot").forEach(dot => dot.classList.remove("active"));
    element.classList.add("active");
  }
  document.getElementById("customNameColor").value = color;
  saveCurrentCVLocalState();
  updateCV();
}

// Template Selector
function setTemplate(template) {
  currentTemplate = template;
  document.querySelectorAll(".template-card").forEach(card => {
    card.classList.remove("active");
    if (card.dataset.template === template) {
      card.classList.add("active");
    }
  });

  // Clean template: hide photo area entirely (layout doesn't support it)
  const photoToggle = document.getElementById("showPhotoToggle");
  const photoSettingsGroup = document.getElementById("photoSettingsGroup");
  const photoArea = document.getElementById("sidebarPhotoArea");
  const photoToggleRow = photoToggle ? photoToggle.closest(".form-group") || photoToggle.parentElement : null;

  if (template === "clean") {
    if (photoArea) photoArea.style.display = "none";
    if (photoToggle) { photoToggle.checked = false; photoToggle.disabled = true; }
    if (photoToggleRow) photoToggleRow.style.display = "none";
    if (photoSettingsGroup) photoSettingsGroup.style.display = "none";
    showPhoto = false;
  } else {
    if (photoArea) photoArea.style.display = "block";
    if (photoToggle) { photoToggle.disabled = false; }
    if (photoToggleRow) photoToggleRow.style.display = "flex";  // restore inline flex
    const wasChecked = photoToggle ? photoToggle.checked : true;
    showPhoto = wasChecked;
    if (photoSettingsGroup) photoSettingsGroup.style.display = wasChecked ? "flex" : "none";
  }


  saveCurrentCVLocalState();
  updateCV();
}


// Handle photo upload
function handlePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      cvData.photo = e.target.result;
      document.getElementById("photoPreview").src = e.target.result;
      document.getElementById("photoPreview").style.display = "block";
      document.getElementById("photoPlaceholder").style.display = "none";
      saveCurrentCVLocalState();
      updateCV();
    };
    reader.readAsDataURL(file);
  }
}

// Update local state when typing
function updateCV() {
  cvData.name = document.getElementById("inName").value;
  
  // Read separated titles
  cvData.title1 = document.getElementById("inTitle1").value.trim();
  cvData.title2 = document.getElementById("inTitle2").value.trim();
  cvData.title3 = document.getElementById("inTitle3").value.trim();
  
  // Merge into cvData.title with pipe spacer for template backward compatibility
  const titles = [cvData.title1, cvData.title2, cvData.title3].filter(Boolean);
  cvData.title = titles.join(" | ");
  
  cvData.email = document.getElementById("inEmail").value;
  cvData.phone = document.getElementById("inPhone").value;
  cvData.website = document.getElementById("inWebsite").value;
  if (document.getElementById("inPortfolio")) {
    cvData.portfolio = document.getElementById("inPortfolio").value;
  }
  cvData.location = document.getElementById("inLocation").value;
  cvData.summary = document.getElementById("inSummary").value;

  renderPreview();
}

// Local Storage & CV Saver Features
function saveCurrentCVLocalState() {
  // Autosave current work draft
  const docName = document.getElementById("cvDocName").value || "Draft CV";
  const autoSaveChecked = document.getElementById("autoSaveToggle") ? document.getElementById("autoSaveToggle").checked : true;
  const state = {
    docName,
    cvData,
    currentTemplate,
    currentAccentColor,
    currentNameColor,
    showPhoto,
    photoShape,
    photoRatio,
    showSkillLevel,
    contactLayout,
    currentDocumentId,
    cvLanguage,
    cvFont,
    autoSaveOnExport: autoSaveChecked
  };
  localStorage.setItem("ats_cv_maker_current_draft", JSON.stringify(state));
}

function saveCVToList() {
  const docName = document.getElementById("cvDocName").value.trim() || "CV Baru Tanpa Nama";
  let savedCVs = JSON.parse(localStorage.getItem("ats_cv_maker_saved_list")) || [];
  
  const id = currentDocumentId || Date.now().toString();
  currentDocumentId = id;
  
  const docToSave = {
    id: id,
    docName: docName,
    updatedAt: new Date().toLocaleString("id-ID"),
    cvData: cvData,
    currentTemplate: currentTemplate,
    currentAccentColor: currentAccentColor,
    currentNameColor: currentNameColor,
    showPhoto: showPhoto,
    photoShape: photoShape,
    photoRatio: photoRatio,
    showSkillLevel: showSkillLevel,
    contactLayout: contactLayout,
    cvLanguage: cvLanguage,
    cvFont: cvFont
  };
  
  // Replace or push
  const index = savedCVs.findIndex(item => item.id === id);
  if (index !== -1) {
    savedCVs[index] = docToSave;
  } else {
    savedCVs.push(docToSave);
  }
  
  localStorage.setItem("ats_cv_maker_saved_list", JSON.stringify(savedCVs));
  saveCurrentCVLocalState();
  renderSavedCVList();
  showToast("CV berhasil disimpan di riwayat lokal!");
}

function renderSavedCVList() {
  const container = document.getElementById("savedCVList");
  const searchQuery = document.getElementById("searchSavedCV").value.toLowerCase();
  let savedCVs = JSON.parse(localStorage.getItem("ats_cv_maker_saved_list")) || [];
  
  container.innerHTML = "";
  
  // Filter search
  const filtered = savedCVs.filter(item => item.docName.toLowerCase().includes(searchQuery));
  
  if (filtered.length === 0) {
    container.innerHTML = `<div class="cv-empty-section" style="padding: 10px; text-align: center;">Tidak ada CV ditemukan</div>`;
    return;
  }
  
  filtered.forEach(item => {
    const el = document.createElement("div");
    el.className = "saved-cv-item";
    el.innerHTML = `
      <div class="saved-cv-info" onclick="loadSavedCV('${item.id}')">
        <span class="saved-cv-title">${item.docName}</span>
        <span class="saved-cv-time">${item.updatedAt}</span>
      </div>
      <div class="saved-cv-actions">
        <button class="btn-icon delete" onclick="deleteSavedCV('${item.id}')" title="Hapus">🗑️</button>
      </div>
    `;
    container.appendChild(el);
  });
}

function loadSavedCV(id) {
  let savedCVs = JSON.parse(localStorage.getItem("ats_cv_maker_saved_list")) || [];
  const item = savedCVs.find(d => d.id === id);
  if (item) {
    currentDocumentId = item.id;
    cvData = item.cvData;
    currentTemplate = item.currentTemplate || "classic";
    currentAccentColor = item.currentAccentColor || "#2c5f8a";
    currentNameColor = item.currentNameColor || "#1a252f";
    showPhoto = item.showPhoto !== undefined ? item.showPhoto : true;
    photoShape = item.photoShape || "round";
    photoRatio = item.photoRatio || "1:1";
    showSkillLevel = item.showSkillLevel !== undefined ? item.showSkillLevel : true;
    contactLayout = item.contactLayout || "horizontal";
    cvLanguage = item.cvLanguage || "en";
    cvFont = item.cvFont || "Arial";
    
    document.getElementById("cvDocName").value = item.docName;
    
    loadInputsFromState();
    renderExperienceList();
    renderEducationList();
    renderHardSkillList();
    renderSoftSkillList();
    renderLanguageList();
    renderCertificationList();
    
    // Set active states color dot & template
    setTemplate(currentTemplate);
    setColor(currentAccentColor, null);
    setNameColor(currentNameColor, null);
    
    updateCV();
    showToast(`Berhasil memuat "${item.docName}"`);
  }
}

function deleteSavedCV(id) {
  if (confirm("Apakah Anda yakin ingin menghapus CV ini dari penyimpanan?")) {
    let savedCVs = JSON.parse(localStorage.getItem("ats_cv_maker_saved_list")) || [];
    savedCVs = savedCVs.filter(item => item.id !== id);
    localStorage.setItem("ats_cv_maker_saved_list", JSON.stringify(savedCVs));
    
    if (currentDocumentId === id) {
      currentDocumentId = null;
      document.getElementById("cvDocName").value = "CV Baru Saya";
    }
    
    renderSavedCVList();
    showToast("CV telah dihapus.", "info");
  }
}

function resetCVToDefault() {
  if (confirm("Apakah Anda yakin ingin menyetel ulang data CV ke contoh bawaan? Data draf saat ini akan diganti.")) {
    cvData = JSON.parse(JSON.stringify(defaultCVData));
    loadInputsFromState();
    refreshAllLists();
    updateCV();
    showToast("CV disetel ulang ke contoh bawaan.");
  }
}

function clearAllInputs() {
  if (confirm("Apakah Anda yakin ingin mengosongkan seluruh form CV? Semua isian saat ini akan dihapus.")) {
    cvData = {
      name: "",
      title1: "", title2: "", title3: "", title: "",
      email: "", phone: "", website: "", portfolio: "", location: "", summary: "", photo: "",
      experiences: [], educations: [], hardSkills: [], softSkills: [], languages: [], certifications: []
    };
    document.getElementById("cvDocName").value = "CV Baru Saya";
    loadInputsFromState();
    refreshAllLists();
    updateCV();
    showToast("Form CV berhasil dikosongkan.", "info");
  }
}

function refreshAllLists() {
  renderExperienceList();
  renderEducationList();
  renderHardSkillList();
  renderSoftSkillList();
  renderLanguageList();
  renderCertificationList();
}

function loadLastSession() {
  const draft = localStorage.getItem("ats_cv_maker_current_draft");
  if (draft) {
    try {
      const state = JSON.parse(draft);
      cvData = state.cvData;
      currentTemplate = state.currentTemplate || "classic";
      currentAccentColor = state.currentAccentColor || "#2c5f8a";
      currentNameColor = state.currentNameColor || "#1a252f";
      showPhoto = state.showPhoto !== undefined ? state.showPhoto : true;
      photoShape = state.photoShape || "round";
      photoRatio = state.photoRatio || "1:1";
      showSkillLevel = state.showSkillLevel !== undefined ? state.showSkillLevel : true;
      contactLayout = state.contactLayout || "horizontal";
      cvLanguage = state.cvLanguage || "en";
      cvFont = state.cvFont || "Arial";
      currentDocumentId = state.currentDocumentId || null;
      document.getElementById("cvDocName").value = state.docName || "CV Baru Saya";
      if (state.autoSaveOnExport !== undefined && document.getElementById("autoSaveToggle")) {
        document.getElementById("autoSaveToggle").checked = state.autoSaveOnExport;
      }
    } catch(e) {
      console.error("Gagal meload draft lama, gunakan default", e);
    }
  }
}

// Rendering Lists in Sidebar
function renderExperienceList() {
  const container = document.getElementById("expList");
  container.innerHTML = "";
  cvData.experiences.forEach((exp, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Pekerjaan #${idx + 1}</span>
        <div class="item-card-actions">
          <button class="btn-icon delete" onclick="deleteExperience(${idx})">🗑️</button>
        </div>
      </div>
      <div class="form-group"><label>Posisi</label><input type="text" value="${exp.title || ''}" oninput="updateExp(${idx}, 'title', this.value)" /></div>
      <div class="form-group"><label>Perusahaan</label><input type="text" value="${exp.company || ''}" oninput="updateExp(${idx}, 'company', this.value)" /></div>
      <div class="form-group"><label>Lokasi Perusahaan</label><input type="text" placeholder="Contoh: Jakarta atau Remote" value="${exp.location || ''}" oninput="updateExp(${idx}, 'location', this.value)" /></div>
      <div class="form-group"><label>Periode</label><input type="text" value="${exp.date || ''}" oninput="updateExp(${idx}, 'date', this.value)" /></div>
      <div class="form-group">
        <label>Detail / Poin Bullet (Satu per baris)</label>
        <textarea rows="3" oninput="updateExpBullets(${idx}, this.value)">${(exp.bullets || []).join("\n")}</textarea>
      </div>
    `;
    container.appendChild(card);
  });
}

function addExperience() {
  cvData.experiences.push({ title: "", company: "", location: "", date: "", bullets: [] });
  renderExperienceList();
  updateCV();
}

function updateExp(idx, field, value) {
  cvData.experiences[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function updateExpBullets(idx, value) {
  cvData.experiences[idx].bullets = value.split("\n").filter(line => line.trim() !== "");
  saveCurrentCVLocalState();
  updateCV();
}

function deleteExperience(idx) {
  cvData.experiences.splice(idx, 1);
  renderExperienceList();
  saveCurrentCVLocalState();
  updateCV();
}

// Education Handlers
function renderEducationList() {
  const container = document.getElementById("eduList");
  container.innerHTML = "";
  cvData.educations.forEach((edu, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Pendidikan #${idx + 1}</span>
        <div class="item-card-actions">
          <button class="btn-icon delete" onclick="deleteEducation(${idx})">🗑️</button>
        </div>
      </div>
      <div class="form-group"><label>Gelar/Jurusan</label><input type="text" value="${edu.degree || ''}" oninput="updateEdu(${idx}, 'degree', this.value)" /></div>
      <div class="form-group"><label>Sekolah/Universitas</label><input type="text" value="${edu.school || ''}" oninput="updateEdu(${idx}, 'school', this.value)" /></div>
      <div class="form-group"><label>Lokasi Sekolah</label><input type="text" placeholder="Contoh: Depok" value="${edu.location || ''}" oninput="updateEdu(${idx}, 'location', this.value)" /></div>
      <div class="form-group"><label>Tahun/Nilai (IPK)</label><input type="text" value="${edu.date || ''}" oninput="updateEdu(${idx}, 'date', this.value)" /></div>
      <div class="form-group"><label>Tesis / Proyek Akhir (Opsional)</label><input type="text" placeholder="Judul Tugas Akhir / Tesis" value="${edu.thesis || ''}" oninput="updateEdu(${idx}, 'thesis', this.value)" /></div>
    `;
    container.appendChild(card);
  });
}

function addEducation() {
  cvData.educations.push({ degree: "", school: "", location: "", date: "", thesis: "" });
  renderEducationList();
  updateCV();
}

function updateEdu(idx, field, value) {
  cvData.educations[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function deleteEducation(idx) {
  cvData.educations.splice(idx, 1);
  renderEducationList();
  saveCurrentCVLocalState();
  updateCV();
}

// Hard Skills Handlers
function renderHardSkillList() {
  const container = document.getElementById("hardSkillsList");
  container.innerHTML = "";
  (cvData.hardSkills || []).forEach((skill, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Hard Skill #${idx + 1}</span>
        <button class="btn-icon delete" onclick="deleteHardSkill(${idx})">🗑️</button>
      </div>
      <div class="row-2">
        <div class="form-group"><input type="text" placeholder="Nama Keahlian" value="${skill.name}" oninput="updateHardSkill(${idx}, 'name', this.value)" /></div>
        <div class="form-group">
          <select onchange="updateHardSkill(${idx}, 'level', this.value)">
            <option value="Advanced" ${skill.level === "Advanced" ? "selected" : ""}>Advanced</option>
            <option value="Intermediate" ${skill.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
            <option value="Basic" ${skill.level === "Basic" ? "selected" : ""}>Basic</option>
            <option value="Hide" ${skill.level === "Hide" ? "selected" : ""}>Sembunyikan Level</option>
          </select>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addHardSkill() {
  if (!cvData.hardSkills) cvData.hardSkills = [];
  cvData.hardSkills.push({ name: "", level: "Intermediate" });
  renderHardSkillList();
  updateCV();
}

function updateHardSkill(idx, field, value) {
  cvData.hardSkills[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function deleteHardSkill(idx) {
  cvData.hardSkills.splice(idx, 1);
  renderHardSkillList();
  saveCurrentCVLocalState();
  updateCV();
}

// Soft Skills Handlers
function renderSoftSkillList() {
  const container = document.getElementById("softSkillsList");
  container.innerHTML = "";
  (cvData.softSkills || []).forEach((skill, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Soft Skill #${idx + 1}</span>
        <button class="btn-icon delete" onclick="deleteSoftSkill(${idx})">🗑️</button>
      </div>
      <div class="row-2">
        <div class="form-group"><input type="text" placeholder="Keahlian Interpersonal" value="${skill.name}" oninput="updateSoftSkill(${idx}, 'name', this.value)" /></div>
        <div class="form-group">
          <select onchange="updateSoftSkill(${idx}, 'level', this.value)">
            <option value="Advanced" ${skill.level === "Advanced" ? "selected" : ""}>Advanced</option>
            <option value="Intermediate" ${skill.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
            <option value="Basic" ${skill.level === "Basic" ? "selected" : ""}>Basic</option>
            <option value="Hide" ${skill.level === "Hide" ? "selected" : ""}>Sembunyikan Level</option>
          </select>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addSoftSkill() {
  if (!cvData.softSkills) cvData.softSkills = [];
  cvData.softSkills.push({ name: "", level: "Advanced" });
  renderSoftSkillList();
  updateCV();
}

function updateSoftSkill(idx, field, value) {
  cvData.softSkills[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function deleteSoftSkill(idx) {
  cvData.softSkills.splice(idx, 1);
  renderSoftSkillList();
  saveCurrentCVLocalState();
  updateCV();
}

function setAllHardSkillsLevel(level) {
  if (cvData.hardSkills) {
    cvData.hardSkills.forEach(skill => {
      skill.level = level;
    });
    renderHardSkillList();
    saveCurrentCVLocalState();
    updateCV();
  }
}

function setAllSoftSkillsLevel(level) {
  if (cvData.softSkills) {
    cvData.softSkills.forEach(skill => {
      skill.level = level;
    });
    renderSoftSkillList();
    saveCurrentCVLocalState();
    updateCV();
  }
}

// Languages Handlers
function renderLanguageList() {
  const container = document.getElementById("langList");
  container.innerHTML = "";
  cvData.languages.forEach((lang, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Bahasa #${idx + 1}</span>
        <button class="btn-icon delete" onclick="deleteLanguage(${idx})">🗑️</button>
      </div>
      <div class="row-2">
        <div class="form-group"><input type="text" placeholder="Nama Bahasa" value="${lang.name}" oninput="updateLanguage(${idx}, 'name', this.value)" /></div>
        <div class="form-group">
          <input type="text" placeholder="Level (misal: Native)" value="${lang.level}" oninput="updateLanguage(${idx}, 'level', this.value)" />
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addLanguage() {
  cvData.languages.push({ name: "", level: "Native" });
  renderLanguageList();
  updateCV();
}

function updateLanguage(idx, field, value) {
  cvData.languages[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function deleteLanguage(idx) {
  cvData.languages.splice(idx, 1);
  renderLanguageList();
  saveCurrentCVLocalState();
  updateCV();
}

// Certification Handlers
function renderCertificationList() {
  const container = document.getElementById("certList");
  container.innerHTML = "";
  cvData.certifications.forEach((cert, idx) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <div class="item-card-header">
        <span class="item-card-title">Sertifikat #${idx + 1}</span>
        <button class="btn-icon delete" onclick="deleteCertification(${idx})">🗑️</button>
      </div>
      <div class="form-group"><input type="text" placeholder="Nama Sertifikasi" value="${cert.name || ''}" oninput="updateCertification(${idx}, 'name', this.value)" /></div>
      <div class="form-group"><input type="text" placeholder="Lembaga / Tanggal" value="${cert.date || ''}" oninput="updateCertification(${idx}, 'date', this.value)" /></div>
    `;
    container.appendChild(card);
  });
}

function addCertification() {
  cvData.certifications.push({ name: "", date: "" });
  renderCertificationList();
  updateCV();
}

function updateCertification(idx, field, value) {
  cvData.certifications[idx][field] = value;
  saveCurrentCVLocalState();
  updateCV();
}

function deleteCertification(idx) {
  cvData.certifications.splice(idx, 1);
  renderCertificationList();
  saveCurrentCVLocalState();
  updateCV();
}

// Zoom Handling
function adjustZoom(amount) {
  zoomLevel = Math.max(0.5, Math.min(2.0, zoomLevel + amount));
  document.getElementById("zoomLevel").innerText = Math.round(zoomLevel * 100) + "%";
  document.getElementById("cvPaperWrapper").style.transform = `scale(${zoomLevel})`;
}

function resetZoom() {
  zoomLevel = 1.0;
  document.getElementById("zoomLevel").innerText = "100%";
  document.getElementById("cvPaperWrapper").style.transform = "scale(1)";
}

// Render Preview CV Paper
function renderPreview() {
  const cvPreview = document.getElementById("cvPreview");
  cvPreview.className = "cv-paper tpl-" + currentTemplate;

  let html = "";
  
  if (currentTemplate === "classic") {
    html = renderClassicHTML();
  } else if (currentTemplate === "modern") {
    html = renderModernHTML();
  } else if (currentTemplate === "minimal") {
    html = renderMinimalHTML();
  } else if (currentTemplate === "executive") {
    html = renderExecutiveHTML();
  } else if (currentTemplate === "clean") {
    html = renderCleanHTML();
  }
  
  cvPreview.innerHTML = html;
  cvPreview.style.fontFamily = cvFont;
}

function getCompanyText(exp) {
  if (!exp.company) return "";
  return exp.location ? `${exp.company} - ${exp.location}` : exp.company;
}

function getSchoolText(edu) {
  if (!edu.school) return "";
  return edu.location ? `${edu.school} - ${edu.location}` : edu.school;
}

// Helper: Tampilkan atau sembunyikan foto
function getPhotoHTML(isModern = false) {
  if (!showPhoto) return "";
  
  // Calculate border radius
  let borderRadius = "50%";
  if (photoShape === "square") {
    borderRadius = "0%";
  } else if (photoShape === "rounded-square") {
    borderRadius = "6px";
  }
  
  // Calculate dimensions and aspect ratio (Force 1:1 circle if shape is round to prevent oval distortion)
  let dimensions = "width: 90px; height: 90px; aspect-ratio: 1/1;";
  if (photoShape !== "round") {
    if (photoRatio === "3:4") {
      dimensions = "width: 90px; height: 120px; aspect-ratio: 3/4;";
    } else if (photoRatio === "4:6") {
      dimensions = "width: 90px; height: 135px; aspect-ratio: 2/3;";
    }
  }
  
  const inlineStyles = `border-radius: ${borderRadius}; ${dimensions} object-fit: cover; display: block; border: 2.5px solid ${isModern ? 'rgba(255,255,255,0.4)' : '#e0e0e0'};`;
  
  if (cvData.photo) {
    return `<img src="${cvData.photo}" class="cv-photo" style="${inlineStyles}" alt="Photo" />`;
  }
  
  const strokeColor = isModern ? "white" : "#ccc";
  const placeholderStyles = `border-radius: ${borderRadius}; ${dimensions} background: ${isModern ? 'rgba(255,255,255,0.15)' : '#f5f5f5'}; border: 2px solid ${isModern ? 'rgba(255,255,255,0.4)' : '#e0e0e0'}; display: flex; align-items: center; justify-content: center;`;
  return `<div class="cv-photo-placeholder" style="${placeholderStyles}"><svg viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" style="width:36px;height:36px"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>`;
}

function changePhotoShape(shape) {
  photoShape = shape;
  saveCurrentCVLocalState();
  updateCV();
}

function changePhotoRatio(ratio) {
  photoRatio = ratio;
  saveCurrentCVLocalState();
  updateCV();
}

function changeContactLayout(layout) {
  contactLayout = layout;
  saveCurrentCVLocalState();
  updateCV();
}

function getContactContainerStyles(isMinimal = false, isHeaderSub = false) {
  const padding = isMinimal ? (isHeaderSub ? 'padding: 0; margin-top: 8px;' : 'padding: 8px 44px;') : (isHeaderSub ? 'padding: 0; margin-top: 8px;' : 'padding: 10px 36px; margin-bottom: 16px;');
  const border = (isMinimal || isHeaderSub) ? '' : `border-bottom: 1.5px solid ${currentAccentColor}33; border-top: 1.5px solid ${currentAccentColor}33;`;
  
  if (contactLayout === "vertical") {
    return `${padding} ${border} display: flex; flex-direction: column; align-items: flex-start; gap: 6px; width: 100%;`;
  } else if (contactLayout === "grid") {
    return `${padding} ${border} display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 24px; max-width: 100%; justify-items: start;`;
  } else {
    // horizontal
    return `${padding} ${border} display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 12px; width: 100%;`;
  }
}

function renderClassicHTML() {
  const photoHTML = getPhotoHTML(false);
  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const t = translations[cvLanguage];
  
  return `
    <div class="cv-header" style="${!showPhoto ? 'padding-left:36px;' : ''} padding-bottom: 16px; border-bottom: 2px solid ${currentAccentColor}; margin-bottom: 16px;">
      ${photoHTML}
      <div class="cv-name-block">
        <h1 class="cv-name" style="color: ${currentNameColor}">${cvData.name || "NAMA LENGKAP"}</h1>
        <div class="cv-position" style="color: ${currentAccentColor}; margin-bottom: 4px;">${cvData.title || "Posisi Pekerjaan"}</div>
        
        <div class="cv-contacts" style="${getContactContainerStyles(false, true)}">
          ${cvData.email ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${cvData.phone}</span>` : ""}
          ${cvData.website ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>${cvData.website}</span>` : ""}
          ${cvData.portfolio ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${cvData.portfolio}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${cvData.location}</span>` : ""}
        </div>
      </div>
    </div>
    
    <div class="cv-body">
      ${cvData.summary ? `<div class="cv-summary" style="margin-top: 8px;">${cvData.summary}</div>` : ""}
      
      <!-- EXPERIENCE -->
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.experience}</h2>
        ${cvData.experiences.length === 0 ? `<div class="cv-empty-section">${t.emptyExp}</div>` : 
          cvData.experiences.map(exp => `
            <div class="exp-item">
              <div class="exp-header">
                <span class="exp-title-company">${exp.title || "Posisi"} <span style="font-weight:normal;color:#666">|</span> ${getCompanyText(exp) || "Perusahaan"}</span>
                <span class="exp-date">${exp.date || ""}</span>
              </div>
              ${exp.bullets.length > 0 ? `
                <ul class="exp-bullets">
                  ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")
        }
      </div>
      
      <!-- EDUCATION -->
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.education}</h2>
        ${cvData.educations.length === 0 ? `<div class="cv-empty-section">${t.emptyEdu}</div>` :
          cvData.educations.map(edu => `
            <div class="edu-item">
              <div class="edu-header">
                <span class="edu-degree">${edu.degree || "Gelar / Jurusan"} <span style="font-weight:normal;color:#666">|</span> ${getSchoolText(edu) || "Sekolah / Universitas"}</span>
                <span class="edu-date">${edu.date || ""}</span>
              </div>
              ${edu.thesis ? `<div class="edu-thesis">${t.thesis}: "${edu.thesis}"</div>` : ""}
            </div>
          `).join("")
        }
      </div>
      
      <!-- SKILLS -->
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.skills}</h2>
        ${(hs.length === 0 && ss.length === 0) ? `<div class="cv-empty-section">${t.emptySkills}</div>` : `
          <div class="skills-list">
            ${hs.length > 0 ? `<div><strong>${t.hardSkills}:</strong> ${hs.map(s => `${s.name}${showSkillLevel && s.level !== "Hide" ? ` (${s.level})` : ''}`).join(" | ")}</div>` : ""}
            ${ss.length > 0 ? `<div style="margin-top:4px;"><strong>${t.softSkills}:</strong> ${ss.map(s => `${s.name}${showSkillLevel && s.level !== "Hide" ? ` (${s.level})` : ''}`).join(" | ")}</div>` : ""}
          </div>`}
      </div>
      
      <!-- LANGUAGES -->
      ${cvData.languages.length > 0 ? `
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.languages}</h2>
        <div class="lang-list">
          ${cvData.languages.map((lang, idx) => `
            <span>${lang.name} - ${lang.level}</span>
            ${idx < cvData.languages.length - 1 ? '<span class="skill-sep">|</span>' : ""}
          `).join("")}
        </div>
      </div>
      ` : ""}
      
      <!-- CERTIFICATIONS -->
      ${cvData.certifications.length > 0 ? `
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.certifications}</h2>
        ${cvData.certifications.map(cert => `
          <div class="cert-item">
            <span class="cert-name">${cert.name}</span> - <span>${cert.date}</span>
          </div>
        `).join("")}
      </div>
      ` : ""}
    </div>
  `;
}

// RENDER MODERN (Sidebar Layout)
function renderModernHTML() {
  const photoHTML = getPhotoHTML(true);
  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const t = translations[cvLanguage];
    
  return `
    <div class="cv-sidebar" style="background-color: ${currentAccentColor}">
      ${photoHTML}
      <h1 class="cv-name" style="color: #ffffff">${cvData.name || "NAMA LENGKAP"}</h1>
      <div class="cv-position">${cvData.title || "Posisi"}</div>
      
      <div class="side-section">
        <h3 class="side-section-title">${t.contact}</h3>
        ${cvData.email ? `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${cvData.email}</div>` : ""}
        ${cvData.phone ? `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${cvData.phone}</div>` : ""}
        ${cvData.website ? `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>${cvData.website}</div>` : ""}
        ${cvData.portfolio ? `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${cvData.portfolio}</div>` : ""}
        ${cvData.location ? `<div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${cvData.location}</div>` : ""}
      </div>
      
      ${hs.length > 0 ? `
      <div class="side-section">
        <h3 class="side-section-title">${t.hardSkills}</h3>
        ${hs.map(sk => `<div class="skill-tag">${sk.name}${showSkillLevel && sk.level !== "Hide" ? ` (${sk.level})` : ''}</div>`).join("")}
      </div>
      ` : ""}

      ${ss.length > 0 ? `
      <div class="side-section">
        <h3 class="side-section-title">${t.softSkills}</h3>
        ${ss.map(sk => `<div class="skill-tag">${sk.name}${showSkillLevel && sk.level !== "Hide" ? ` (${sk.level})` : ''}</div>`).join("")}
      </div>
      ` : ""}
      
      ${cvData.languages.length > 0 ? `
      <div class="side-section">
        <h3 class="side-section-title">${t.languages}</h3>
        ${cvData.languages.map(ln => `
          <div class="lang-item">
            <span>${ln.name}</span>
            <span class="lang-level">${ln.level}</span>
          </div>
        `).join("")}
      </div>
      ` : ""}
    </div>
    
    <div class="cv-main-content">
      ${cvData.summary ? `
        <div class="main-section">
          <h2 class="main-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.profile}</h2>
          <div class="cv-summary">${cvData.summary}</div>
        </div>
      ` : ""}
      
      <div class="main-section">
        <h2 class="main-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.experience}</h2>
        ${cvData.experiences.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <span class="exp-title">${exp.title || "Posisi"}</span>
              <span class="exp-date">${exp.date || ""}</span>
            </div>
            <div class="exp-company">${getCompanyText(exp) || ""}</div>
            ${exp.bullets.length > 0 ? `
              <ul class="exp-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
              </ul>
            ` : ""}
          </div>
        `).join("")}
      </div>
      
      <div class="main-section">
        <h2 class="main-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.education}</h2>
        ${cvData.educations.map(edu => `
          <div class="edu-item">
            <div class="edu-header">
              <span class="edu-degree">${edu.degree}</span>
              <span class="edu-date">${edu.date}</span>
            </div>
            <div class="edu-school">${getSchoolText(edu)}</div>
            ${edu.thesis ? `<div class="edu-thesis">${t.thesis}: "${edu.thesis}"</div>` : ""}
          </div>
        `).join("")}
      </div>
      
      ${cvData.certifications.length > 0 ? `
      <div class="main-section">
        <h2 class="main-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.certifications}</h2>
        ${cvData.certifications.map(cert => `
          <div class="cert-item">
            <span class="cert-name">${cert.name}</span> - <span>${cert.date}</span>
          </div>
        `).join("")}
      </div>
      ` : ""}
    </div>
  `;
}

// RENDER MINIMAL (Elegant and Clean)
function renderMinimalHTML() {
  const photoHTML = getPhotoHTML(false);
  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const t = translations[cvLanguage];

  return `
    <div class="cv-top-bar" style="background-color: ${currentAccentColor}"></div>
    <div class="cv-header" style="${!showPhoto ? 'padding-left:44px;' : ''}">
      ${photoHTML}
      <div>
        <h1 class="cv-name" style="color: ${currentNameColor}">${cvData.name || "NAMA LENGKAP"}</h1>
        <div class="cv-position" style="color: ${currentAccentColor}">${cvData.title || "Posisi"}</div>
        <div class="cv-contacts" style="${getContactContainerStyles(true, true)}">
          ${cvData.email ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${cvData.phone}</span>` : ""}
          ${cvData.website ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>${cvData.website}</span>` : ""}
          ${cvData.portfolio ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${cvData.portfolio}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="${currentAccentColor}" stroke-width="2" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${cvData.location}</span>` : ""}
        </div>
      </div>
    </div>
    
    <div class="cv-body">
      ${cvData.summary ? `<div class="cv-summary" style="border-left-color: ${currentAccentColor}">${cvData.summary}</div>` : ""}
      
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}">${t.experience.toUpperCase()}</h2>
        ${cvData.experiences.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <span class="exp-title-company"><strong>${exp.title}</strong>, ${getCompanyText(exp)}</span>
              <span class="exp-date">${exp.date}</span>
            </div>
            ${exp.bullets.length > 0 ? `
              <ul class="exp-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
              </ul>
            ` : ""}
          </div>
        `).join("")}
      </div>
      
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}">${t.education.toUpperCase()}</h2>
        ${cvData.educations.map(edu => `
          <div class="edu-item">
            <div class="edu-header">
              <span class="edu-degree"><strong>${edu.degree}</strong> - ${getSchoolText(edu)}</span>
              <span class="edu-date">${edu.date}</span>
            </div>
            ${edu.thesis ? `<div class="edu-thesis">${t.thesis}: "${edu.thesis}"</div>` : ""}
          </div>
        `).join("")}
      </div>
      
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}">${t.skills.toUpperCase()} &amp; LAINNYA</h2>
        ${hs.length > 0 ? `<div class="skills-list"><strong>${t.hardSkills}: </strong> ${hs.map(sk => `${sk.name}${showSkillLevel && sk.level !== "Hide" ? ` (${sk.level})` : ''}`).join(", ")}</div>` : ""}
        ${ss.length > 0 ? `<div class="skills-list" style="margin-top:4px"><strong>${t.softSkills}: </strong> ${ss.map(sk => `${sk.name}${showSkillLevel && sk.level !== "Hide" ? ` (${sk.level})` : ''}`).join(", ")}</div>` : ""}
        ${cvData.languages.length > 0 ? `
          <div class="skills-list" style="margin-top: 6px">
            <strong>${t.languages}: </strong>
            ${cvData.languages.map(ln => `${ln.name} (${ln.level})`).join(", ")}
          </div>
        ` : ""}
      </div>
      
      ${cvData.certifications.length > 0 ? `
      <div class="cv-section">
        <h2 class="cv-section-title" style="color: ${currentAccentColor}">${t.certifications.toUpperCase()}</h2>
        ${cvData.certifications.map(cert => `
          <div class="cert-item">
            <span class="cert-name">${cert.name}</span> - <span>${cert.date}</span>
          </div>
        `).join("")}
      </div>
      ` : ""}
    </div>
  `;
}

// RENDER EXECUTIVE (Bold header strip)
function renderExecutiveHTML() {
  const photoHTML = getPhotoHTML(true);
  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const t = translations[cvLanguage];

  return `
    <div class="cv-header" style="background-color: ${currentAccentColor}; ${!showPhoto ? 'padding-left:36px;' : ''}">
      ${photoHTML}
      <div>
        <h1 class="cv-name" style="color: ${currentNameColor === '#1a252f' ? '#ffffff' : currentNameColor}">${cvData.name || "NAMA LENGKAP"}</h1>
        <div class="cv-position">${cvData.title || "Posisi"}</div>
        <div class="cv-contacts" style="${getContactContainerStyles(true, true)}">
          ${cvData.email ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" width="13" height="13"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${cvData.email}</span>` : ""}
          ${cvData.phone ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${cvData.phone}</span>` : ""}
          ${cvData.website ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" width="13" height="13"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>${cvData.website}</span>` : ""}
          ${cvData.portfolio ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>${cvData.portfolio}</span>` : ""}
          ${cvData.location ? `<span class="cv-contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${cvData.location}</span>` : ""}
        </div>
      </div>
    </div>
    
    <div class="cv-body">
      <div class="cv-main">
        ${cvData.summary ? `<div class="cv-summary">${cvData.summary}</div>` : ""}
        
        <div class="cv-section">
          <h2 class="cv-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.experience}</h2>
          ${cvData.experiences.map(exp => `
            <div class="exp-item">
              <div class="exp-header">
                <span class="exp-title-company"><strong>${exp.title}</strong> - ${getCompanyText(exp)}</span>
                <span class="exp-date">${exp.date}</span>
              </div>
              ${exp.bullets.length > 0 ? `
                <ul class="exp-bullets">
                  ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div class="cv-aside">
        <div class="aside-section">
          <h3 class="aside-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.education}</h3>
          ${cvData.educations.map(edu => `
            <div class="edu-item">
              <div class="edu-degree">${edu.degree}</div>
               <div class="edu-school">${getSchoolText(edu)}</div>
              <div class="edu-date">${edu.date}</div>
              ${edu.thesis ? `<div style="font-size:11px;color:#666;margin-top:2px;">${t.thesis}: "${edu.thesis}"</div>` : ""}
            </div>
          `).join("")}
        </div>
        
        ${hs.length > 0 ? `
        <div class="aside-section">
          <h3 class="aside-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.hardSkills}</h3>
          ${hs.map(sk => `<div class="skill-tag">${sk.name}</div>`).join("")}
        </div>
        ` : ""}

        ${ss.length > 0 ? `
        <div class="aside-section">
          <h3 class="aside-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.softSkills}</h3>
          ${ss.map(sk => `<div class="skill-tag">${sk.name}</div>`).join("")}
        </div>
        ` : ""}
        
        ${cvData.languages.length > 0 ? `
        <div class="aside-section">
          <h3 class="aside-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.languages}</h3>
          ${cvData.languages.map(ln => `
            <div class="lang-item">
              <span>${ln.name}</span>
              <span class="lang-level">${ln.level}</span>
            </div>
          `).join("")}
        </div>
        ` : ""}
        
        ${cvData.certifications.length > 0 ? `
        <div class="aside-section">
          <h3 class="aside-section-title" style="color: ${currentAccentColor}; border-bottom-color: ${currentAccentColor}">${t.certifications}</h3>
          ${cvData.certifications.map(cert => `
            <div class="cert-item">
              <div class="cert-name">${cert.name}</div>
              <div style="font-size:11px;color:#666">${cert.date}</div>
            </div>
          `).join("")}
        </div>
        ` : ""}
    </div>
  `;
}


// RENDER CLEAN (Centered header, black underline sections — like Michael Harris style)
function renderCleanHTML() {
  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const t = translations[cvLanguage];

  // Build title line
  const titles = [cvData.title1, cvData.title2, cvData.title3].filter(Boolean);
  const titleLine = titles.join(' | ');

  // Build contact line items
  const contactItems = [
    cvData.location,
    cvData.email,
    cvData.phone ? `+${cvData.phone.replace(/^\+/, '')}` : null,
    cvData.website
  ].filter(Boolean);

  // Skills — flat bullet list, one per line
  const allSkills = [
    ...hs.map(s => s.name + (showSkillLevel && s.level !== 'Hide' ? ` (${s.level})` : '')),
    ...ss.map(s => s.name + (showSkillLevel && s.level !== 'Hide' ? ` (${s.level})` : ''))
  ];

  return `
    <div class="clean-wrapper">
      <!-- HEADER: centered name block -->
      <div class="clean-header">
        <h1 class="clean-name" style="color: ${currentNameColor}">${cvData.name || 'YOUR NAME'}</h1>
        ${titleLine ? `<div class="clean-title" style="color: ${currentAccentColor === '#2c5f8a' ? '#333' : currentAccentColor}">${titleLine}</div>` : ''}
        ${contactItems.length > 0 ? `
        <div class="clean-contacts">
          ${contactItems.map((item, i) => `
            <span class="clean-contact-item">${item}</span>
            ${i < contactItems.length - 1 ? '<span class="clean-sep">|</span>' : ''}
          `).join('')}
        </div>` : ''}
      </div>

      <div class="clean-body">
        <!-- PROFESSIONAL SUMMARY -->
        ${cvData.summary ? `
        <div class="clean-section">
          <h2 class="clean-section-title">PROFESSIONAL SUMMARY</h2>
          <p class="clean-summary">${cvData.summary}</p>
        </div>` : ''}

        <!-- WORK EXPERIENCE -->
        ${cvData.experiences.length > 0 ? `
        <div class="clean-section">
          <h2 class="clean-section-title">${t.experience.toUpperCase()}</h2>
          ${cvData.experiences.map(exp => `
            <div class="clean-exp-item">
              <div class="clean-exp-header">
                <div>
                  <div class="clean-exp-title">${exp.title || ''}</div>
                  <div class="clean-exp-company">${getCompanyText(exp) || ''}</div>
                </div>
                <div class="clean-exp-date">${exp.date || ''}</div>
              </div>
              ${exp.bullets.length > 0 ? `
              <ul class="clean-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
              </ul>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        <!-- EDUCATION -->
        ${cvData.educations.length > 0 ? `
        <div class="clean-section">
          <h2 class="clean-section-title">${t.education.toUpperCase()}</h2>
          ${cvData.educations.map(edu => `
            <div class="clean-edu-item">
              <div class="clean-exp-header">
                <div>
                  <div class="clean-exp-title">${edu.degree || ''}</div>
                  <div class="clean-exp-company">${getSchoolText(edu) || ''}</div>
                </div>
                <div class="clean-exp-date">${edu.date || ''}</div>
              </div>
              ${edu.thesis ? `<div class="clean-thesis">${t.thesis}: "${edu.thesis}"</div>` : ''}
            </div>
          `).join('')}
        </div>` : ''}

        <!-- SKILLS -->
        ${(hs.length > 0 || ss.length > 0) ? `
        <div class="clean-section">
          <h2 class="clean-section-title">${t.skills.toUpperCase()}</h2>
          ${hs.length > 0 ? `
          <ul class="clean-bullets">
            <li><strong>${t.hardSkills}:</strong> ${hs.map(s => s.name + (showSkillLevel && s.level !== 'Hide' ? ` (${s.level})` : '')).join(', ')}</li>
          </ul>` : ''}
          ${ss.length > 0 ? `
          <ul class="clean-bullets">
            <li><strong>${t.softSkills}:</strong> ${ss.map(s => s.name + (showSkillLevel && s.level !== 'Hide' ? ` (${s.level})` : '')).join(', ')}</li>
          </ul>` : ''}
        </div>` : ''}


        <!-- CERTIFICATIONS -->
        ${cvData.certifications.length > 0 ? `
        <div class="clean-section">
          <h2 class="clean-section-title">${t.certifications.toUpperCase()}</h2>
          <ul class="clean-bullets">
            ${cvData.certifications.map(c => `<li>${c.name}${c.date ? ' — ' + c.date : ''}</li>`).join('')}
          </ul>
        </div>` : ''}

        <!-- LANGUAGES -->
        ${cvData.languages.length > 0 ? `
        <div class="clean-section">
          <h2 class="clean-section-title">${t.languages.toUpperCase()}</h2>
          <ul class="clean-bullets">
            ${cvData.languages.map(l => `<li>${l.name} — ${l.level}</li>`).join('')}
          </ul>
        </div>` : ''}
      </div>
    </div>
  `;
}

// Export to PDF
function exportPDF() {
  const shouldSave = document.getElementById("autoSaveToggle") ? document.getElementById("autoSaveToggle").checked : true;
  if (shouldSave) {
    saveCVToList();
  }
  showToast("⏳ Sedang menyiapkan PDF...", "info");
  
  const element = document.getElementById("cvPreview");
  
  // Cache zoom
  const currentZoom = document.getElementById("cvPaperWrapper").style.transform;
  document.getElementById("cvPaperWrapper").style.transform = "scale(1)";
  
  // Clone element to apply inline computed colors and isolate from live preview modifications
  const printElement = element.cloneNode(true);
  printElement.style.setProperty("--accent", currentAccentColor);
  printElement.style.setProperty("--name-color", currentNameColor);
  printElement.style.setProperty("box-shadow", "none");
  printElement.style.setProperty("border-radius", "0");
  
  // Embed full styling rules directly for html2pdf renderer
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    .cv-paper { width: 794px; min-height: 1123px; background: white; color: #333; font-family: 'Inter', sans-serif; position: relative; box-sizing: border-box; }
    .tpl-classic { font-family: Arial, sans-serif; }
    .tpl-classic .cv-header { display: flex; align-items: center; gap: 20px; padding: 28px 36px 20px; border-bottom: 2px solid ${currentAccentColor}; }
    .tpl-classic .cv-photo { width: 90px; height: 90px; border-radius: 4px; object-fit: cover; }
    .tpl-classic .cv-photo-placeholder { width: 90px; height: 90px; border-radius: 4px; background: #f5f5f5; border: 2px solid #e0e0e0; display: flex; align-items: center; justify-content: center; }
    .tpl-classic .cv-name-block { flex: 1; }
    .tpl-classic .cv-name { font-size: 26px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: ${currentNameColor}; line-height: 1.2; }
    .tpl-classic .cv-position { font-size: 14px; color: ${currentAccentColor}; font-weight: 600; margin-top: 4px; }
    .tpl-classic .cv-contacts { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; flex-wrap: wrap; gap: 12px; padding: 8px 36px; border-bottom: 1px solid #e8e8e8; }
    .tpl-classic .cv-contact-item { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: #444; white-space: nowrap; line-height: 1; }
    .tpl-classic .cv-contact-item svg { width: 13px; height: 13px; stroke: ${currentAccentColor}; fill: none; vertical-align: middle; margin-right: 4px; position: relative; top: -1px; }
    .tpl-classic .cv-body { padding: 20px 36px 32px; }
    .tpl-classic .cv-summary { font-size: 12px; line-height: 1.6; color: #333; margin-bottom: 24px; text-align: justify; }
    .tpl-classic .cv-section { margin-bottom: 24px; page-break-inside: avoid; padding-top: 12px; }
    .tpl-classic .cv-section-title { font-size: 13px; font-weight: 700; color: ${currentAccentColor}; border-bottom: 1.5px solid ${currentAccentColor}; padding-bottom: 4px; margin-bottom: 14px; text-transform: uppercase; }
    .tpl-classic .exp-item { margin-bottom: 16px; }
    .tpl-classic .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
    .tpl-classic .exp-title-company { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-classic .exp-date { font-size: 11.5px; color: #666; font-style: italic; }
    .tpl-classic .exp-bullets { margin-top: 6px; padding-left: 16px; }
    .tpl-classic .exp-bullets li { font-size: 11.5px; line-height: 1.65; color: #333; margin-bottom: 4px; list-style-type: disc; }
    .tpl-classic .edu-item { margin-bottom: 14px; }
    .tpl-classic .edu-header { display: flex; justify-content: space-between; align-items: baseline; }
    .tpl-classic .edu-degree { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-classic .edu-date { font-size: 11.5px; color: #666; font-style: italic; }
    .tpl-classic .edu-thesis { font-size: 11px; color: #555; margin-top: 5px; font-style: italic; }
    .tpl-classic .skills-list { font-size: 12px; color: #333; line-height: 1.8; }
    .tpl-classic .skill-sep { color: #aaa; margin: 0 4px; }
    .tpl-classic .lang-list { font-size: 12px; color: #333; line-height: 1.6; }
    .tpl-classic .cert-item { margin-bottom: 6px; font-size: 12px; color: #333; }
    .tpl-classic .cert-name { font-weight: 600; color: #111; }
    
    .tpl-modern { display: flex; }
    .tpl-modern .cv-sidebar { width: 240px; min-width: 240px; background: ${currentAccentColor}; color: white; padding: 30px 22px; display: flex; flex-direction: column; gap: 20px; min-height: 1123px; box-sizing: border-box; }
    .tpl-modern .cv-main-content { flex: 1; padding: 30px 28px; background: white; box-sizing: border-box; }
    .tpl-modern .cv-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 16px; display: block; border: 3px solid rgba(255,255,255,0.4); }
    .tpl-modern .cv-photo-placeholder { width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.15); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; }
    .tpl-modern .cv-name { font-size: 20px; font-weight: 800; color: white; text-align: center; text-transform: uppercase; margin-bottom: 4px; }
    .tpl-modern .cv-position { font-size: 12px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 16px; }
    .tpl-modern .side-section { margin-bottom: 18px; page-break-inside: avoid; }
    .tpl-modern .side-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px; }
    .tpl-modern .contact-item { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: rgba(255,255,255,0.85); margin-bottom: 6px; word-break: break-all; }
    .tpl-modern .contact-item svg { width: 13px; height: 13px; stroke: rgba(255,255,255,0.7); fill: none; }
    .tpl-modern .skill-tag { display: block; font-size: 11px; color: rgba(255,255,255,0.85); margin-bottom: 5px; padding: 3px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .tpl-modern .lang-item { display: flex; justify-content: space-between; font-size: 11px; color: rgba(255,255,255,0.85); }
    .tpl-modern .lang-level { color: rgba(255,255,255,0.6); }
    .tpl-modern .main-section { margin-bottom: 20px; page-break-inside: avoid; }
    .tpl-modern .main-section-title { font-size: 14px; font-weight: 700; color: ${currentAccentColor}; border-bottom: 2px solid ${currentAccentColor}; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; }
    .tpl-modern .cv-summary { font-size: 12px; line-height: 1.6; color: #444; text-align: justify; }
    .tpl-modern .exp-item { margin-bottom: 14px; }
    .tpl-modern .exp-header { display: flex; justify-content: space-between; }
    .tpl-modern .exp-title { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-modern .exp-company { font-size: 12px; color: ${currentAccentColor}; font-weight: 500; }
    .tpl-modern .exp-date { font-size: 11px; color: #888; }
    .tpl-modern .exp-bullets { margin-top: 5px; padding-left: 14px; }
    .tpl-modern .exp-bullets li { font-size: 11.5px; line-height: 1.6; color: #444; }
    .tpl-modern .edu-item { margin-bottom: 10px; }
    .tpl-modern .edu-header { display: flex; justify-content: space-between; }
    .tpl-modern .edu-degree { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-modern .edu-school { font-size: 12px; color: ${currentAccentColor}; }
    .tpl-modern .edu-date { font-size: 11px; color: #888; }
    .tpl-modern .edu-thesis { font-size: 11px; color: #666; margin-top: 2px; }
    
    .tpl-minimal { font-family: Georgia, serif; }
    .tpl-minimal .cv-top-bar { height: 8px; background: ${currentAccentColor}; }
    .tpl-minimal .cv-header { padding: 28px 44px 20px; display: flex; align-items: center; gap: 22px; border-bottom: 1px solid #ddd; }
    .tpl-minimal .cv-photo { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
    .tpl-minimal .cv-photo-placeholder { width: 80px; height: 80px; border-radius: 50%; background: #f0f0f0; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; }
    .tpl-minimal .cv-name { font-size: 28px; font-weight: 700; color: ${currentNameColor}; }
    .tpl-minimal .cv-position { font-size: 14px; color: ${currentAccentColor}; font-style: italic; margin-top: 3px; }
    .tpl-minimal .cv-contacts { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; }
    .tpl-minimal .cv-contact-item { font-size: 12px; color: #555; }
    .tpl-minimal .cv-body { padding: 18px 44px 36px; }
    .tpl-minimal .cv-summary { font-size: 12px; line-height: 1.7; color: #444; margin-bottom: 20px; font-style: italic; border-left: 3px solid ${currentAccentColor}; padding-left: 12px; }
    .tpl-minimal .cv-section { margin-bottom: 20px; page-break-inside: avoid; }
    .tpl-minimal .cv-section-title { font-size: 13px; font-weight: 700; color: ${currentAccentColor}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; font-family: sans-serif; }
    .tpl-minimal .exp-item { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px dotted #e0e0e0; }
    .tpl-minimal .exp-item:last-child { border-bottom: none; }
    .tpl-minimal .exp-header { display: flex; justify-content: space-between; }
    .tpl-minimal .exp-title-company { font-size: 13px; font-weight: 700; color: #111; font-family: sans-serif; }
    .tpl-minimal .exp-date { font-size: 11px; color: #888; font-style: italic; }
    .tpl-minimal .exp-bullets { margin-top: 5px; padding-left: 16px; }
    .tpl-minimal .exp-bullets li { font-size: 11.5px; line-height: 1.65; color: #444; }
    .tpl-minimal .edu-item { margin-bottom: 10px; }
    .tpl-minimal .edu-header { display: flex; justify-content: space-between; }
    .tpl-minimal .edu-degree { font-size: 13px; font-weight: 700; color: #111; font-family: sans-serif; }
    .tpl-minimal .edu-date { font-size: 11px; color: #888; font-style: italic; }
    .tpl-minimal .edu-thesis { font-size: 11px; color: #666; font-style: italic; margin-top: 2px; }
    .tpl-minimal .skills-list { font-size: 12px; color: #444; line-height: 1.6; font-family: sans-serif; }
    
    .tpl-executive { font-family: sans-serif; }
    .tpl-executive .cv-header { background: ${currentAccentColor}; padding: 28px 36px; display: flex; align-items: center; gap: 22px; }
    .tpl-executive .cv-photo { width: 95px; height: 95px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.4); }
    .tpl-executive .cv-photo-placeholder { width: 95px; height: 95px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; }
    .tpl-executive .cv-name { font-size: 26px; font-weight: 800; color: ${currentNameColor === '#1a252f' ? '#ffffff' : currentNameColor}; text-transform: uppercase; }
    .tpl-executive .cv-position { font-size: 13px; color: rgba(255,255,255,0.8); margin-top: 4px; }
    .tpl-executive .cv-contacts { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 10px; }
    .tpl-executive .cv-contact-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,0.85); }
    .tpl-executive .cv-contact-item svg { width: 13px; height: 13px; stroke: rgba(255,255,255,0.7); fill: none; }
    .tpl-executive .cv-body { display: grid; grid-template-columns: 1fr 260px; min-height: 900px; }
    .tpl-executive .cv-main { padding: 20px 28px 28px; border-right: 1px solid #e8e8e8; background: white; }
    .tpl-executive .cv-aside { padding: 20px 22px 28px; background: #f8f9fb; }
    .tpl-executive .cv-summary { font-size: 12px; line-height: 1.6; color: #333; margin-bottom: 18px; }
    .tpl-executive .cv-section { margin-bottom: 18px; page-break-inside: avoid; }
    .tpl-executive .cv-section-title { font-size: 13px; font-weight: 700; color: ${currentAccentColor}; border-bottom: 2px solid ${currentAccentColor}; padding-bottom: 4px; margin-bottom: 10px; text-transform: uppercase; }
    .tpl-executive .exp-item { margin-bottom: 14px; }
    .tpl-executive .exp-header { display: flex; justify-content: space-between; }
    .tpl-executive .exp-title-company { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-executive .exp-date { font-size: 11px; color: #888; }
    .tpl-executive .exp-bullets { margin-top: 5px; padding-left: 14px; }
    .tpl-executive .exp-bullets li { font-size: 11.5px; line-height: 1.6; color: #333; }
    .tpl-executive .aside-section { margin-bottom: 16px; page-break-inside: avoid; }
    .tpl-executive .aside-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: ${currentAccentColor}; border-bottom: 1.5px solid ${currentAccentColor}; padding-bottom: 3px; margin-bottom: 8px; }
    .tpl-executive .edu-item { margin-bottom: 10px; }
    .tpl-executive .edu-degree { font-size: 12px; font-weight: 700; color: #111; }
    .tpl-executive .edu-school { font-size: 11.5px; color: ${currentAccentColor}; }
    .tpl-executive .edu-date { font-size: 11px; color: #888; }
    .tpl-executive .skill-tag { display: block; font-size: 11px; color: #333; padding: 3px 0; border-bottom: 1px solid #e0e0e0; }
    .tpl-executive .lang-item { display: flex; justify-content: space-between; font-size: 11px; color: #333; }
    .tpl-executive .lang-level { color: #888; }
    .tpl-executive .cert-item { font-size: 11px; color: #333; margin-bottom: 5px; }
    .tpl-executive .cert-name { font-weight: 600; color: #111; }

    /* ===== CLEAN TEMPLATE ===== */
    .tpl-clean .clean-wrapper { padding: 40px 52px 44px; font-family: ${cvFont}, Arial, sans-serif; }
    .tpl-clean .clean-header { text-align: center; margin-bottom: 20px; padding-bottom: 0; }
    .tpl-clean .clean-name { font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: ${currentNameColor}; margin: 0 0 6px 0; }
    .tpl-clean .clean-title { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px; }
    .tpl-clean .clean-contacts { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px 4px; font-size: 11.5px; color: #444; }
    .tpl-clean .clean-contact-item { white-space: nowrap; }
    .tpl-clean .clean-sep { color: #999; margin: 0 4px; }
    .tpl-clean .clean-body { }
    .tpl-clean .clean-section { margin-bottom: 16px; page-break-inside: avoid; }
    .tpl-clean .clean-section-title { font-size: 13px; font-weight: 700; color: #111; text-transform: uppercase; border-bottom: 2px solid #111; padding-bottom: 3px; margin-bottom: 10px; margin-top: 0; letter-spacing: 0.5px; }
    .tpl-clean .clean-summary { font-size: 12px; line-height: 1.65; color: #333; margin: 0; }
    .tpl-clean .clean-exp-item { margin-bottom: 12px; }
    .tpl-clean .clean-exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3px; }
    .tpl-clean .clean-exp-title { font-size: 13px; font-weight: 700; color: #111; }
    .tpl-clean .clean-exp-company { font-size: 12px; color: #444; font-weight: 600; margin-top: 1px; }
    .tpl-clean .clean-exp-date { font-size: 11.5px; color: #555; white-space: nowrap; text-align: right; padding-left: 12px; }
    .tpl-clean .clean-edu-item { margin-bottom: 12px; }
    .tpl-clean .clean-bullets { margin: 5px 0 0 0; padding-left: 20px; }
    .tpl-clean .clean-bullets li { font-size: 11.5px; line-height: 1.6; color: #333; margin-bottom: 3px; list-style-type: disc; }
    .tpl-clean .clean-thesis { font-size: 11px; color: #666; font-style: italic; margin-top: 4px; }
  `;
  printElement.appendChild(styleElement);
  
  const opt = {
    margin:       0,
    filename:     `${document.getElementById("cvDocName").value || 'CV'}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().from(printElement).set(opt).save().then(() => {
    showToast("✅ PDF berhasil diunduh!", "success");
    document.getElementById("cvPaperWrapper").style.transform = currentZoom;
    setTimeout(() => showDonationModal(true), 800);
  }).catch(err => {
    console.error(err);
    showToast("❌ Gagal mengunduh PDF", "error");
    document.getElementById("cvPaperWrapper").style.transform = currentZoom;
  });
}

// Export to Word (DOCX)
function exportWord() {
  const shouldSave = document.getElementById("autoSaveToggle") ? document.getElementById("autoSaveToggle").checked : true;
  if (shouldSave) {
    saveCVToList();
  }
  showToast("⏳ Mempersiapkan file Word...", "info");

  const hs = cvData.hardSkills || [];
  const ss = cvData.softSkills || [];
  const lang = cvData.languages || [];
  const certs = cvData.certifications || [];
  const t = translations[cvLanguage];
  
  // Convert profil photo to base64 inline image if exists with active shape & ratio
  let photoImgTag = "";
  if (showPhoto && cvData.photo) {
    let borderRadiusVal = "50%";
    if (photoShape === "square") {
      borderRadiusVal = "0%";
    } else if (photoShape === "rounded-square") {
      borderRadiusVal = "6px";
    }
    
    let heightVal = "90";
    if (photoShape !== "round") {
      if (photoRatio === "3:4") {
        heightVal = "120";
      } else if (photoRatio === "4:6") {
        heightVal = "135";
      }
    }
    
    photoImgTag = `<img src="${cvData.photo}" width="90" height="${heightVal}" style="border-radius: ${borderRadiusVal}; object-fit: cover; border: 2px solid #e0e0e0; margin-right: 15px;" />`;
  }
  
  // Build a clean, semantic document with tables to guarantee perfect layout columns in MS Word
  let docHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Export DOCX</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #333333; }
        .header-table { width: 100%; margin-bottom: 10px; }
        .name { font-size: 24pt; font-weight: bold; color: ${currentNameColor}; text-transform: uppercase; margin: 0; }
        .title { font-size: 13pt; color: ${currentAccentColor}; font-weight: bold; margin-top: 2px; }
        .contacts { font-size: 9.5pt; color: #555555; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 2px solid ${currentAccentColor}; }
        .section-title { font-size: 12pt; font-weight: bold; color: ${currentAccentColor}; border-bottom: 1.5px solid ${currentAccentColor}; margin-top: 15px; margin-bottom: 8px; text-transform: uppercase; padding-bottom: 2px; }
        .summary { font-size: 10.5pt; margin-bottom: 15px; text-align: justify; }
        .item-table { width: 100%; margin-bottom: 4px; table-layout: fixed; }
        .item-title { font-weight: bold; font-size: 11pt; color: #111111; width: 75%; text-align: left; }
        .item-date { text-align: right; font-style: italic; color: #666666; font-size: 10pt; width: 25%; }
        ul { margin-top: 3px; margin-bottom: 6px; padding-left: 20px; }
        li { margin-bottom: 2px; font-size: 10pt; }
        .thesis { font-style: italic; color: #666666; font-size: 9.5pt; margin-top: 2px; }
        .skills-section { font-size: 10pt; margin-bottom: 5px; }
        .cert-item { font-size: 10pt; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          ${photoImgTag ? `<td width="105" valign="top">${photoImgTag}</td>` : ""}
          <td valign="middle">
            <h1 class="name">${cvData.name || "NAMA LENGKAP"}</h1>
            <div class="title">${cvData.title || ""}</div>
          </td>
        </tr>
      </table>
      
      <div class="contacts">
        ${cvData.email ? `<span>✉ ${cvData.email}</span> &nbsp;|&nbsp; ` : ""}
        ${cvData.phone ? `<span>📞 ${cvData.phone}</span> &nbsp;|&nbsp; ` : ""}
        ${cvData.website ? `<span>🔗 ${cvData.website}</span> &nbsp;|&nbsp; ` : ""}
        ${cvData.portfolio ? `<span>📂 ${cvData.portfolio}</span> &nbsp;|&nbsp; ` : ""}
        ${cvData.location ? `<span>📍 ${cvData.location}</span>` : ""}
      </div>
      
      ${cvData.summary ? `<div class="summary">${cvData.summary}</div>` : ""}
      
      <!-- PENGALAMAN -->
      <div class="section-title">${t.experience}</div>
      ${cvData.experiences.length === 0 ? `<p>${t.emptyExp}</p>` : 
        cvData.experiences.map(exp => `
          <table class="item-table" cellspacing="0" cellpadding="0" style="width: 100%;">
            <tr>
              <td class="item-title" style="width: 75%; text-align: left;">${exp.title || "Posisi"} - ${getCompanyText(exp) || "Perusahaan"}</td>
              <td class="item-date" style="width: 25%; text-align: right;">${exp.date || ""}</td>
            </tr>
          </table>
          ${exp.bullets.length > 0 ? `
            <ul>
              ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
            </ul>
          ` : ""}
        `).join("")
      }
      
      <!-- PENDIDIKAN -->
      <div class="section-title">${t.education}</div>
      ${cvData.educations.length === 0 ? `<p>${t.emptyEdu}</p>` : 
        cvData.educations.map(edu => `
          <table class="item-table" cellspacing="0" cellpadding="0" style="width: 100%;">
            <tr>
              <td class="item-title" style="width: 75%; text-align: left;">${edu.degree} - ${getSchoolText(edu)}</td>
              <td class="item-date" style="width: 25%; text-align: right;">${edu.date}</td>
            </tr>
          </table>
          ${edu.thesis ? `<div class="thesis">${t.thesis}: "${edu.thesis}"</div>` : ""}
          <div style="height: 6px;"></div>
        `).join("")
      }
      
      <!-- KEAHLIAN -->
      <div class="section-title">${t.skills}</div>
      <div class="skills-section">
        ${hs.length > 0 ? `<p><strong>${t.hardSkills}:</strong> ${hs.map(s => `${s.name}${showSkillLevel && s.level !== "Hide" ? ` (${s.level})` : ''}`).join(", ")}</p>` : ""}
        ${ss.length > 0 ? `<p><strong>${t.softSkills}:</strong> ${ss.map(s => `${s.name}${showSkillLevel && s.level !== "Hide" ? ` (${s.level})` : ''}`).join(", ")}</p>` : ""}
      </div>
      
      <!-- BAHASA -->
      ${lang.length > 0 ? `
        <div class="section-title">${t.languages}</div>
        <p class="skills-section">${lang.map(l => `${l.name} (${l.level})`).join(", ")}</p>
      ` : ""}
      
      <!-- SERTIFIKASI -->
      ${certs.length > 0 ? `
        <div class="section-title">${t.certifications}</div>
        ${certs.map(c => `
          <div class="cert-item"><strong>${c.name}</strong> - <em>${c.date}</em></div>
        `).join("")}
      ` : ""}
    </body>
    </html>
  `;

  try {
    const converted = htmlDocx.asBlob(docHTML);
    const url = URL.createObjectURL(converted);
    const link = document.createElement("a");
    link.href = url;
    const docName = document.getElementById("cvDocName").value || "CV";
    link.download = `${docName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✅ File Word (.docx) berhasil diunduh!", "success");
    // Tampilkan modal donasi setelah download
    setTimeout(() => showDonationModal(true), 800);
  } catch (error) {
    console.error(error);
    showToast("❌ Gagal mengekspor ke Word", "error");
  }
}

/* ======================================================
   TOAST NOTIFICATION
   ====================================================== */
function showToast(message, type = "info", duration = 3500) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  // Reset class & content
  toast.className = "toast";
  toast.textContent = message;

  // Force reflow so transition re-triggers
  void toast.offsetWidth;

  toast.classList.add("show");
  if (type) toast.classList.add(type);

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

/* ======================================================
   DONATION MODAL
   ====================================================== */
function showDonationModal(fromExport = false) {
  // Buat overlay jika belum ada
  let overlay = document.getElementById("donationOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "donationOverlay";
    overlay.className = "donation-overlay";
    overlay.innerHTML = `
      <div class="donation-box">

        <!-- Header -->
        <div class="don-header">
          <div class="don-emoji" id="donEmoji">☕</div>
          <h2 id="donTitle">Dukung ATS CV Maker!</h2>
          <p class="don-subtitle" id="donSubtitle">Terima kasih telah menggunakan <strong>ATS CV Maker</strong></p>
        </div>

        <!-- Info baris -->
        <div class="don-info-list">
          <div class="don-info-item">
            <span class="don-info-icon">✅</span>
            <span>Semua fitur <strong>100% gratis</strong>, selamanya</span>
          </div>
          <div class="don-info-item">
            <span class="don-info-icon">🚀</span>
            <span>Semoga CV-mu lolos & panggilan interview segera datang!</span>
          </div>
          <div class="don-info-item">
            <span class="don-info-icon">🙏</span>
            <span>Semoga Allah SWT memberikan yang terbaik dalam perjalanan kariermu. <em>Amin.</em></span>
          </div>
        </div>

        <!-- Donasi section: 2 kolom -->
        <div class="don-donate-section">
          <div class="don-donate-left">
            <p class="don-donate-label">☕ Kalau tool ini bermanfaat, boleh traktir kopi via QRIS</p>
            <p class="don-donate-sublabel"><em>Nggak ada paksaan ya — tapi sangat berarti buat kami! 🙏</em></p>
          </div>
          <div class="qr-wrap">
            <img src="qris.png" alt="QRIS Donasi" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
            <div class="qr-fallback">
              📷 Simpan file <strong>qris.png</strong> di sini
            </div>
            <div class="qr-label">Scan QRIS 🙏</div>
          </div>
        </div>

        <button class="btn-donation-close" onclick="closeDonationModal()">
          Oke, Semangat Berkarier! 💪
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  overlay.classList.add("active");

  // Update header sesuai konteks
  const emoji = overlay.querySelector("#donEmoji");
  const title = overlay.querySelector("#donTitle");
  if (fromExport) {
    if (emoji) emoji.textContent = "🎉";
    if (title) title.textContent = "CV kamu berhasil diunduh!";
  } else {
    if (emoji) emoji.textContent = "☕";
    if (title) title.textContent = "Dukung ATS CV Maker!";
  }

  // Tutup jika klik di luar box
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDonationModal();
  });
}

function closeDonationModal() {
  const overlay = document.getElementById("donationOverlay");
  if (overlay) overlay.classList.remove("active");
}


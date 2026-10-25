:root {
  --bg: #0b0b0d;
  --bg-soft: #17171b;
  --panel: #1d1d22;
  --panel-alt: #111316;
  --card: #ededee;
  --text: #f5f7fa;
  --muted: #b2b8c3;
  --accent: #d9a441;
  --accent-2: #dd5d5d;
  --accent-3: #4ea0d9;
  --success: #32d296;
  --shadow: rgba(0, 0, 0, 0.2);
  --border: rgba(255, 255, 255, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: #f7f3f0;
  color: #101010;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
select,
textarea {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.section {
  padding: 5.5rem 0;
}

.section-dark,
.dark-alt {
  background: #101114;
  color: var(--text);
}

.light {
  background: #f4f1ee;
  color: #121212;
}

.accent-band {
  background: linear-gradient(135deg, #111217, #1c1c26);
  color: var(--text);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(13, 15, 17, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 78px;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--text);
}

.brand-mark {
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.7rem;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent), #f0d39a);
  color: #1a1a1a;
  font-weight: 900;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  color: var(--text);
}

.main-nav a {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease;
}

.main-nav a:hover,
.main-nav a:focus-visible {
  color: var(--text);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover,
.button:focus-visible {
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg, var(--accent), #f0d39a);
  color: #111;
  box-shadow: 0 18px 35px rgba(217, 164, 65, 0.25);
}

.button-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text);
}

.hero {
  padding: 5rem 0 4rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  margin: 0 0 1rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
}

.eyebrow-dark {
  color: #1d1d22;
}

.hero-copy h1,
.page-hero h1,
.section-heading h2,
.split-layout h2 {
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.hero-copy h1 {
  font-size: clamp(2.7rem, 5vw, 5rem);
  max-width: 700px;
}

.lead {
  max-width: 620px;
  margin-top: 1.1rem;
  font-size: 1.08rem;
  color: rgba(255, 255, 255, 0.75);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-points {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.hero-points li {
  position: relative;
  padding-left: 1rem;
}

.hero-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
}

.hero-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  border: 1px solid var(--border);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.25);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 1.2rem;
  padding: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-card strong {
  font-size: clamp(2.1rem, 4vw, 3rem);
}

.stat-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
}

.stat-card small {
  color: var(--muted);
}

.mini-grid {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.mini-grid div {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 600;
}

.mini-grid span {
  color: var(--muted);
}

.metrics {
  background: #0d0d10;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.8rem 0;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.4rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  color: var(--text);
  text-align: center;
}

.metric-item strong {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

.metric-item span {
  color: var(--muted);
}

.section-heading {
  margin-bottom: 2.5rem;
  text-align: center;
}

.section-heading.left {
  text-align: left;
}

.section-heading h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  max-width: 800px;
  margin-inline: auto;
}

.section-heading.left h2 {
  margin-inline: 0;
}

.info-grid,
.program-grid,
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
}

.info-card,
.program-card,
.value-card,
.feature-card,
.contact-panel,
.quote-box,
.admin-card,
.table-panel {
  border-radius: 1.25rem;
  box-shadow: 0 16px 36px var(--shadow);
}

.info-card,
.program-card,
.value-card,
.feature-card,
.quote-box {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid rgba(16, 16, 16, 0.05);
}

.info-card h3,
.program-card h3,
.value-card h3,
.feature-card h3 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
}

.program-card {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
}

.accent-gold {
  background: linear-gradient(150deg, #c68e2a, #8d6317);
}

.accent-rose {
  background: linear-gradient(150deg, #de7171, #9a3f3f);
}

.accent-blue {
  background: linear-gradient(150deg, #5ca5d8, #2a5f94);
}

.card-tag {
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 1rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.timeline {
  display: grid;
  gap: 1.2rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  align-items: start;
  gap: 1rem;
  background: #fff;
  border-radius: 1rem;
  padding: 1.2rem 1rem;
  border: 1px solid rgba(16, 16, 16, 0.04);
}

.timeline-item span {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9a441, #f0d39a);
  color: #141414;
  font-weight: 900;
}

.timeline-item h4 {
  margin: 0 0 0.2rem;
}

.cta-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2.3rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  background: linear-gradient(135deg, rgba(217, 164, 65, 0.12), rgba(11, 11, 13, 0.2));
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.site-footer {
  background: #0b0c0f;
  color: rgba(255, 255, 255, 0.8);
  padding-top: 3.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.8fr;
  gap: 2rem;
}

.footer-brand {
  color: var(--text);
}

.site-footer h4 {
  margin-top: 0;
  color: var(--text);
}

.site-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 2rem;
  padding: 1.2rem 0 2rem;
  color: rgba(255, 255, 255, 0.65);
}

.page-hero {
  padding: 4.5rem 0 3.5rem;
}

.narrow {
  max-width: 830px;
}

.page-hero h1 {
  font-size: clamp(2.3rem, 5vw, 4.3rem);
}

.two-column {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: center;
}

.quote-box {
  position: relative;
  font-size: 1.2rem;
  line-height: 1.7;
  font-weight: 600;
  background: linear-gradient(180deg, #fef4e1, #fff);
}

.quote-box::before {
  content: "“";
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 4rem;
  color: rgba(217, 164, 65, 0.45);
  line-height: 1;
}

.values-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.program-list {
  display: grid;
  gap: 1.5rem;
}

.feature-card {
  border-left: 5px solid var(--accent);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.contact-panel {
  background: #fff;
  padding: 1.6rem;
  border: 1px solid rgba(16, 16, 16, 0.05);
}

.alt-panel {
  background: #f7f1eb;
}

form {
  display: grid;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.5rem;
  font-weight: 600;
  color: #101010;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.8rem;
  background: #fff;
  padding: 0.9rem 1rem;
  color: #101010;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.form-status {
  min-height: 1.5rem;
  margin: 0.75rem 0 0;
  font-weight: 600;
  color: #1d2f1f;
}

.form-status.success {
  color: #116d43;
}

.form-status.error {
  color: #883333;
}

.donation-wrap {
  max-width: 900px;
}

.donation-form {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem;
  padding: 1.5rem;
}

.donation-form label,
.donation-form input,
.donation-form select,
.donation-form textarea {
  color: var(--text);
}

.donation-form input,
.donation-form textarea,
.donation-form select {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.12);
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.admin-card {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid rgba(16, 16, 16, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.admin-card span {
  color: #4d4d4d;
  font-weight: 600;
}

.admin-card strong {
  font-size: 2rem;
}

.table-panel {
  background: #fff;
  padding: 1.5rem;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.9rem 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  text-align: left;
  vertical-align: top;
}

th {
  color: #444;
  background: #f2f2f2;
}

@media (max-width: 900px) {
  .hero-grid,
  .split-layout,
  .two-column,
  .contact-grid,
  .info-grid,
  .program-grid,
  .values-grid,
  .admin-grid,
  .footer-grid,
  .metric-grid {
    grid-template-columns: 1fr 1fr;
  }

  .hero-points {
    grid-template-columns: 1fr;
  }

  .main-nav {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-grid,
  .split-layout,
  .two-column,
  .contact-grid,
  .info-grid,
  .program-grid,
  .values-grid,
  .admin-grid,
  .footer-grid,
  .metric-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.8rem 0;
  }

  .button {
    width: 100%;
  }

  .cta-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}

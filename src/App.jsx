import React, { useState, useEffect, useRef } from 'react';

const EVENT_START = new Date('2026-11-04T19:00:00+05:00');
const MAPS_URL = 'https://maps.app.goo.gl/skiLazCrMNvSpHeA6';
const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('Walima Ceremony') +
  '&dates=20261104T140000Z/20261104T180000Z' +
  '&location=' + encodeURIComponent('Amoura Royale Event Complex') +
  '&details=' + encodeURIComponent(
    'Reception of guests at 7:00 PM, dinner at 8:30 PM. Hosts: Mr. & Mrs. Syed Zafar Ali.'
  );

const COUPLES = [
  {
    groom: 'Muhammad Talha',
    groomParents: 'S/o Mr. & Mrs. Syed Zafar Ali',
    bride: 'Ayesha Nisha',
    brideParents: 'D/o Mr. & Mrs. Syed Ashraf Ali',
  },
  {
    groom: 'Muhammad Saad',
    groomParents: 'S/o Mr. & Mrs. Syed Zafar Ali',
    bride: 'Syeda Aqsa Azhar',
    brideParents: 'D/o Mr. & Mrs. Syed Azhar Ali',
  },
];

const CONTACTS = [
  { name: 'Syed Jamshaid Ali', phone: '0301-8479080' },
  { name: 'Syed Mazhar Ali', phone: '0301-4604085' },
  { name: 'Syed Azhar Ali', phone: '0324-4625991' },
];

function copyText(text) {
  return new Promise((resolve, reject) => {
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy refused'));
      } catch (e) {
        reject(e);
      }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(resolve, fallback);
    } else {
      fallback();
    }
  });
}

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = target.getTime() - now;
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Fleuron() {
  return (
    <svg className="fleuron" viewBox="0 0 120 140" aria-hidden="true">
      <g fill="currentColor">
        <path d="M60 8 C70 22 70 40 60 62 C50 40 50 22 60 8 Z" />
        <path d="M58 66 C40 52 34 34 38 20 C50 30 58 46 58 66 Z" />
        <path d="M62 66 C80 52 86 34 82 20 C70 30 62 46 62 66 Z" />
        <path d="M54 74 C32 70 14 58 8 44 C28 46 46 56 54 74 Z" />
        <path d="M66 74 C88 70 106 58 112 44 C92 46 74 56 66 74 Z" />
        <path d="M60 80 C72 80 80 90 80 100 C80 112 70 120 60 120 C50 120 40 112 40 100 C40 90 48 80 60 80 Z M60 92 C54 92 52 98 56 102 C58 106 58 112 60 128 C62 112 62 106 64 102 C68 98 66 92 60 92 Z" fillRule="evenodd" />
      </g>
    </svg>
  );
}

function Divider({ label }) {
  return (
    <div className="divider" role="separator" aria-label={label || undefined}>
      <span className="divider-line" />
      {label ? <span className="divider-label">{label}</span> : <span className="divider-dot" />}
      <span className="divider-line" />
    </div>
  );
}

function Corner({ pos }) {
  return (
    <svg className={'corner corner-' + pos} viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 6 C6 60 30 78 70 78" />
        <path d="M6 6 C60 6 78 30 78 70" />
        <path d="M18 18 C18 48 34 62 58 62 C74 62 78 48 66 44 C58 42 52 48 56 54" />
        <path d="M18 18 C48 18 62 34 62 58" />
        <circle cx="30" cy="30" r="2.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function PhoneRow({ name, phone, onCopied }) {
  const handle = () => {
    copyText(phone).then(
      () => onCopied('Number copied'),
      () => onCopied('Select the number to copy it')
    );
  };
  return (
    <li className="phone-row">
      <span className="phone-name">{name}</span>
      <span className="phone-number">{phone}</span>
      <button type="button" className="chip" onClick={handle} aria-label={'Copy number for ' + name}>
        Copy
      </button>
    </li>
  );
}

export default function App() {
  const left = useCountdown(EVENT_START);
  const [toast, setToast] = useState('');
  const timer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  };

  const copyLink = () => {
    copyText(window.location.href.split('#')[0]).then(
      () => showToast('Invitation link copied'),
      () => showToast('Copy the address from your browser bar')
    );
  };

  return (
    <div className="page">
      <main className="card">
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        <section className="hero">
          <Fleuron />
          <p className="script-small">You are cordially invited at the</p>
          <h1 className="title">Walima Ceremony</h1>
          <Divider label="Of our beloved sons" />
        </section>

        <section className="couples" aria-label="The couples">
          {COUPLES.map((c, i) => (
            <div className="couple" key={c.groom}>
              <div className="person">
                <h2 className="name">{c.groom}</h2>
                <p className="parents">{c.groomParents}</p>
              </div>
              <div className="amp" aria-label="and">&amp;</div>
              <div className="person">
                <h2 className="name">{c.bride}</h2>
                <p className="parents">{c.brideParents}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="when">
          <Divider />
          <p className="date">
            4th November 2026
            <span className="weekday">Wednesday</span>
          </p>

          {left ? (
            <div className="countdown" role="timer" aria-label="Time until the reception begins">
              {[
                ['Days', left.days],
                ['Hours', left.hours],
                ['Minutes', left.minutes],
                ['Seconds', left.seconds],
              ].map(([label, value]) => (
                <div className="count-cell" key={label}>
                  <span className="count-num">{String(value).padStart(2, '0')}</span>
                  <span className="count-label">{label}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="after">Thank you for celebrating with us.</p>
          )}
        </section>

        <section className="details">
          <div className="detail-col">
            <p className="detail-head">Reception of Guests</p>
            <p className="detail-time">7:00 PM</p>
            <p className="detail-head second">Dinner Time</p>
            <p className="detail-time">8:30 PM</p>
          </div>
          <div className="detail-rule" aria-hidden="true" />
          <div className="detail-col">
            <p className="detail-head">Venue</p>
            <p className="venue">Amoura Royale Event Complex</p>
            <div className="actions">
              <a className="btn btn-solid" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                Open location
              </a>
              <a className="btn btn-line" href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Add to calendar
              </a>
            </div>
          </div>
        </section>

        <section className="rsvp">
          <Divider label="R.S.V.P" />
          <p className="rsvp-who">All Family Members</p>

          <div className="rsvp-grid">
            <div className="rsvp-block">
              <p className="block-head">Contact</p>
              <ul className="phones">
                {CONTACTS.map((c) => (
                  <PhoneRow key={c.phone} name={c.name} phone={c.phone} onCopied={showToast} />
                ))}
              </ul>
            </div>
            <div className="rsvp-block">
              <p className="block-head">Awaiting</p>
              <p className="awaiting">Mr. &amp; Mrs. Syed Zafar Ali</p>
              <ul className="phones">
                <PhoneRow name="Ph" phone="0300-8403168" onCopied={showToast} />
              </ul>
            </div>
          </div>
        </section>

        <footer className="foot">
          <p className="regards">With Best Compliments From</p>
          <p className="host">Mr. &amp; Mrs. Syed Zafar Ali</p>
          <button type="button" className="share" onClick={copyLink}>
            Copy invitation link
          </button>
        </footer>
      </main>

      <div className={'toast' + (toast ? ' show' : '')} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

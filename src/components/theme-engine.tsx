"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME_ID,
  getStoreTheme,
  storeThemes,
  THEME_EVENT,
  THEME_STORAGE_KEY,
} from "@/data/themes";

const validThemeIds = new Set(storeThemes.map((theme) => theme.id));

function themeSnapshot() {
  if (typeof window === "undefined") return DEFAULT_THEME_ID;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME_ID;
  return validThemeIds.has(stored) ? stored : DEFAULT_THEME_ID;
}

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

export function ThemeEngine() {
  const pathname = usePathname();
  const activeId = useSyncExternalStore(subscribeTheme, themeSnapshot, () => DEFAULT_THEME_ID);
  const [open, setOpen] = useState(false);
  const [detailId, setDetailId] = useState(activeId);
  const activeTheme = getStoreTheme(activeId);
  const detailTheme = getStoreTheme(detailId);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      delete document.documentElement.dataset.theme;
      return;
    }
    document.documentElement.dataset.theme = activeId;
  }, [activeId, isAdmin]);

  if (isAdmin) return null;

  function applyTheme(id: string) {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
    document.documentElement.dataset.theme = id;
    window.dispatchEvent(new Event(THEME_EVENT));
    setDetailId(id);
  }

  return (
    <>
      <button className="themeStudioTrigger" onClick={() => { setOpen(true); setDetailId(activeId); }} aria-label="Open storefront theme studio">
        <span className="themeTriggerPalette" aria-hidden="true">
          {activeTheme.palette.slice(0, 4).map((colour) => <i style={{ background: colour.hex }} key={colour.role} />)}
        </span>
        <span><strong>Theme studio</strong><small>{activeTheme.name}</small></span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>

      {open && <button className="themeStudioScrim" onClick={() => setOpen(false)} aria-label="Close theme studio" />}
      <aside className={`themeStudioPanel ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Storefront theme studio">
        <header className="themeStudioHead">
          <div><span>Client presentation mode</span><h2>Theme Studio</h2><p>Switch the entire storefront direction live.</p></div>
          <button onClick={() => setOpen(false)} aria-label="Close theme studio"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </header>

        <div className="themeStudioBody">
          <div className="themeStudioIntro"><strong>08 curated directions</strong><p>Each preset uses a complete semantic palette—not a simple accent-colour swap.</p></div>
          <div className="themePresetGrid">
            {storeThemes.map((theme) => (
              <button className={`themePreset ${activeId === theme.id ? "active" : ""} ${detailId === theme.id ? "inspecting" : ""}`} onClick={() => setDetailId(theme.id)} key={theme.id}>
                <span className="themePresetNumber">{theme.number}</span>
                <span className="themePresetPalette" aria-hidden="true">{theme.palette.slice(0, 6).map((colour) => <i style={{ background: colour.hex }} key={colour.role} />)}</span>
                <strong>{theme.name}</strong>
                <small>{theme.family}</small>
                {activeId === theme.id && <b>Live</b>}
              </button>
            ))}
          </div>

          <section className="themeDetail" aria-live="polite">
            <div className="themeDetailTitle"><div><span>{detailTheme.number} · {detailTheme.family}</span><h3>{detailTheme.name}</h3></div>{activeId === detailTheme.id && <strong>Currently live</strong>}</div>
            <p>{detailTheme.description}</p>
            <div className="themePersonality">{detailTheme.personality.map((trait) => <span key={trait}>{trait}</span>)}</div>
            <dl className="themePaletteDetails">
              {detailTheme.palette.map((colour) => (
                <div key={colour.role}>
                  <dt><i style={{ background: colour.hex }} /><span><strong>{colour.label}</strong><small>{colour.role}</small></span><code>{colour.hex}</code></dt>
                  <dd>{colour.usage}</dd>
                </div>
              ))}
            </dl>
            <div className="themeBestFor"><span>Best suited to</span><p>{detailTheme.bestFor}</p></div>
            <button className="themeApplyButton" onClick={() => applyTheme(detailTheme.id)} disabled={activeId === detailTheme.id}>{activeId === detailTheme.id ? "Theme is live" : `Apply ${detailTheme.name}`}<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </section>
        </div>

        <footer className="themeStudioFoot"><button onClick={() => applyTheme(DEFAULT_THEME_ID)}>Reset to Royal Heritage</button><span>Saved in this browser</span></footer>
      </aside>
    </>
  );
}

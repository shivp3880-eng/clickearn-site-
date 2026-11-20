import { auth, db, SETTINGS } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const today = () => new Date().toLocaleDateString("en-CA");
export const toINR = p => (p / SETTINGS.pointsPerRupee).toFixed(2);
export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const fmtDate = t => t?.toDate ? t.toDate().toLocaleDateString("en-IN") : "-";

export function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.style.display = "block";
  clearTimeout(t._t); t._t = setTimeout(() => t.style.display = "none", 3000);
}

export function requireUser(cb) {
  onAuthStateChanged(auth, u => u ? cb(u) : (location.href = "login.html"));
}
export async function logout() { await signOut(auth); location.href = "index.html"; }

export async function ensureUserDoc(user, name) {
  const ref = doc(db, "users", user.uid);
  if ((await getDoc(ref)).exists()) return;
  await setDoc(ref, {
    name: name || user.displayName || user.email.split("@")[0],
    email: user.email,
    refCode: "CEI" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    referredBy: localStorage.getItem("ref") || "",
    points: 0, todayPoints: 0, todayDate: today(), lastCheckin: 0, spinDate: "", spinCount: 0, quizDate: "", earned: 0, tasks: 0,
    createdAt: serverTimestamp()
  });
  setDoc(doc(db, "stats", "global"), { totalUsers: increment(1) }, { merge: true }).catch(() => {});
}

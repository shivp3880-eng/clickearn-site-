import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ensureUserDoc, toast } from "./common.js";

const ref = new URLSearchParams(location.search).get("ref");
if (ref) localStorage.setItem("ref", ref.toUpperCase());
const go = () => (location.href = "dashboard.html");
const fail = e => toast((e.code || e.message).replace("auth/", "").replaceAll("-", " "));

document.getElementById("google").onclick = async () => {
  try { const r = await signInWithPopup(auth, new GoogleAuthProvider()); await ensureUserDoc(r.user); go(); } catch (e) { fail(e); }
};
document.getElementById("form").onsubmit = async ev => {
  ev.preventDefault();
  const f = ev.target, email = f.email.value.trim(), pw = f.password.value;
  try {
    const reg = document.body.dataset.page === "register";
    const r = reg ? await createUserWithEmailAndPassword(auth, email, pw) : await signInWithEmailAndPassword(auth, email, pw);
    await ensureUserDoc(r.user, reg ? f.name.value.trim() : "");
    go();
  } catch (e) { fail(e); }
};

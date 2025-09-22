import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// Pages
const signupPage = document.getElementById('signupPage');
const loginPage = document.getElementById('loginPage');
const rulesPage = document.getElementById('rulesPage');

// Navigation
document.getElementById('toLogin').addEventListener('click',()=>{signupPage.classList.add('hidden');loginPage.classList.remove('hidden');});
document.getElementById('toSignup').addEventListener('click',()=>{loginPage.classList.add('hidden');signupPage.classList.remove('hidden');});

// Signup
document.getElementById('signupBtn').addEventListener('click',()=>{
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const pass = document.getElementById('signupPass').value;
  createUserWithEmailAndPassword(auth,email,pass)
    .then((userCredential)=>{
      const userId = userCredential.user.uid;
      set(ref(db,'users/'+userId),{name,email,score:{player:0,computer:0,draw:0}});
      alert("Signup Successful");
      signupPage.classList.add('hidden');loginPage.classList.remove('hidden');
    }).catch((err)=>alert(err.message));
});

// Login
document.getElementById('loginBtn').addEventListener('click',()=>{
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  signInWithEmailAndPassword(auth,email,pass)
    .then((userCredential)=>{
      loginPage.classList.add('hidden');rulesPage.classList.remove('hidden');
    }).catch((err)=>alert(err.message));
});

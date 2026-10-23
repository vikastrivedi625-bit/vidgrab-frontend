const urlInput=document.getElementById("url");
const result=document.getElementById("result");
const fetchBtn=document.getElementById("fetchBtn");
const pasteBtn=document.getElementById("pasteBtn");
const themeBtn=document.getElementById("themeBtn");

function detectPlatform(value){
  const s=value.toLowerCase();
  if(/youtube\.com|youtu\.be/.test(s)) return s.includes("/shorts/") ? "YouTube Shorts" : "YouTube";
  if(/instagram\.com/.test(s)) return "Instagram";
  if(/facebook\.com|fb\.watch/.test(s)) return "Facebook";
  return null;
}

fetchBtn.addEventListener("click", async () => {
const value = urlInput.value.trim();

if (!value) {
show("Please paste a video URL first.", "No URL entered");
return;
}

const platform = detectPlatform(value);

if (!platform) {
show("Please enter a valid YouTube, Instagram or Facebook URL.", "Unsupported URL");
return;
}

show("Connecting to VidGrab server...", "Please wait");

try {
const response = await fetch("https://vidgrab-backend-ez8b.onrender.com/api/download", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ url: value })
});

const data = await response.json();

if (!response.ok) {
  show(data.error || data.message || "The server could not process this URL.", "Request failed");
  return;
}

show(data.message || "Server responded successfully.", "VidGrab response");

} catch (error) {
show("Could not connect to the server. Please try again.", "Connection error");
}
});
function show(msg,title){
  result.classList.remove("hidden");
  result.innerHTML=`<h3>${title}</h3><p>${msg}</p><span class="tag">Demo UI • Backend integration required</span>`;
}

pasteBtn.addEventListener("click",async()=>{
  try{
    const text=await navigator.clipboard.readText();
    urlInput.value=text;
    urlInput.focus();
  }catch(e){
    urlInput.focus();
    urlInput.placeholder="Paste your URL here…";
  }
});

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  if(document.body.classList.contains("light")){
    document.body.style.background="#f5f7fa";
    document.body.style.color="#101820";
    themeBtn.textContent="☀";
  }else{
    document.body.style.background="#071019";
    document.body.style.color="#f4f7fb";
    themeBtn.textContent="☾";
  }
});

urlInput.addEventListener("keydown",e=>{if(e.key==="Enter") fetchBtn.click()});

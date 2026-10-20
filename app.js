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

fetchBtn.addEventListener("click",()=>{
  const value=urlInput.value.trim();
  if(!value){show("Paste a video URL first.","No URL entered");return}
  let platform=detectPlatform(value);
  if(!platform){show("Please enter a valid YouTube, Shorts, Instagram or Facebook URL.","Unsupported URL");return}
  show(`Detected ${platform}. The production backend will verify whether the requested content can be downloaded legally and according to the platform's rules.`, "Ready for backend");
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

import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const MODEL="Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
const SYSTEM=`Tu es IA UMB, le moteur citoyen d'Un Monde Bouge.
Tu es perspicace, rigoureux et utile. Comprends l'intention avant de répondre.
Si la demande est ambiguë, fais l'hypothèse la plus raisonnable et indique-la brièvement.
Réponds en français sauf demande contraire.
Structure les réponses lorsque cela aide: faits, analyse, options, plan d'action.
Ne prétends jamais avoir accès à Internet, à des données privées ou à des outils que tu n'as pas.
Ne fabrique pas de faits. Si une information peut être incertaine, signale-le.
Adapte ton niveau de détail à la demande et évite le remplissage.`;

const $=s=>document.querySelector(s);
const chat=$("#chat"),welcome=$("#welcome"),status=$("#status"),dot=$("#dot"),form=$("#form"),input=$("#message"),send=$("#send");
let engine=null, history=[];

function addMessage(role,text){
  chat.hidden=false; welcome.classList.add("compact");
  const row=document.createElement("div"); row.className="message "+role;
  const b=document.createElement("div"); b.className="bubble";
  const l=document.createElement("div"); l.className="label"; l.textContent=role==="user"?"VOUS":"IA UMB";
  const p=document.createElement("div"); p.textContent=text;
  b.append(l,p); row.append(b); chat.append(row); chat.scrollTop=chat.scrollHeight;
}
function setStatus(t,ready=false){status.textContent=t; document.querySelector(".engine").classList.toggle("ready",ready)}

async function boot(){
  try{
    setStatus("Chargement du modèle…");
    engine=await CreateMLCEngine(MODEL,{initProgressCallback:p=>{if(p.text) setStatus(p.text.slice(0,70))}});
    setStatus("IA prête",true);
    addMessage("assistant","Bonjour. Je suis l’IA UMB. Le modèle fonctionne directement dans ton navigateur. Pose-moi une question.");
  }catch(e){
    console.error(e); setStatus("WebGPU requis"); addMessage("assistant","Le moteur local n’a pas pu démarrer. Essaie avec un navigateur récent compatible WebGPU (Chrome ou Edge à jour).");
  }
}
async function ask(text){
  if(!engine)return;
  addMessage("user",text); send.disabled=true; input.disabled=true; setStatus("Réflexion…");
  history.push({role:"user",content:text});
  try{
    const r=await engine.chat.completions.create({messages:[{role:"system",content:SYSTEM},...history],temperature:.55,top_p:.9,max_tokens:700});
    const reply=r.choices?.[0]?.message?.content?.trim()||"Je n’ai pas pu générer de réponse.";
    history.push({role:"assistant",content:reply}); addMessage("assistant",reply);
    if(history.length>12) history=history.slice(-10);
  }catch(e){addMessage("assistant","Une erreur est survenue pendant la génération. Réessaie."); console.error(e)}
  finally{send.disabled=false;input.disabled=false;input.focus();setStatus("IA prête",true)}
}
form.addEventListener("submit",e=>{e.preventDefault();const t=input.value.trim();if(t){input.value="";ask(t)}});
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
$("#clear").addEventListener("click",()=>{history=[];chat.innerHTML="";welcome.classList.remove("compact");addMessage("assistant","Nouvelle conversation. Que veux-tu construire, comprendre ou analyser ?")});
document.querySelectorAll("[data-q]").forEach(b=>b.addEventListener("click",()=>ask(b.dataset.q)));
boot();
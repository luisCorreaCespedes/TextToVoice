const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const voiceBtn = document.querySelector("button");
let synth = speechSynthesis;
let isSpeaking = true; 

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Microsoft Raul - Spanish (Mexico)" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);

    }
}

synth.addEventListener("voiceschanged", voices);

function textToVoice(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    synth.speak(utternance);
};

voiceBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToVoice(textarea.value);
        }
        if (textarea.value.length > 50) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                voiceBtn.innerText = "Pausar";
            } else {
                synth.pause();
                isSpeaking = true;
                voiceBtn.innerText = "Resumir";
            }
            setInterval( () => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    voiceBtn.innerText = "Convertir";
                }
            });
        } else {
            voiceBtn.innerText = "Convertir";
        }
    }
})
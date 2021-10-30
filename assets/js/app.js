const textarea = document.querySelector("textarea");
voiceBtn = document.querySelector("button");

function textToVoice(text){
    let utternance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utternance);
};

voiceBtn.addEventListener("click", e =>{
    e.preventDefault();
    if (textarea.value !== "") {
        textToVoice(textarea.value);
    }
})
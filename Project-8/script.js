const qrApi = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
const input = document.querySelector("#input");
const getQrBtn = document.querySelector("button");
const qr = document.querySelector("#qr");
const img_box = document.querySelector(".img_box");
const loding = document.querySelector("#loding");
const download = document.querySelector("#download")

function getQrCode(apiUrl) {
    qr.setAttribute("src", apiUrl + input.value);
}
getQrBtn.addEventListener("click", () => {
    if (input.value === ""|| input.value == 0) {
        getQrBtn.innerText = " Plies enter any value";
        getQrBtn.style.background = "red";
        getQrBtn.style.cursor = "no-drop";
        input.style.border = "1px solid red";
        input.style.cursor = "no-drop";
        setTimeout(() => {
            getQrBtn.innerText = "Generate QR Code";
            getQrBtn.style.background = "#494eea";
            getQrBtn.style.cursor = "pointer";
            input.style.border = "1px solid #494ee0";
            input.style.cursor = "";
        }, 2000);
    } else {
        img_box.style.display = "flex";
        getQrCode(qrApi);
    }

});

// Download function to url
const downloadBtn = document.querySelector('#download');
downloadBtn.addEventListener('click', async () => {
    try {
        const responseUrl = await fetch(qrApi + input.value);
        const file = await responseUrl.blob();
        const link = document.createElement('a')
        link.href = URL.createObjectURL(file)
        link.download = new Date().getTime()
        link.click();
    } catch (error) {
        getQrBtn.innerText = "Download failed";
        setTimeout(() => {
            getQrBtn.innerText = "Generate QR Code";
        }, 1000)
    }
})
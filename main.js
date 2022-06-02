const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    //fetching file and return response as blob
    fetch(url).then(res => res.blob()).then(file => {
        //URL create a url of passed object
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        //passing tempUrl as href value of a tag
        aTag.href = tempUrl;
        //passing file last name and extension as download value of a tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        //adding a tag inside body
        document.body.appendChild(aTag);
        //clicking a tag so the file download
        aTag.click();
        download.innerText = "Download File";
        //removing tempUrl from the document
        URL.revokeObjectURL(tempUrl);
        //removing a tag once file downloaded
        aTag.remove();
    }).catch(() =>{
        alert("Download file failed!");
        downloadBtn.innerText = "Download File";
    });
}
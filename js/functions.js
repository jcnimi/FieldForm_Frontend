function uploadFile(docCode){

    const fileId = `${docCode}_file`;
    const linkId = `${docCode}_link`;
    const checkListId = document.getElementById(`${docCode}_hid`).value;

    if(checkListId == 0){
        // a valid checklist id must exist
        alert("veillez d'abord cocher avant d'attacher le document");
        return;
    }

    const file = document.getElementById(fileId).files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
  
    fileReader.onload = (event) => {
        try {
            //const base64String = btoa(String.fromCharCode(...new Uint8Array(event.target.result)));
            var base64String = btoa(
                new Uint8Array(event.target.result)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const file_info = {
                filename: file.name,
                filesize: file.size,
                filetype: file.type,
                filelastModifiedDate: file.lastModifiedDate,
                filecontent: base64String,
                action: 'add',
                checklistid: checkListId
            };
            //console.log('file_info: ', file_info,  JSON.stringify(file_info));
            fetch("https://cdwebapsvr.fincadrc.com:8002/customer/loan/file/createorupdate", {
                method: "POST",
                body: JSON.stringify(file_info),
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(result => {
                //console.log( JSON.stringify(result))
                if(result !== null && result.status === 'success'){
                    //add the link
                    console.log("Result success")
                    let linkObj = document.getElementById(linkId);
                    linkObj.href = `https://cdwebapsvr.fincadrc.com:8002/customer/loan/file/view/${checkListId}`;
                    linkObj.innerHTML = file.name
                    //console.log(linkObj)
                }
            }).catch(error => {
                // handle the error
                console.log(error)
                alert("Error: " + str(error))
            });
        } catch (error){
            alert(error)
        }
    }
}

//saving checklist choice
function saveCheckListChoice(docCode){

    console.log("In checklist choice")

    let urlParams = new URLSearchParams(window.location.search);
    const group = urlParams.get('group');
    const userId = urlParams.get('userid');

    const pret_sollicite_id_ = document.getElementById("hid_request_id").value;
    //const document_checklist_ = docChkList; 
    const chkApprobCRO = document.getElementById(`${docCode}_cro`);
    const Approbation_agent_ =  (chkApprobCRO.checked == true ? 1 : 0);
    const chkApprobCCC = document.getElementById(`${docCode}_ccc`);
    const Approbation_ccc_ = (chkApprobCCC.checked == true ? 1 : 0);;
    const code_document_ = docCode;
  
    const params = {
        "pret_sollicite_id" : pret_sollicite_id_,
        //"document_checklist" : document_checklist_,
        "Approbation_agent" : Approbation_agent_,
        "Approbation_ccc" : Approbation_ccc_,
        "code_document" : code_document_
    }
    //console.log("CheckList params : ", params);
    //Send request
    fetch("https://cdwebapsvr.fincadrc.com:8002/customer/loan/checklist/createorupdate", {
        method: "POST",
        body: JSON.stringify(params),
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(result => {
        console.log( JSON.stringify(result));
        document.getElementById(`${docCode}_hid`).value = result.data.checklist_id;
    }).catch(error => {
        // handle the error
        console.log(error);
    });
}
    //check existence of session id
    let sessionId = sessionStorage.getItem("sessionid");
    if(sessionId === null){
        window.location.replace(`index.htm`);
    }

    //deconexion
    document.getElementById("decon").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.replace(`index.htm`);
        sessionStorage.clear();
    });
    
    document.getElementById("critere").addEventListener("change", () => {
        var crit = document.getElementById("critere");
        if(crit.value === 'date'){
            //hide value
            document.getElementById('valeur').style.display = 'none';
            document.getElementById('lblval').style.display = 'none';
            //show date debut et date fin
            document.getElementById('date_debut').style.display = 'inline';
            document.getElementById('date_fin').style.display = 'inline';

            document.getElementById('lbldebut').style.display = 'inline';
            document.getElementById('lblfin').style.display = 'inline';
        } else {
            //show value
            document.getElementById('valeur').style.display = 'inline';
            document.getElementById('lblval').style.display = 'inline';
            //Hide date debut et date fin
            document.getElementById('date_debut').style.display = 'none';
            document.getElementById('date_fin').style.display = 'none';

            document.getElementById('lbldebut').style.display = 'none';
            document.getElementById('lblfin').style.display = 'none';
        }
    });

    document.getElementById("valider").addEventListener("click", (e) => {
        e.preventDefault();
        
        const userid = urlParams.get('userid');
        const group = urlParams.get('group');
        const accessLevel = (group === 'admin' || group === 'ccc' ? 'all' : 'restricted');
        const crit = document.getElementById("critere").value;
        if(crit === 'date'){
            const debut = document.getElementById("date_debut").value;
            const fin = document.getElementById("date_fin").value;
            fetch(`https://cdwebapsvr.fincadrc.com:8001/customer/loan/view/date/${debut}/${fin}/${userid}/${accessLevel}`, {
                method: "GET",
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(result => {
                    //delete existing row
                    deleteAllRowsTable("loans");
                    if(result !== null && result.status === 'success'){
                        //add new row
                        const loan_requests = result.data
                        for (let item of loan_requests) {
                            loadTableLineData(item,"loans");
                        } 
                    }  
                }).catch(error => {
                    // handle the error
                    console.log(error)
            });
        } else {
            const valeur = document.getElementById("valeur").value;
            fetch(`https://cdwebapsvr.fincadrc.com:8001/customer/loan/view/${crit}/${valeur}/${userid}/${accessLevel}`, {
                method: "GET",
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(result => {
                    //delete existing row
                    deleteAllRowsTable("loans");
                    if(result !== null && result.status === 'success'){
                        //add new row
                        const loan_requests = result.data
                        for (let item of loan_requests) {
                            loadTableLineData(item,"loans");
                        } 
                    }  
                }).catch(error => {
                    // handle the error
                    console.log(error)
            });
        }
    });

    function deleteAllRowsTable(tableid){
        var tableHeaderRowCount = 1;
        var tableE = document.getElementById(tableid);
        var rowCount = tableE.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            tableE.deleteRow(tableHeaderRowCount);
        }
    }

    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();

            let cell1 = row.insertCell();
            let text1 = document.createTextNode("");

            cell1.appendChild(text1);


            for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
            }
        }
    }

    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();

        let th1 = document.createElement("th");
        let text1 = document.createTextNode("Actions");
        th1.appendChild(text1);
        row.appendChild(th1);

        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function loadTableLineData(lineData, tableId, userId, fullname, branch, group) {

        const base_url = window.location.origin;

        const tableElt = document.getElementById(tableId);
        let row = tableElt.insertRow();
   
        //actions
        let actionsRow = row.insertCell(0);
        actionsRow.innerHTML =  `<div>
          <span>
            <a href="${base_url}/index-form.htm?userid=${userId}&name=${fullname}&branch=${branch}&group=${group}&requestid=${lineData.id}&prospectid=${lineData.prospect_id}&action=edit">
                <img src="img/edit_8272589.png" alt="ajouter" width="20px" class="action" title="Modifier formulaire">
            </a>
          </span>
          <span>
            <a href="${base_url}/index-form.htm?requestid=${lineData.id}&action=delete" title="Annuler formulaire">
                <img src="img/delete.png" alt="annuler" width="20px" class="action">
            </a>
          </span>
        </div>`

        let id = row.insertCell(1);
        id.innerHTML = lineData.id;

        let date_demande = row.insertCell(2);
        date_demande.innerHTML = lineData.date_demande;

        let montant = row.insertCell(3);
        montant.innerHTML = lineData.montant;

        let echeance = row.insertCell(4);
        echeance.innerHTML = lineData.echeance;

        let but = row.insertCell(5);
        but.innerHTML = lineData.but;

        let repartition = row.insertCell(6);
        repartition.innerHTML = lineData.repartition;

        let contribution = row.insertCell(7);
        contribution.innerHTML = lineData.contribution;

        let rbst_facile = row.insertCell(8);
        rbst_facile.innerHTML = lineData.rbst_facile;

        let name_prospect = row.insertCell(9);
        name_prospect.innerHTML = lineData.name_prospect;
    }


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    const branch = urlParams.get('branch')
    const userid = urlParams.get('userid')
    const name_ = urlParams.get('name')
    const group = urlParams.get('group')
    
    let branchElt = document.getElementById("branch")
    branchElt.innerHTML = branch 

    let usrElt = document.getElementById("user")
    usrElt.innerHTML = group + "/" + name_

    const accessLevel = (group === 'admin' || group === 'ccc' ? 'all' : 'restricted');


    //add url
    const addDiv = document.getElementById("adddiv");
    addDiv.insertAdjacentHTML('afterbegin',`
    <div class="row">
    <a href="index-form.htm?userid=${userid}&name=${name_}&branch=${branch}&group=${group}&requestid=0&prospectid=0&action=add">
        <img src="img/plus_1828817.png" alt="" width="35px" class="action" title="Nouveau formulaire">
    </a>
    </div>`);

    console.log("after insert html code");


    //get list of request
    fetch(`https://cdwebapsvr.fincadrc.com:8001/customer/loan/view/all/0/${userid}/${accessLevel}`, {
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(result => {
            //console.log( JSON.stringify(result))
            if(result !== null && result.status === 'success'){
                const loan_requests = result.data

                //console.log(loan_requests)
                for (let item of loan_requests) {
                    //console.log("item: ", item)
                    loadTableLineData(item, "loans", userid, name_, branch, group);
                } 
                //loadTableData([]);
            }  
        }).catch(error => {
            // handle the error
            console.log(error)
    });

    



    
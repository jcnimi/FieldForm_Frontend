import { fetchData, todayDate } from "./comonlib.js";

//check session id
let sessionId = sessionStorage.getItem("sessionid");
if(sessionId === null){
    window.location.replace(`index.htm`);
}

//deconnexion
document.getElementById("decon").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace(`index.htm`);
    sessionStorage.clear();
});

//loading the form
window.addEventListener('load', async function () {
    let url = '';
    let urlParams = new URLSearchParams(window.location.search);
    const branch = urlParams.get('branch');
    const name_ = urlParams.get('name');
    const group = urlParams.get('group');
    
    let branchElt = document.getElementById("branch");
    branchElt.innerHTML = branch; 

    let usrElt = document.getElementById("user");
    usrElt.innerHTML = group + "/" + name_;


    //prospect
    const action = urlParams.get('action');
    const prospectid = urlParams.get('prospectid');
    document.getElementById("hid_prospect_edit").value = action;
    document.getElementById("hid_prospect_id").value = prospectid;

    //request
    const requestid = urlParams.get('requestid');
    document.getElementById("hid_request_edit").value = (requestid == 0 ? 'add' : 'edit');
    document.getElementById("hid_request_id").value = urlParams.get('requestid');

    //business


    //initialize inputs
    document.getElementById("date_demande").value = todayDate(); 

    //Load the prospect data if prospectid != 0
    if(prospectid > 0){
        url = `/customer/loan/prospect/view/${prospectid}`;
        try{
            document.body.style.setProperty('cursor', 'progress');
            const result = await fetchData(url, 'GET');
            if(result !== null && result.status === 'success'){
                if(result.hasOwnProperty('data')){
                    console.log('Prospect: ', result)
                        //set the data
                    document.getElementById("customer_number").value = result.data[0].customer_number;
                    document.getElementById("name_prospect").value = result.data[0].name_prospect;
                    document.getElementById("birthday_prospect").value = result.data[0].birthday_prospect;
                    document.getElementById("genre_prospect").value = result.data[0].genre_prospect;
                    document.getElementById("id_type_prospect").value = result.data[0].id_type_prospect;
                    document.getElementById("id_number_prospect").value = result.data[0].id_number_prospect;
                    document.getElementById("adresse_prospect").value = result.data[0].adresse_prospect;
                    document.getElementById("telephone_prospect").value = result.data[0].telephone_prospect;
                    document.getElementById("etat_civil_prospect").value = result.data[0].etat_civil_prospect;
                    document.getElementById("epouse_prospect").value = result.data[0].epouse_prospect;
                    document.getElementById("cycle_loan_prospect").value = result.data[0].cycle_loan_prospect; 
                    document.getElementById("duree_menage_date").value = result.data[0].duree_menage_date;
                }
            }
            document.body.removeAttribute('style'); 
        }
        catch(err){
            console.log(err)
        }
        finally{
            document.body.removeAttribute('style'); 
        }
    }

    //Load the request data if requestid != 0
    if(requestid > 0){
        url = `/customer/loan/view/pret/${requestid}/0/all`;
        try{
            document.body.style.setProperty('cursor', 'progress');
            const result = await fetchData(url, 'GET');
            console.log('request: ', result)
            if(result !== null && result.status === 'success'){
                if(result.hasOwnProperty('data')){
                        //set the data
                        document.getElementById("date_demande").value = result.data[0].date_demande;
                        document.getElementById("montant_sollicite").value = result.data[0].montant;
                        document.getElementById("echeance_pret").value = result.data[0].echeance;
                        document.getElementById("but_pret").value = result.data[0].but;
                        document.getElementById("repartition_pret").value = result.data[0].repartition;
                        document.getElementById("contribution_pret").value = result.data[0].contribution;
                        document.getElementById("rbst_facile").value = result.data[0].rbst_facile;
                    }
                }
                document.body.removeAttribute('style'); 
        }
        catch(err){
            console.log(err)
        }
        finally{
            document.body.removeAttribute('style'); 
        }
    }


    //Load business data with request id if prospect_id > 0
    //set to add mode
    document.getElementById("hid_business_edit").value = 'add';
    if(requestid > 0){
        url = `/customer/loan/business/view/${requestid}`;
        try{
            document.body.style.setProperty('cursor', 'progress');
            const result = await fetchData(url, 'GET');
            console.log('Business: ', result)
            if(result !== null && result.status === 'success'){
                if(result.hasOwnProperty('data')){
                        //set to edit mode
                        document.getElementById("hid_business_edit").value = 'edit';
                        //set the data
                        document.getElementById("name_business").value = result.data[0].name_business;
                        document.getElementById("activite1").value = result.data[0].activite1;
                        document.getElementById("activite2").value = result.data[0].activite2;
                        document.getElementById("activite3").value = result.data[0].activite3;
                        document.getElementById("adress_business").value = result.data[0].adress_business;
                        document.getElementById("point_vente").value = result.data[0].point_vente;

                        //radio
                        let partenaire_business = result.data[0].partenaire_business;
                        let radioGroup  = document.getElementsByName("partenaire_business");
                        for (let radioE of radioGroup){
                            if (radioE.value == partenaire_business) {    
                                radioE.checked = true;                     
                            }
                        }

                        document.getElementById("noms_partenaires").value = result.data[0].noms_partenaires;
                        document.getElementById("duree_activite").value = result.data[0].duree_activite;
                        document.getElementById("date_experience_business").value = result.data[0].date_experience_business;
                        document.getElementById("statut_propriete_bus").value = result.data[0].statut_propriete_bus;

                        //Enregistrement legal
                        let enregistrement_legal  = result.data[0].enregistrement_legal;
                        radioGroup  = document.getElementsByName("enregistrement_legal");
                        for (let radioE of radioGroup){
                            if (radioE.value == enregistrement_legal) {    
                                radioE.checked = true;                     
                            }
                        }

                        //Document business
                        let original_doc_business  = result.data[0].original_doc_business;
                        radioGroup  = document.getElementsByName("original_doc_business");
                        for (let radioE of radioGroup){
                            if (radioE.value == original_doc_business) {    
                                radioE.checked = true;                     
                            }
                        }

                        document.getElementById("type_doc_business").value  = result.data[0].type_doc_business;

                        //autre source business
                        let autre_source_business  = result.data[0].autre_source_business;
                        radioGroup  = document.getElementsByName("autre_source_business");
                        for (let radioE of radioGroup){
                            if (radioE.value == autre_source_business) {    
                                radioE.checked = true;                     
                            }
                        }

                        document.getElementById("type_autre_source").value = result.data[0].type_autre_source;
                        document.getElementById("duree_autre_source").value = result.data[0].duree_autre_source;
                        document.getElementById("revenu_autre_source").value = result.data[0].revenu_autre_source;
                        document.getElementById("historic_organigram_business").value = result.data[0].historic_organigram_business;
                        document.getElementById("commentaire_business").value = result.data[0].commentaire_business;
                    
                    //Information financière sur les ventes et les achats du business
                    document.getElementById("jours_open_business").value = result.data[0].jours_open_business;
                    document.getElementById("jours_close_business").value = result.data[0].jours_close_business;
                    document.getElementById("px_clients_business").value = result.data[0].px_clients_business;
                    document.getElementById("vente_bon_jour").value = result.data[0].vente_bon_jour;
                    document.getElementById("vente_mauvais_jour").value = result.data[0].vente_mauvais_jour;
                    document.getElementById("vente_normal_jour").value = result.data[0].vente_normal_jour;
                    document.getElementById("vente_today").value = result.data[0].vente_today;
                    document.getElementById("vente_hebdomadaire").value = result.data[0].vente_hebdomadaire;
                    document.getElementById("vente_mensuelle").value = result.data[0].vente_mensuelle;
                    document.getElementById("localisation_fournisseur").value = result.data[0].localisation_fournisseur;
                    document.getElementById("noms_fournisseurs").value = result.data[0].noms_fournisseurs;
                    document.getElementById("date_achat1").value = result.data[0].date_achat1;
                    document.getElementById("frequence_achat1").value = result.data[0].frequence_achat1;
                    document.getElementById("lieu_achat1").value = result.data[0].lieu_achat1;
                    document.getElementById("montant_achat1").value = result.data[0].montant_achat1;
                    document.getElementById("date_achat2").value = result.data[0].date_achat2;
                    document.getElementById("frequence_achat2").value = result.data[0].frequence_achat2;
                    document.getElementById("lieu_achat2").value = result.data[0].lieu_achat2;
                    document.getElementById("montant_achat2").value = result.data[0].montant_achat2;
                    document.getElementById("date_achat3").value = result.data[0].date_achat3;
                    document.getElementById("frequence_achat3").value = result.data[0].frequence_achat3;
                    document.getElementById("lieu_achat3").value = result.data[0].lieu_achat3;
                    document.getElementById("montant_achat3").value = result.data[0].montant_achat3;
                    document.getElementById("date_achat4").value = result.data[0].date_achat4;
                    document.getElementById("frequence_achat4").value = result.data[0].frequence_achat4;
                    document.getElementById("lieu_achat4").value = result.data[0].lieu_achat4;
                    document.getElementById("montant_achat4").value = result.data[0].montant_achat4;
                    
                    
                    //radio cahier_vente
                    let cahier_vente  = result.data[0].cahier_vente;
                    radioGroup  = document.getElementsByName("cahier_vente");
                    for (let radioE of radioGroup){
                        if (radioE.value == cahier_vente) {    
                            radioE.checked = true;                     
                        }
                    }
                    //Informations sur les dépenses operationnelles de l'activité
                    document.getElementById("transport_navette_business").value = result.data[0].transport_navette_business;
                    document.getElementById("transport_marchandise").value = result.data[0].transport_marchandise;
                    document.getElementById("loyer_business").value = result.data[0].loyer_business;
                    document.getElementById("comm_dep_business").value = result.data[0].comm_dep_business;
                    document.getElementById("services_dep_business").value = result.data[0].services_dep_business;
                    document.getElementById("taxes_dep_business").value = result.data[0].taxes_dep_business;
                    document.getElementById("autres_dep_business").value = result.data[0].autres_dep_business;
                    document.getElementById("depenses_six_derniers_mois").value = result.data[0].depenses_six_derniers_mois;
                      
                     //Identification et mitigation de risque sur le client, son business, sa famille et autres
                     document.getElementById("difficulte_business").value = result.data[0].difficulte_business;
                    document.getElementById("mesure_business").value = result.data[0].mesure_business;
                    document.getElementById("pointfort_business").value = result.data[0].pointfort_business;
                    document.getElementById("pointfaible_business").value = result.data[0].pointfaible_business;
                    document.getElementById("contrainte_business").value = result.data[0].contrainte_business;
                    document.getElementById("opportunite_business").value = result.data[0].opportunite_business;
             
                    document.getElementById("risk1").value = result.data[0].risk1;
                    document.getElementById("mitigation1").value = result.data[0].mitigation1;
                    document.getElementById("risk2").value = result.data[0].risk2;
                    document.getElementById("mitigation2").value = result.data[0].mitigation2;
                    document.getElementById("risk3").value = result.data[0].risk3;
                    document.getElementById("mitigation3").value = result.data[0].mitigation3;

                    document.getElementById("commentaire_depense_risk").value = result.data[0].commentaire_depense_risk;
                    
                    }
                }
                document.body.removeAttribute('style'); 
        }
        catch(err){
            console.log(err)
        }
        finally{
            document.body.removeAttribute('style'); 
        }
    }


    //Load experience banque with request id if prospect_id > 0
    //set to add mode
    document.getElementById("hid_experiencebanque_edit").value = 'add';
    if(requestid > 0){
        url = `/customer/loan/experiencebanque/view/${requestid}`;
        try{
             document.body.style.setProperty('cursor', 'progress');
             const result = await fetchData(url, 'GET');
             console.log('experiencebanque: ', result)
             if(result !== null && result.status === 'success'){
                 if(result.hasOwnProperty('data')){
                         //set to edit mode
                         document.getElementById("hid_experiencebanque_edit").value = 'edit';
                         //set the data

                        //radio experience banque
                        let experience_banque = result.data[0].experience_banque;
                        let radioGroup  = document.getElementsByName("experience_banque");
                        for (let radioE of radioGroup){
                            if (radioE.value == experience_banque) {    
                                radioE.checked = true;                     
                            }
                        }

                   
                         document.getElementById("commentaire_banque").value = result.data[0].commentaire_banque;
                    
                            //radio possession_document
                        let possession_document = result.data[0].possession_document;
                        radioGroup  = document.getElementsByName("possession_document");
                        for (let radioE of radioGroup){
                           if (radioE.value == possession_document) {    
                                radioE.checked = true;                     
                            }
                        }
    
                       document.getElementById("nom_banque").value = result.data[0].nom_banque;
                       document.getElementById("montant_initial_banque").value = result.data[0].montant_initial_banque;
                       document.getElementById("echeance_banque").value = result.data[0].echeance_banque;
                       document.getElementById("date_decaissement_banque").value = result.data[0].date_decaissement_banque;
                       document.getElementById("ferme_ou_encours").value = result.data[0].ferme_ou_encours;
                       document.getElementById("info_arrieres_banque").value = result.data[0].info_arrieres_banque;
                       document.getElementById("score_banque").value = result.data[0].score_banque;
                     
                       //set the data unite faùilliale
                 
                     document.getElementById("date_analysemen").value = result.data[0].date_analysemen;
                     document.getElementById("place_occupation_menage").value = result.data[0].place_occupation_menage;
                     document.getElementById("nombre_menage").value = result.data[0].nombre_menage;
                     document.getElementById("duree_menage").value = result.data[0].duree_menage;
                     document.getElementById("propriete_maison").value = result.data[0].propriete_maison;
                     document.getElementById("bailleur_prospect").value = result.data[0].bailleur_prospect;
                     document.getElementById("nombre_personne_menage").value = result.data[0].nombre_personne_menage;

                      //radio membre_dehors_menage
                      let membre_dehors_menage = result.data[0].membre_dehors_menage;
                          radioGroup  = document.getElementsByName("membre_dehors_menage");
                      for (let radioE of radioGroup){
                          if (radioE.value == membre_dehors_menage) {    
                              radioE.checked = true;                     
                          }
                      }

                     document.getElementById("raison_dehors_menage").value = result.data[0].raison_dehors_menage;

                     //radio noms_comsposition_menage_question 
                     let noms_comsposition_menage_q = result.data[0].noms_comsposition_menage_q;
                     radioGroup  = document.getElementsByName("noms_comsposition_menage_q");
                     for (let radioE of radioGroup){
                        if (radioE.value == noms_comsposition_menage_q) {    
                             radioE.checked = true;                     
                         }
                     }
                     document.getElementById("membre_avec_revenu").value = result.data[0].membre_avec_revenu;
                     document.getElementById("travail_conjoint").value = result.data[0].travail_conjoint;
                     document.getElementById("revenu_conjoint").value = result.data[0].membre_avec_revenu;
                     document.getElementById("revenu_regulier_membre").value = result.data[0].travail_conjoint;
                     document.getElementById("membre_qui_contribue").value = result.data[0].membre_qui_contribue;
                     document.getElementById("hauteur_contribution_membre").value = result.data[0].hauteur_contribution_membre;
                     document.getElementById("hauteur_contribution_membre").value = result.data[0].hauteur_contribution_membre;
                     document.getElementById("nourriture_famille").value = result.data[0].nourriture_famille;
                     document.getElementById("cuisson_famille").value = result.data[0].cuisson_famille;
                     document.getElementById("loyer_famille").value = result.data[0].loyer_famille;
                     document.getElementById("transport_famille").value = result.data[0].transport_famille;
                     document.getElementById("communication_famille").value = result.data[0].communication_famille;
                     document.getElementById("vetement_famille").value = result.data[0].vetement_famille;
                     document.getElementById("education_famille").value = result.data[0].education_famille;
                     document.getElementById("sante_famille").value = result.data[0].sante_famille;
                     document.getElementById("service_famille").value = result.data[0].service_famille;
                     document.getElementById("imprevus_famille").value = result.data[0].imprevus_famille;
                     document.getElementById("loisirs_famille").value = result.data[0].loisirs_famille;
                     document.getElementById("autres_depense_famille").value = result.data[0].autres_depense_famille;
                     document.getElementById("premiere_reference_menage").value = result.data[0].premiere_reference_menage;
                     document.getElementById("seconde_reference_menage").value = result.data[0].seconde_reference_menage;
                     document.getElementById("comment_menage").value = result.data[0].comment_menage;

                      
                   }
                }
                document.body.removeAttribute('style'); 
        }
        catch(err){
             console.log(err)
        }
         finally{
            document.body.removeAttribute('style'); 
        }
     }

//Load analyse business with request id if prospect_id > 0
    //set to add mode
    document.getElementById("hid_businessanalysis_edit").value = 'add';
    if(requestid > 0){
        url = `/customer/loan/businessanalysis/view/${requestid}`;
        try{
             document.body.style.setProperty('cursor', 'progress');
             const result = await fetchData(url, 'GET');
             console.log('businessanalysis: ', result)
             if(result !== null && result.status === 'success'){
                 if(result.hasOwnProperty('data')){
                         //set to edit mode
                         document.getElementById("hid_businessanalysis_edit").value = 'edit';
                         //set the data

                         document.getElementById("cash_business").value = result.data[0].cash_business;
                         document.getElementById("date_cash_business").value = result.data[0].date_cash_business;
                         document.getElementById("cash_home").value = result.data[0].cash_home;
                         document.getElementById("date_cash_home").value = result.data[0].date_cash_home;
                         document.getElementById("cash_banque").value = result.data[0].cash_banque;
                         document.getElementById("date_cash_banque").value = result.data[0].date_cash_banque;

                         //radio releve_bancaire_question
                        let releve_bancaire_question = result.data[0].releve_bancaire_question;
                        let radioGroup  = document.getElementsByName("releve_bancaire_question");
                        for (let radioE of radioGroup){
                            if (radioE.value == releve_bancaire_question) {    
                                radioE.checked = true;                     
                            }
                        }

                        document.getElementById("creance_business_noms").value = result.data[0].creance_business_noms;
                        document.getElementById("montant_creance").value = result.data[0].montant_creance;
                        document.getElementById("explication_trace_creance").value = result.data[0].explication_trace_creance;
                   
                        
                            //radio cahier_creance
                        let cahier_creance = result.data[0].cahier_creance;
                            radioGroup  = document.getElementsByName("cahier_creance");
                        for (let radioE of radioGroup){
                           if (radioE.value == cahier_creance) {    
                                radioE.checked = true;                     
                            }
                        }
    
                       document.getElementById("solde_restant_creance").value = result.data[0].solde_restant_creance;
                       document.getElementById("frequence_paiement_creance").value = result.data[0].frequence_paiement_creance;
                       document.getElementById("date_paiment_creance").value = result.data[0].date_paiment_creance;
                       document.getElementById("montant_recouvert_unmois").value = result.data[0].montant_recouvert_unmois;
                        
                       //radio cahier_creance
                       let statut_creance = result.data[0].statut_creance;
                       radioGroup  = document.getElementsByName("statut_creance");
                   for (let radioE of radioGroup){
                      if (radioE.value == statut_creance) {    
                           radioE.checked = true;                     
                       }
                   }

                          //radio avance_stock_creance
                        let avance_stock_creance = result.data[0].avance_stock_creance;
                            radioGroup  = document.getElementsByName("avance_stock_creance");
                       for (let radioE of radioGroup){
                       if (radioE.value == avance_stock_creance) {    
                       radioE.checked = true;                     
                      }
                    }

                           //radio preuve_paiement_stock_creance
                         let preuve_paiement_stock_creance = result.data[0].preuve_paiement_stock_creance;
                           radioGroup  = document.getElementsByName("preuve_paiement_stock_creance");
                       for (let radioE of radioGroup){
                       if (radioE.value == preuve_paiement_stock_creance) {    
                      radioE.checked = true;                     
                      }
                    }

                             //radio preuve_paiement_stock_creance
                         let preuve_propriete_biens = result.data[0].preuve_propriete_biens;
                         radioGroup  = document.getElementsByName("preuve_propriete_biens");
                          for (let radioE of radioGroup){
                         if (radioE.value == preuve_propriete_biens) {    
                          radioE.checked = true;                     
                      }
                    }
                     document.getElementById("commentaire_dette").value = result.data[0].commentaire_dette;
                     document.getElementById("commentaire_achat_stock").value = result.data[0].commentaire_achat_stock;
                     document.getElementById("commentaire_achat_biens").value = result.data[0].commentaire_achat_biens;
                     document.getElementById("principal_restant_dette").value = result.data[0].principal_restant_dette;
                     document.getElementById("acompte_mensuel_dette").value = result.data[0].acompte_mensuel_dette;
                     document.getElementById("commentaire_actif_dette").value = result.data[0].commentaire_actif_dette;
                     
                    //Informations sur les garanties & autres
                    document.getElementById("premiere_reference_business").value = result.data[0].premiere_reference_business;
                    document.getElementById("seconde_reference_business").value = result.data[0].seconde_reference_business;
                    
                    //radio garant_question
                    let garant_question = result.data[0].garant_question;
                    radioGroup  = document.getElementsByName("garant_question");
                     for (let radioE of radioGroup){
                    if (radioE.value == garant_question) {    
                     radioE.checked = true;                     
                 }
               }
                    
                    document.getElementById("nom_garant").value = result.data[0].nom_garant;
                    document.getElementById("relation_client_garant").value = result.data[0].relation_client_garant;
                    document.getElementById("contact_garant").value = result.data[0].contact_garant;
                    document.getElementById("biens_gage").value = result.data[0].biens_gage;
                     
                    //radio doc_biens_gage
                     let doc_biens_gage = result.data[0].doc_biens_gage;
                     radioGroup  = document.getElementsByName("doc_biens_gage");
                      for (let radioE of radioGroup){
                     if (radioE.value == doc_biens_gage) {    
                      radioE.checked = true;                     
                  }
                }

                    document.getElementById("option_garantie").value = result.data[0].option_garantie; 
                   }
                }
                document.body.removeAttribute('style'); 
        }
        catch(err){
             console.log(err)
        }
         finally{
            document.body.removeAttribute('style'); 
        }
     }

});

//focus out, get data from orbit
document.getElementById("customer_number").addEventListener("focusout", async () => {
    // let loadState =  this.document.getElementById("hid_load_status").value;
    // console.log('Load status: :', loadState)
    // if(loadState == 'loading'){
    //     return;
    // }
    let custNo = document.getElementById("customer_number").value;
    const url = '/customer/loan/prospect/orbit/' + custNo;
    try{
        document.body.style.setProperty('cursor', 'progress');
        const result = await fetchData(url, 'GET');
        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //set the data
                document.getElementById("name_prospect").value = result.data.NOM_COMPLET;
                document.getElementById("birthday_prospect").value = result.data.DATE_NAISSANCE;
                document.getElementById("genre_prospect").value = result.data.GENDER_TY;
                document.getElementById("id_type_prospect").value = result.data.TYPE_ID;
                document.getElementById("id_number_prospect").value = result.data.NUMERO_ID;
                document.getElementById("adresse_prospect").value = result.data.ADDRESS;
                document.getElementById("telephone_prospect").value = result.data.PHONE;
                document.getElementById("etat_civil_prospect").value = result.data.MARITAL_ST;
                document.getElementById("epouse_prospect").value = result.data.NOM_CONJOINT;
                document.getElementById("cycle_loan_prospect").value = result.data.CYCLE_PRET;
            }
        }
        //document.body.removeAttribute('style'); 
    }
    catch(err){
        console.log(err)
    }
    finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving prospect
document.getElementById("submitprospect").addEventListener("click", async (e) => {
    e.preventDefault();
    try{
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userid');

        const action = document.getElementById("hid_prospect_edit").value;
        const prospectid = document.getElementById("hid_prospect_id").value;

        const name_prospect = document.getElementById("name_prospect").value;
        const customer_number = document.getElementById("customer_number").value;
        const birthday_prospect = document.getElementById("birthday_prospect").value;
        const id_type_prospect = document.getElementById("id_type_prospect").value;
        const id_number_prospect = document.getElementById("id_number_prospect").value;
        const adresse_prospect = document.getElementById("adresse_prospect").value;
        const telephone_prospect = document.getElementById("telephone_prospect").value;
        const genre_prospect = document.getElementById("genre_prospect").value;
        const etat_civil_prospect = document.getElementById("etat_civil_prospect").value;
        const epouse_prospect = document.getElementById("epouse_prospect").value;
        const cycle_loan_prospect = document.getElementById("cycle_loan_prospect").value;
        const duree_menage_date  = document.getElementById("duree_menage_date").value;

        const prospect_data = {
            'action' : action,
            'loan_prospect_id' : prospectid,
            'name_prospect' : name_prospect,
            'customer_number' : customer_number || 'NOTAVAILABLE',
            'birthday_prospect' : birthday_prospect,  
            'id_type_prospect' : id_type_prospect ,
            'id_number_prospect' : id_number_prospect  || 'NOTAVAILABLE',
            'adresse_prospect' : adresse_prospect,
            'telephone_prospect' : telephone_prospect,
            'genre_prospect' : genre_prospect,
            'etat_civil_prospect' : etat_civil_prospect,
            'epouse_prospect' : epouse_prospect,
            'cycle_loan_prospect' : cycle_loan_prospect,
            'duree_menage_date' : duree_menage_date,
            'user_id' : userId
        }

        console.log("prospect_data", prospect_data)
        const url = '/customer/loan/prospect/createorupdate';
        const result = await fetchData(url, 'POST', prospect_data);
        console.log('result : ', result)
        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                console.log("prospect data: ", result.data)
                document.getElementById("hid_prospect_edit").value = 'edit';
                document.getElementById("hid_prospect_id").value = result.data.prospect_id;

                if(action === 'add')
                    alert("Prospect Enregistré avec success");

                if(action === 'edit')
                    alert("Prospect mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé: le rim ou le numero de carte d'identité existe deja")
            }
            else
                alert("Erreur")
        }
    } catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});


//Saving request
document.getElementById("submitrequest").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userid');
        const action = document.getElementById("hid_request_edit").value;
        const requestid = document.getElementById("hid_request_id").value;
        const prospectid = document.getElementById("hid_prospect_id").value;

        const date_demande = document.getElementById("date_demande").value;
        const montant_sollicite = document.getElementById("montant_sollicite").value;
        const echeance_pret  = document.getElementById("echeance_pret").value;
        const but_pret  = document.getElementById("but_pret").value;
        const repartition_pret  = document.getElementById("repartition_pret").value;
        const contribution_pret  = document.getElementById("contribution_pret").value;
        const rbst_facile  = document.getElementById("rbst_facile").value;

        const request_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'date_demande': date_demande,
            'montant_sollicite': montant_sollicite,
            'echeance_pret': echeance_pret,
            'but_pret': but_pret,
            'repartition_pret': repartition_pret,
            'contribution_pret':contribution_pret,
            'rbst_facile': rbst_facile,
            'prospect_id': prospectid,
            'user_id': userId
        };

        const url = '/customer/loan/request/createorupdate';
        const result = await fetchData(url, 'POST', request_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_request_edit").value = 'edit';
                document.getElementById("hid_request_id").value = result.data.pret_sollicite_id;

                if(action === 'add')
                    alert("Pret sollicité enregistré avec success");

                if(action === 'edit')
                    alert("Pret sollicité mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});


//Saving business
document.getElementById("submitbusiness").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_business_edit").value;
        const businessid = document.getElementById("hid_business_id").value;
        const requestid = document.getElementById("hid_request_id").value;
        const name_business = document.getElementById("name_business").value;
        const activite1 = document.getElementById("activite1").value;
        const activite2  = document.getElementById("activite2").value;
        const activite3  = document.getElementById("activite3").value;
        const adress_business  = document.getElementById("adress_business").value;
        const point_vente  = document.getElementById("point_vente").value;

        //radio
        let partenaire_business;
        let radioGroup  = document.getElementsByName("partenaire_business");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                partenaire_business = radioE.value;                     
            }
        }

        const noms_partenaires  = document.getElementById("noms_partenaires").value;
        const duree_activite  = document.getElementById("duree_activite").value;
        const date_experience_business  = document.getElementById("date_experience_business").value;
        const statut_propriete_bus  = document.getElementById("statut_propriete_bus").value;

        //Enregistrement legal
        let enregistrement_legal;
        radioGroup  = document.getElementsByName("enregistrement_legal");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                enregistrement_legal = radioE.value;                     
            }
        }


         //radio original doc
         let original_doc_business;
         radioGroup  = document.getElementsByName("original_doc_business");
         for (let radioE of radioGroup){
             if (radioE.checked) {    
                original_doc_business = radioE.value;                     
             }
         }

        const type_doc_business  = document.getElementById("type_doc_business").value;

        //radio autre source
        let autre_source_business;
        radioGroup  = document.getElementsByName("autre_source_business");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                autre_source_business = radioE.value;

            }
        }

        const type_autre_source  = document.getElementById("type_autre_source").value;
        const duree_autre_source  = document.getElementById("duree_autre_source").value;
        const revenu_autre_source  = document.getElementById("revenu_autre_source").value;
        const historic_organigram_business  = document.getElementById("historic_organigram_business").value;
        const commentaire_business  = document.getElementById("commentaire_business").value;
       

        const business_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'name_business': name_business,
            'activite1': activite1,
            'activite2': activite2,
            'activite3': activite3,
            'adress_business': adress_business,
            'point_vente':point_vente,
            'partenaire_business': partenaire_business,
            'noms_partenaires': noms_partenaires,
            'duree_activite': duree_activite,
            'date_experience_business': date_experience_business,
            'statut_propriete_bus': statut_propriete_bus,
            'enregistrement_legal': enregistrement_legal,
            'original_doc_business': original_doc_business,
            'type_doc_business': type_doc_business,
            'autre_source_business': autre_source_business,
            'type_autre_source': type_autre_source,
            'duree_autre_source': duree_autre_source,
            'revenu_autre_source': revenu_autre_source,
            'historic_organigram_business': historic_organigram_business,
            'commentaire_business': commentaire_business,
            
        };

        console.log("business", business_data)

        const url = '/customer/loan/business/createorupdate';
        const result = await fetchData(url, 'POST', business_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_business_edit").value = 'edit';
                document.getElementById("hid_business_id").value = result.data.business_id;
                if(action === 'add')
                    alert("Description business enregistrée avec success");

                if(action === 'edit')
                    alert("Description business mise à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving experience
document.getElementById("submitexperiencebanque").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_experiencebanque_edit").value;
        const experienceid = document.getElementById("hid_experiencebanque_id").value;
        const requestid = document.getElementById("hid_request_id").value;
        
        //radio experience_banque
        let experience_banque;
        let radioGroup  = document.getElementsByName("experience_banque");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                experience_banque = radioE.value;                     
            }
        }

        const commentaire_banque = document.getElementById("commentaire_banque").value;

        //radio possession_document
        let possession_document;
           radioGroup  = document.getElementsByName("possession_document");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                possession_document = radioE.value;                     
            }
        }
       
        const nom_banque  = document.getElementById("nom_banque").value;
        const montant_initial_banque  = document.getElementById("montant_initial_banque").value;
        const echeance_banque  = document.getElementById("echeance_banque").value;
        const date_decaissement_banque  = document.getElementById("date_decaissement_banque").value;  
        const ferme_ou_encours  = document.getElementById("ferme_ou_encours").value;
        const info_arrieres_banque  = document.getElementById("info_arrieres_banque").value;
        const score_banque  = document.getElementById("score_banque").value;
      

        const experience_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'experience_banque': experience_banque,
            'commentaire_banque': commentaire_banque,
            'possession_document': possession_document,
            'nom_banque': nom_banque,
            'montant_initial_banque': montant_initial_banque,
            'echeance_banque': echeance_banque,
            'date_decaissement_banque':date_decaissement_banque,
            'ferme_ou_encours': ferme_ou_encours,
            'info_arrieres_banque': info_arrieres_banque,
            'score_banque': score_banque,
            
            
        };

        console.log("experience", experience_data)

        const url = '/customer/loan/experience/createorupdate';
        const result = await fetchData(url, 'POST', experience_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_experiencebanque_edit").value = 'edit';
                document.getElementById("hid_experiencebanque_id").value = result.data.business_id;
                if(action === 'add')
                    alert("Historique client enregistrée avec success");

                if(action === 'edit')
                    alert("Historique client mise à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving analyse menage
document.getElementById("submitfamille").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_analysemenage_edit").value;
        const analysemenageid = document.getElementById("hid_analysemenage_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const date_analysemen  = new Date(document.getElementById("date_analysemen").value);
        const place_occupation_menage  = document.getElementById("place_occupation_menage").value;
        const nombre_menage  = document.getElementById("nombre_menage").value;
        const duree_menage  = document.getElementById("duree_menage").value;  
        const propriete_maison  = document.getElementById("propriete_maison").value;
        const bailleur_prospect  = document.getElementById("bailleur_prospect").value;
        const nombre_personne_menage = document.getElementById("nombre_personne_menage").value;

        //radio membre_dehors_menage
        let membre_dehors_menage;
        let radioGroup  = document.getElementsByName("membre_dehors_menage");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                membre_dehors_menage = radioE.value;                     
            }
        }

        const raison_dehors_menage = document.getElementById("raison_dehors_menage").value;

         //radio noms_comsposition_menage_q
         let noms_comsposition_menage_q;
            radioGroup  = document.getElementsByName("noms_comsposition_menage_q");
         for (let radioE of radioGroup){
             if (radioE.checked) {    
                 noms_comsposition_menage_q = radioE.value;                     
             }
         }
        const membre_avec_revenu  = document.getElementById("membre_avec_revenu").value;
        const travail_conjoint  = document.getElementById("travail_conjoint").value;  
        const revenu_conjoint  = document.getElementById("revenu_conjoint").value;
        const revenu_regulier_membre  = document.getElementById("revenu_regulier_membre").value;
        const membre_qui_contribue  = document.getElementById("membre_qui_contribue").value;
        const hauteur_contribution_membre   = document.getElementById("hauteur_contribution_membre").value;  
        const nourriture_famille  = document.getElementById("nourriture_famille").value;
        const cuisson_famille = document.getElementById("cuisson_famille").value;   
        const loyer_famille  = document.getElementById("loyer_famille").value;
        const transport_famille  = document.getElementById("transport_famille").value;  
        const communication_famille  = document.getElementById("communication_famille").value;
        const vetement_famille = document.getElementById("vetement_famille").value;
        const education_famille = document.getElementById("education_famille").value;
        const sante_famille  = document.getElementById("sante_famille").value;  
        const service_famille = document.getElementById("service_famille").value;
        const imprevus_famille = document.getElementById("imprevus_famille").value; 
        const loisirs_famille = document.getElementById("loisirs_famille").value;
        const autres_depense_famille = document.getElementById("autres_depense_famille").value;
        const premiere_reference_menage = document.getElementById("premiere_reference_menage").value;  
        const seconde_reference_menage = document.getElementById("seconde_reference_menage").value;
        const comment_menage = document.getElementById("comment_menage").value; 


        const analysemenage_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'date_analysemen': date_analysemen,
            'place_occupation_menage': place_occupation_menage,
            'nombre_menage': nombre_menage,
            'duree_menage': duree_menage,
            'propriete_maison': propriete_maison,
            'bailleur_prospect': bailleur_prospect,
            'nombre_personne_menage':nombre_personne_menage,
            'membre_dehors_menage': membre_dehors_menage,
            'raison_dehors_menage': raison_dehors_menage,
            'noms_comsposition_menage_q': noms_comsposition_menage_q,
            'membre_avec_revenu': membre_avec_revenu,
            'travail_conjoint': travail_conjoint,
            'revenu_conjoint': revenu_conjoint,
            'revenu_regulier_membre': revenu_regulier_membre ,
            'membre_qui_contribue': membre_qui_contribue ,
            'hauteur_contribution_membre': hauteur_contribution_membre,
            'nourriture_famille':nourriture_famille,
            'cuisson_famille': cuisson_famille,
            'loyer_famille': loyer_famille,
            'transport_famille': transport_famille,
            'communication_famille': communication_famille,
            'vetement_famille': vetement_famille,
            'education_famille': education_famille,
            'sante_famille': sante_famille,
            'service_famille': service_famille,
            'imprevus_famille': imprevus_famille,
            'loisirs_famille':loisirs_famille,
            'autres_depense_famille': autres_depense_famille,
            'premiere_reference_menage': premiere_reference_menage,
            'seconde_reference_menage': seconde_reference_menage,
            'comment_menage': comment_menage,
        };

        console.log("analysemenage", analysemenage_data)

        const url = '/customer/loan/analysemenage/createorupdate';
        const result = await fetchData(url, 'POST', analysemenage_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_analysemenage_edit").value = 'edit';
                document.getElementById("hid_analysemenage_id").value = result.data.menage_analysis_id;
                if(action === 'add')
                    alert("analyse familiale enregistrée avec success");

                if(action === 'edit')
                    alert("analyse familiale mise à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});


//Saving actif et dette
document.getElementById("submitactifdette").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_businessanalysis_edit").value;
        const businessanalysisid = document.getElementById("hid_businessanalysis_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const date_cash_business= new Date(document.getElementById("date_cash_business").value);
        const cash_business = document.getElementById("cash_business").value;
        const date_cash_home = new Date(document.getElementById("date_cash_home").value);
        const cash_home = document.getElementById("cash_home").value;  
        const date_cash_banque = new Date(document.getElementById("date_cash_banque").value);
        const cash_banque = document.getElementById("cash_banque").value;
       
        //radio releve_bancaire_question
        
        let releve_bancaire_question;
        let radioGroup  = document.getElementsByName("releve_bancaire_question");
        for (let radioE of radioGroup){
            if (radioE.checked) {    
                releve_bancaire_question = radioE.value;                     
            }
        }

  
        const creance_business_noms  = document.getElementById("creance_business_noms").value;
        const montant_creance  = document.getElementById("montant_creance").value;  
        const explication_trace_creance = document.getElementById("explication_trace_creance").value;
               
        //radio cahier_creance
            let cahier_creance;
               radioGroup  = document.getElementsByName("cahier_creance");
              for (let radioE of radioGroup){
            if (radioE.checked) {    
                cahier_creance = radioE.value;                     
              }
        }

        const solde_restant_creance = document.getElementById("solde_restant_creance").value;
        const frequence_paiement_creance = document.getElementById("frequence_paiement_creance").value;  
        const date_paiment_creance = document.getElementById("date_paiment_creance").value;
        const montant_recouvert_unmois= document.getElementById("montant_recouvert_unmois").value; 
         
        
         //radio statut_creance
         let statut_creance;
         radioGroup  = document.getElementsByName("statut_creance");
           for (let radioE of radioGroup){
           if (radioE.checked) {    
            statut_creance = radioE.value;                     
        }
       }

          //radio avance_stock_creance
         let avance_stock_creance;
         radioGroup  = document.getElementsByName("avance_stock_creance");
           for (let radioE of radioGroup){
           if (radioE.checked) {    
            avance_stock_creance = radioE.value;                     
        }
       }
          
          //radio preuve_paiement_stock_creance
         let preuve_paiement_stock_creance;
         radioGroup  = document.getElementsByName("preuve_paiement_stock_creance");
           for (let radioE of radioGroup){
           if (radioE.checked) {    
            preuve_paiement_stock_creance = radioE.value;                     
        }
       }
           //radio preuve_propriete_biens
         let preuve_propriete_biens;
         radioGroup  = document.getElementsByName("preuve_propriete_biens");
           for (let radioE of radioGroup){
           if (radioE.checked) {    
            preuve_propriete_biens = radioE.value;                     
        }
       }

        const commentaire_dette = document.getElementById("commentaire_dette").value;
        const commentaire_achat_stock = document.getElementById("commentaire_achat_stock").value;  
        const commentaire_achat_biens = document.getElementById("commentaire_achat_biens").value;
        const principal_restant_dette = document.getElementById("principal_restant_dette").value; 
        const acompte_mensuel_dette = document.getElementById("acompte_mensuel_dette").value;
        const commentaire_actif_dette = document.getElementById("commentaire_actif_dette").value;

        const actifdette_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'date_cash_business': date_cash_business,
            'cash_business': cash_business,
            'date_cash_home': date_cash_home,
            'cash_home': cash_home,
            'date_cash_banque': date_cash_banque,
            'cash_banque': cash_banque,
            'releve_bancaire_question':releve_bancaire_question,
            'creance_business_noms': creance_business_noms,
            'montant_creance': montant_creance,
            'explication_trace_creance': explication_trace_creance,
            'cahier_creance': cahier_creance,
            'solde_restant_creance': solde_restant_creance,
            'frequence_paiement_creance': frequence_paiement_creance,
            'date_paiment_creance': date_paiment_creance,
            'montant_recouvert_unmois': montant_recouvert_unmois,
            'statut_creance': statut_creance,
            'avance_stock_creance':avance_stock_creance,
            'preuve_paiement_stock_creance': preuve_paiement_stock_creance,
            'preuve_propriete_biens': preuve_propriete_biens,
            'commentaire_dette': commentaire_dette,
            'commentaire_achat_stock': commentaire_achat_stock,
            'commentaire_achat_biens': commentaire_achat_biens,
            'principal_restant_dette': principal_restant_dette,
            'acompte_mensuel_dette': acompte_mensuel_dette,
            'commentaire_actif_dette': commentaire_actif_dette,

        };

        console.log("actifdette", actifdette_data)

        const url = '/customer/loan/actifdette/createorupdate';
        const result = await fetchData(url, 'POST', actifdette_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_businessanalysis_edit").value = 'edit';
                document.getElementById("hid_businessanalysis_id").value = result.data.business_analysis_id;
                if(action === 'add')
                    alert("actif et dette business enregistré avec success");

                if(action === 'edit')
                    alert("actif et dette business mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving achat et vente
document.getElementById("submitventeachat").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_achatvente_edit").value;
        const achatventeid = document.getElementById("hid_achatvente_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const jours_open_business= document.getElementById("jours_open_business").value;
        const jours_close_business = document.getElementById("jours_close_business").value;
        const vente_bon_jour = document.getElementById("vente_bon_jour").value;
        const vente_mauvais_jour = document.getElementById("vente_mauvais_jour").value;  
        const vente_normal_jour = document.getElementById("vente_normal_jour").value;
        const vente_today = document.getElementById("vente_today").value;
        const vente_hebdomadaire = document.getElementById("vente_hebdomadaire").value;
        const vente_mensuelle  = document.getElementById("vente_mensuelle").value;  
        const px_clients_business = document.getElementById("px_clients_business").value;
        const date_achat1 = document.getElementById("date_achat1").value;
        const frequence_achat1 = document.getElementById("frequence_achat1").value;  
        const lieu_achat1 = document.getElementById("lieu_achat1").value;
        const montant_achat1 = document.getElementById("montant_achat1").value; 
        const date_achat2 = document.getElementById("date_achat2").value;
        const frequence_achat2 = document.getElementById("frequence_achat2").value;  
        const lieu_achat2 = document.getElementById("lieu_achat2").value;
        const montant_achat2 = document.getElementById("montant_achat2").value; 
        const date_achat3 = document.getElementById("date_achat3").value;
        const frequence_achat3 = document.getElementById("frequence_achat3").value;
        const lieu_achat3 = document.getElementById("lieu_achat3").value;
        const montant_achat3 = document.getElementById("montant_achat3").value;  
        const date_achat4 = document.getElementById("date_achat4").value;
        const frequence_achat4 = document.getElementById("frequence_achat4").value; 
        const lieu_achat4 = document.getElementById("lieu_achat4").value;
        const montant_achat4 = document.getElementById("montant_achat4").value;
        
        //radio cahier vente
        let cahier_vente;
        let radioGroup  = document.getElementsByName("cahier_vente");
          for (let radioE of radioGroup){
          if (radioE.checked) {    
            cahier_vente = radioE.value;                     
       }
      }
        const achatvente_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'jours_open_business': jours_open_business,
            'jours_close_business': jours_close_business,
            'vente_bon_jour': vente_bon_jour,
            'vente_mauvais_jour': vente_mauvais_jour,
            'vente_normal_jour': vente_normal_jour,
            'vente_today': vente_today,
            'vente_hebdomadaire':vente_hebdomadaire,
            'vente_mensuelle': vente_mensuelle,
            'px_clients_business': px_clients_business,
            'date_achat1': date_achat1,
            'frequence_achat1': frequence_achat1,
            'lieu_achat1': lieu_achat1,
            'montant_achat1': montant_achat1,
            'date_achat2': date_achat2,
            'frequence_achat2': frequence_achat2,
            'lieu_achat2': lieu_achat2,
            'montant_achat2': montant_achat2,
            'date_achat3': date_achat3,
            'frequence_achat3': frequence_achat3,
            'lieu_achat3': lieu_achat3,
            'montant_achat3': montant_achat3,
            'date_achat4': date_achat4,
            'frequence_achat4': frequence_achat4,
            'lieu_achat4': lieu_achat4,
            'montant_achat4': montant_achat4,
            'cahier_vente': cahier_vente,

        };

        console.log("achatvente", achatvente_data)

        const url = '/customer/loan/achatvente/createorupdate';
        const result = await fetchData(url, 'POST', achatvente_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_achatvente_edit").value = 'edit';
                document.getElementById("hid_achatvente_id").value = result.data.business_id;
                if(action === 'add')
                    alert("achat et vente business enregistré avec success");

                if(action === 'edit')
                    alert("achat et vente business mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});


//Saving depense business
document.getElementById("submitdepensebusiness").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_depensebusiness_edit").value;
        const depensebusinessid = document.getElementById("hid_depensebusiness_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const transport_navette_business= document.getElementById("transport_navette_business").value;
        const transport_marchandise = document.getElementById("transport_marchandise").value;
        const loyer_business = document.getElementById("loyer_business").value;
        const comm_dep_business = document.getElementById("comm_dep_business").value;  
        const services_dep_business = document.getElementById("services_dep_business").value;
        const taxes_dep_business = document.getElementById("taxes_dep_business").value;
        const autres_dep_business = document.getElementById("autres_dep_business").value;
        const depenses_six_derniers_mois  = document.getElementById("depenses_six_derniers_mois").value;
        
        const depensebusiness_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'transport_navette_business': transport_navette_business,
            'transport_marchandise': transport_marchandise,
            'loyer_business': loyer_business,
            'comm_dep_business': comm_dep_business,
            'services_dep_business': services_dep_business,
            'taxes_dep_business': taxes_dep_business,
            'autres_dep_business': autres_dep_business,
            'depenses_six_derniers_mois': depenses_six_derniers_mois,
           
        };

        console.log("depensebusiness", depensebusiness_data)

        const url = '/customer/loan/depensebusiness/createorupdate';
        const result = await fetchData(url, 'POST', depensebusiness_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_depensebusiness_edit").value = 'edit';
                document.getElementById("hid_depensebusiness_id").value = result.data.business_id;
                if(action === 'add')
                    alert("depense business enregistré avec success");

                if(action === 'edit')
                    alert("depense business mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving risque business
document.getElementById("submitrisque").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_risk_edit").value;
        const riskid = document.getElementById("hid_risk_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const difficulte_business= document.getElementById("difficulte_business").value;
        const mesure_business = document.getElementById("mesure_business").value;
        const pointfort_business = document.getElementById("pointfort_business").value;
        const pointfaible_business = document.getElementById("pointfaible_business").value;  
        const contrainte_business = document.getElementById("contrainte_business").value;
        const opportunite_business = document.getElementById("opportunite_business").value;
        const commentaire_depense_risk = document.getElementById("commentaire_depense_risk").value;
        const risk1  = document.getElementById("risk1").value;
        const mitigation1 = document.getElementById("mitigation1").value;  
        const risk2 = document.getElementById("risk2").value;
        const mitigation2 = document.getElementById("mitigation2").value;
        const risk3 = document.getElementById("risk3").value;
        const mitigation3 = document.getElementById("mitigation3").value;
        
        const risquebusiness_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'difficulte_business': difficulte_business,
            'mesure_business': mesure_business,
            'pointfort_business': pointfort_business,
            'pointfaible_business': pointfaible_business,
            'contrainte_business': contrainte_business,
            'opportunite_business': opportunite_business,
            'commentaire_depense_risk': commentaire_depense_risk,
            'risk1': risk1,
            'mitigation1': mitigation1,
            'risk2': risk2,
            'mitigation2': mitigation2,
            'risk3': risk3,
            'mitigation3': mitigation3,
           
        };

        console.log("risquebusiness", risquebusiness_data)

        const url = '/customer/loan/risquebusiness/createorupdate';
        const result = await fetchData(url, 'POST', risquebusiness_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_risk_edit").value = 'edit';
                document.getElementById("hid_risk_id").value = result.data.business_id;
                if(action === 'add')
                    alert("risque business enregistré avec success");

                if(action === 'edit')
                    alert("risque business mis à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});

//Saving garantie business
document.getElementById("submitgarantie").addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        document.body.style.setProperty('cursor', 'progress');
        let urlParams = new URLSearchParams(window.location.search);
        const action = document.getElementById("hid_garantie_edit").value;
        const garantieid = document.getElementById("hid_garantie_id").value;
        const requestid = document.getElementById("hid_request_id").value;
  
        const premiere_reference_business= document.getElementById("premiere_reference_business").value;
        const seconde_reference_business = document.getElementById("seconde_reference_business").value;

        //radio garant_question
        let garant_question;
        let radioGroup  = document.getElementsByName("garant_question");
          for (let radioE of radioGroup){
          if (radioE.checked) {    
            garant_question = radioE.value;                     
       }
      }
        const nom_garant = document.getElementById("nom_garant").value;
        const relation_client_garant = document.getElementById("relation_client_garant").value;  
        const contact_garant = document.getElementById("contact_garant").value;
        const biens_gage = document.getElementById("biens_gage").value;

            //radio doc_biens_gage
        let doc_biens_gage;
           radioGroup  = document.getElementsByName("doc_biens_gage");
          for (let radioE of radioGroup){
          if (radioE.checked) {    
            doc_biens_gage = radioE.value;                     
       }
      }
        const option_garantie = document.getElementById("option_garantie").value;
        
        const garantiebusiness_data = {
            'action': action,
            'pret_sollicite_id': requestid,
            'premiere_reference_business': premiere_reference_business,
            'seconde_reference_business': seconde_reference_business,
            'garant_question': garant_question,
            'nom_garant': nom_garant,
            'relation_client_garant': relation_client_garant,
            'contact_garant': contact_garant,
            'biens_gage': biens_gage,
            'doc_biens_gage': doc_biens_gage,
            'option_garantie': option_garantie,
        };

        console.log("garantiebusiness", garantiebusiness_data)

        const url = '/customer/loan/garantiebusiness/createorupdate';
        const result = await fetchData(url, 'POST', garantiebusiness_data);

        if(result !== null && result.status === 'success'){
            if(result.hasOwnProperty('data')){
                //update the hidden value
                document.getElementById("hid_garantie_edit").value = 'edit';
                document.getElementById("hid_garantie_id").value = result.data.business_analysis_id;
                if(action === 'add')
                    alert("garantie business enregistrée avec success");

                if(action === 'edit')
                    alert("garantie business mise à jour avec success");
            }
        }
        else {
            if(result.status === 'duplicate'){
                alert("Duplicata trouvé")
            }
            else
                alert("Erreur")
        }
    }
    catch(err){
        console.log(err);
    } finally{
        document.body.removeAttribute('style'); 
    }
});






import { groupes, eleves } from './data.js';
const liste_eleves = document.querySelector("#liste-eleves");
// console.log(liste_eleves);

function creerLigne(eleve) {
    const li = document.createElement("li");
    li.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3")
    li.dataset.id = eleve.id

    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "gap-3", "lg:flex-row", "lg:items-center")
    li.append(div);   // li > div

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn-fiche", "flex", "min-h-11", "flex-1", "items-center", "gap-3", "text-left")
    div.append(button);  // div > btn

    // avatar
    const span = document.createElement("span");
    span.classList.add("grid", "size-10", "shrink-0", "place-items-center", "rounded-full", "bg-brand-soft", "text-sm", "font-semibold", "text-brand")
    // button.append(span);
    const text_span = document.createElement("span")
    text_span.textContent = eleve.prenom[0] + eleve.nom[0];
    span.append(text_span);
    button.append(span)


    // info des etudiant
    const infos = document.createElement("span");
    infos.classList.add("min-w-0", "flex-1")
    const spanName = document.createElement("span");
    spanName.classList.add("block", "truncate", "font-medium")
    spanName.textContent = eleve.prenom + " " + eleve.nom;
    // infos.append(spanName);
    // nomber dabsence
    const spanAbsence = document.createElement("span");
    spanAbsence.classList.add("absence-count", "block", "text-sm", "text-muted")
    const nombre_absences = document.createElement("span");
    nombre_absences.classList.add("nombre-absences");
    nombre_absences.textContent = eleve.absences + " absence(s)";
    spanAbsence.append(nombre_absences);
    if (eleve.absences >= 3) {
        li.classList.add("alerte");

        const badge = document.createElement("span");
        badge.classList.add("badge", "ml-1", "whitespace-nowrap",
            "rounded-full", "bg-alert", "px-2",
            "py-0.5", "text-xs", "font-medium", "text-white");

        badge.textContent = "Prévenir les parents";
        spanAbsence.append(badge);
    }
    infos.append(spanName, spanAbsence);
    button.append(infos)

    // calcule moyenne
    const span_moyenne = document.createElement("span");
    span_moyenne.classList.add("moyenne", "font-serif", "text-xl");
    const resultat = calculMoyenne(eleve.notes);

    if (resultat === null) {
        span_moyenne.textContent = "-";
    } else {
        span_moyenne.textContent = resultat + " / 20";
    }
    button.append(span_moyenne)

    // ======================

    const div_actions = document.createElement("div");
    div_actions.classList.add("flex", "gap-2")
    div.append(div_actions);   // div > div

    const btn_action = document.createElement("button");
    btn_action.type = "button"
    btn_action.classList.add("btn-absent", "h-11", "rounded-full", "border", "border-line", "bg-paper", "px-4", "text-sm", "lg:w-24")
    btn_action.textContent = "Absent"
    div_actions.append(btn_action);

    const label = document.createElement("label");
    label.classList.add("flex-1");
    div_actions.append(label);

    const span_Note = document.createElement("span");
    span_Note.classList.add("sr-only");
    span_Note.textContent = "Note sur 20";
    label.append(span_Note);

    const input_note = document.createElement("input");
    input_note.type = "number";
    input_note.min = "0";
    input_note.max = "20";
    input_note.step = "0.5";
    input_note.placeholder = "Note";
    input_note.classList.add("btn_note", "h-11", "w-full", "rounded-full", "border", "border-line", "bg-paper", "px-4", "text-sm", "lg:w-24")
    label.append(input_note)

    const btn_ajouter = document.createElement("button");
    btn_ajouter.type = "button";
    btn_ajouter.classList.add("btn-ajouter", "h-11", "rounded-full", "bg-ink", "px-3", "sm:px-4", "text-sm", "font-medium", "text-white", "hover:bg-brand");
    btn_ajouter.textContent = "Ajouter la note"
    div_actions.append(btn_ajouter)

    const paragraph = document.createElement("p");
    paragraph.classList.add("message", "mt-2", "text-xs", "text-alert")
    paragraph.textContent = "La note doit etre un nomber enter 0 et 20";
    paragraph.hidden = true;
    li.append(paragraph);

    return li;

}
const compteur = document.querySelector("#compteur");
function renderData(filterData = eleves) {
    liste_eleves.replaceChildren();  // vider tout le contenu
    compteur.textContent = filterData.length + " eleve"
    for (let i = 0; i < filterData.length; i++) {
        const eleve = filterData[i];
        const ligne = creerLigne(eleve);
        liste_eleves.append(ligne);
    }
}

function calculMoyenne(notes) {
    if (notes.length === 0) {
        return null;
    }
    const somme = notes.reduce((total, note) => {
        return total + note;
    }, 0);
    const moyenne = somme / notes.length;
    return moyenne.toFixed(2).replace('.', ',');
}

//generer la liste des groupes
const filtre_groupe = document.querySelector("#filtre-groupe");
// console.log(filtre_groupe);
groupes.forEach(function (group) {
    const option = document.createElement("option")
    option.value = group.id
    option.textContent = group.nom;
    filtre_groupe.append(option)

});
// filtrage group
filtre_groupe.addEventListener("change", filterGoupInput)
renderData()
//filtrage par nom
const rechercheNom = document.querySelector("#recherche");
// console.log(rechercheNom)

rechercheNom.addEventListener("input", filterGoupInput)
// function pour filter le nom input et group option 
function filterGoupInput() {
    const groupeSelectionne = filtre_groupe.value;
    const valeurRechetcher = rechercheNom.value.trim().toLowerCase();
    // Tous les eleves du groupe
    const elevesDuGroupe = eleves.filter(function (eleve) {
        return groupeSelectionne === "" ||
            eleve.groupeId === Number(groupeSelectionne);
    });
    // Recherche par prenom ou nom
    const filter_data = elevesDuGroupe.filter(function (eleve) {
        return eleve.prenom.toLowerCase().includes(valeurRechetcher) ||
            eleve.nom.toLowerCase().includes(valeurRechetcher);
    });

    renderData(filter_data);
    afficherBilan(elevesDuGroupe);
    
}

// gerer les absences 
liste_eleves.addEventListener("click", function (event) {
    const button = event.target.closest(".btn-absent");
    if (button === null) return;

    const ligne = button.closest("li");

    const id = ligne.dataset.id

    const absence_count = ligne.querySelector(".absence-count");
    // console.log(absence_count);
    const resultat = eleves.find(function (eleve) {
        return eleve.id === Number(id)
    })
    if (!resultat) return;
    resultat.absences++;
    // console.log(resultat.absences);
    const nombre_absences = absence_count.querySelector(".nombre-absences");
    nombre_absences.textContent = resultat.absences + " absence(s)";
    if (resultat.absences >= 3) {
        ligne.classList.add("alerte");

        if (!absence_count.querySelector(".badge")) {
            const badge = document.createElement("span");
            badge.classList.add("badge", "ml-1", "whitespace-nowrap",
                "rounded-full", "bg-alert", "px-2",
                "py-0.5", "text-xs", "font-medium", "text-white");

            badge.textContent = "Prévenir les parents";
            absence_count.append(badge);
        }
    }
    // Actualiser le bilan
    filterGoupInput();
});
// gerer les notes 

liste_eleves.addEventListener("click", function (event) {
    const btn_ajouter = event.target.closest(".btn-ajouter");

    if (!btn_ajouter) return;

    const ligne = btn_ajouter.closest("li");
    const id = ligne.dataset.id;

    const input_note = ligne.querySelector("input");
    const message = ligne.querySelector(".message");

    const note = Number(input_note.value);

    // pour valide la note doit enter 0 et 20 
    if (input_note.value === "" || note < 0 || note > 20) {
        message.hidden = false;
        return;
    }

    message.hidden = true;

    // pour chercher eleve
    const resultat_note = eleves.find(function (eleve) {
        return eleve.id === Number(id);
    });

    if (!resultat_note) return;

    // pour ajouter la note
    resultat_note.notes.push(note);
    

    // pour calcule la moyenne on a appel la function calculmoyeen
    const moyenne = calculMoyenne(resultat_note.notes);

    // apres dajouter un noter doit modifier et afficher le nouveau moyenne
    const moyenne_element = ligne.querySelector(".moyenne");
    moyenne_element.textContent = moyenne + " / 20";

    // 
    input_note.value = "";
    filterGoupInput();
});


//ajouter un eleve avec validation de nom tele email ....
const forma_eleve = document.querySelector("#form-eleve");
const prenom_eleve = document.querySelector("#prenom");
const nom_eleve = document.querySelector("#nom");
const groupe_eleve = document.querySelector("#groupe");
const email_eleve = document.querySelector("#email");
const telephone_eleve = document.querySelector("#telephone");
const code_eleve = document.querySelector("#code");

//regex name et prenom
const regexName = /^[a-zA-ZÀ-ÿ\s-]{2,}$/;
//regex email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//regex tele
const regexTelephone = /^((06|07)[0-9]{8}|(\+212|00212)[67][0-9]{8})$/;
//regex code privisoir
const regexCode = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

//forma prenom et nom 
function formatNom(nom) {
    return nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();
}
// validation pour prenom
const prenom_msg = document.querySelector("#prenom-msg");
const prenom_champ = prenom_eleve.closest(".champ");
prenom_eleve.addEventListener("input", function () {

    const prenom = prenom_eleve.value.trim();

    if (prenom === "") {
        prenom_champ.className = "champ";
        prenom_msg.textContent = "2 caractères minimum.";
    }
    else if (!regexName.test(prenom)) {
        prenom_champ.className = "champ erreur";
        prenom_msg.textContent = "Prénom invalide";
    }
    else {
        prenom_champ.className = "champ valide";
        prenom_msg.textContent = "Prénom valide";
    }


});
// validation nom
const nom_msg = document.querySelector("#nom-msg");
const nom_champ = nom_eleve.closest(".champ");
nom_eleve.addEventListener("input", function () {

    const nom = nom_eleve.value.trim();

    if (nom === "") {
        nom_champ.className = "champ";
        nom_msg.textContent = "2 caractères minimum : lettres, espaces ou tirets.";
    }
    else if (!regexName.test(nom)) {
        nom_champ.className = "champ erreur";
        nom_msg.textContent = "nom invalide";
    }
    else {
        nom_champ.className = "champ valide";
        nom_msg.textContent = "nom valide";
    }
});

// pour remplaire les group 
groupes.forEach(function (group) {
    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = group.nom;

    groupe_eleve.append(option);
});

// pour valide les group 
const groupe_msg = document.querySelector("#groupe-msg");
const groupe_champ = groupe_eleve.closest(".champ");

groupe_eleve.addEventListener("change", function () {

    if (groupe_eleve.value === "") {
        groupe_champ.className = "champ erreur";
        groupe_msg.textContent = "Veuillez choisir un groupe.";
    } else {
        groupe_champ.className = "champ valide";
        groupe_msg.textContent = "Groupe valide.";
    }

});

// pour valide lemail
const email_msg = document.querySelector("#email-msg");
const email_champ = email_eleve.closest(".champ");
email_eleve.addEventListener("input", function () {

    const email = email_eleve.value.trim();

    if (email === "") {
        email_champ.className = "champ";
        email_msg.textContent = "Exemple : parent@mail.ma";
    }
    else if (!regexEmail.test(email)) {
        email_champ.className = "champ erreur";
        email_msg.textContent = "Adresse email invalide.";
    }
    else {
        email_champ.className = "champ valide";
        email_msg.textContent = "Email valide.";
    }

});
// pour valive le number tele 
const tele_msg = document.querySelector("#telephone-msg");
const tele_champ = telephone_eleve.closest(".champ");
telephone_eleve.addEventListener("input", function () {

    const tele = telephone_eleve.value.trim();

    if (tele === "") {
        tele_champ.className = "champ";
        tele_msg.textContent = "exemple -> 0612345678 ou +212612345678";
    }
    else if (regexTelephone.test(tele) === false) {
        tele_champ.className = "champ erreur";
        tele_msg.textContent = "Numero invalide : exemple 0612345678 ou +212612345678";
    }
    else {
        tele_champ.className = "champ valide";
        tele_msg.textContent = "Numero valide.";
    }

});

// pour valive le code provisoir 
const code_msg = document.querySelector("#code-msg");
const code_champ = code_eleve.closest(".champ");
code_eleve.addEventListener("input", function () {
    const code = code_eleve.value.trim();

    if (code === "") {
        code_champ.className = "champ";
        code_msg.textContent = "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.";

    } else if (regexCode.test(code) === false) {
        code_champ.className = "champ erreur";
        code_msg.textContent = "Code invalide";

    } else {
        code_champ.className = "champ valide";
        code_msg.textContent = "code valide";
    }
})


// pour ajouter un nouveau eleve
const form_succes = document.querySelector("#form-succes");
const form_erreur = document.querySelector("#form-erreur");

forma_eleve.addEventListener("submit", function (event) {
    event.preventDefault();
    //pour cache le msg de succes et de erreur 
    form_succes.hidden = true;
    form_erreur.hidden = true;
    // format du prenom et du nom
    prenom_eleve.value = formatNom(prenom_eleve.value.trim());
    nom_eleve.value = formatNom(nom_eleve.value.trim());
    // pour verifie tous les champ 
    // validationsChamp cest une un array qui stocke les donne valide et chqaue result return F or T
    const validationsChamp = [
        regexName.test(prenom_eleve.value.trim()),
        regexName.test(nom_eleve.value.trim()),
        groupe_eleve.value != "",
        regexEmail.test(email_eleve.value.trim()),
        regexTelephone.test(telephone_eleve.value.trim()),
        regexCode.test(code_eleve.value.trim())
    ]
    // verfie tous les validation avec every: boucle sur tous les elements et vue cest return true
    const formulaireValide = validationsChamp.every(function (valide) {
        return valide;
    });
    if (!formulaireValide) {
        const champs = [
            prenom_eleve,
            nom_eleve,
            groupe_eleve,
            email_eleve,
            telephone_eleve,
            code_eleve
        ];

        for (let i = 0; i < validationsChamp.length; i++) {
            if (validationsChamp[i] === false) {
                champs[i].focus();
                break;
            }
        }

        return;
    }

    // on a recuprer les valeur du formulaire
    const prenom = prenom_eleve.value.trim();
    const nom = nom_eleve.value.trim();
    const groupeId = Number(groupe_eleve.value);
    const email = email_eleve.value.trim();
    const telephone = telephone_eleve.value.trim();

    // verifie est evite les doublons
    const nomberEleves = eleves.filter(function (eleve) {
        return Number(eleve.groupeId) === groupeId;

    });

    // verifie la limite de eleves

    if (nomberEleves.length >= 15) {
        form_erreur.textContent = "Ce groupe est complet (15 eleves)"
        form_erreur.hidden = false
        groupe_eleve.focus();   // focuss(): est une fonction bien definie qui or cible sur un element 
        return;
    }

    // verifie si eleve et deja
    const eleveDeja = eleves.some(function (eleve) {
        return Number(eleve.groupeId) === groupeId &&
            eleve.prenom.toLowerCase() === prenom.toLowerCase() &&
            eleve.nom.toLowerCase() === nom.toLowerCase();
    });
    if (eleveDeja) {
        form_erreur.textContent = " eleve deja dans le group.";
        form_erreur.hidden = false;
        return;
    }


    const nouvelId = Math.max(...eleves.map(function (eleve) {
        return eleve.id
    }), 0) + 1
    // cree et aajouter un nouveau eleve 
    const nouvelEleve = {
        id: nouvelId,
        prenom: prenom,
        nom: nom,
        groupeId: groupeId,
        emailParent: email,
        telephoneParent: telephone,
        absences: 0,
        notes: []
    };
    eleves.push(nouvelEleve); // pour ajouter au tableau
    filterGoupInput() // pour actualiser la liste
    forma_eleve.reset() // pour reinitialiser le formulaire 
    // pour reinitialiser le formulaire et  supprime les classes erreur/valid
    document.querySelectorAll("#form-eleve .champ").forEach(function (champ) {
        champ.className = "champ";
    });

    prenom_msg.textContent = "2 caracteres aminimum";
    nom_msg.textContent = "2 caracteres aminimum: letter espaces ou tirets";
    groupe_msg.textContent = "groupe de leleve";
    email_msg.textContent = "exemple : parent@mail.ma";
    tele_msg.textContent = "exemple : 0612345678 ou +212612345678";
    code_msg.textContent = "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial";

    document.querySelector("#code-force").value = 0;
    form_succes.textContent = "eleve ajouter avec succes";
    form_succes.hidden = false;
});

// bilan du groupe
const bilanMoyenne = document.querySelector("#bilan-moyenne");
const bilanAbsences = document.querySelector("#bilan-absences");
const bilanAlertes = document.querySelector("#bilan-alertes");
const bilanMeilleur = document.querySelector("#bilan-meilleur");
const listeParents = document.querySelector("#liste-parents");
const aucuneAlerte = document.querySelector("#aucune-alerte");


function calculMoyenneGroupe(elevesDuGroupe) {
    let somme = 0;
    // boucle sur tous les eleves et leurs notes
    for (let i = 0; i < elevesDuGroupe.length; i++) {
        for (let j = 0; j < elevesDuGroupe[i].notes.length; j++) {
            somme += elevesDuGroupe[i].notes[j];
        }
    }
    // calcule le nombre total des notes
    const nombreNotes = elevesDuGroupe.reduce(function (total, eleve) {
        return total + eleve.notes.length;
    }, 0);
    // verifie cest existe des notes
    if (nombreNotes === 0) return "—";

    return (somme / nombreNotes).toFixed(2).replace(".", ",");
}
// Calculer le total des absences
function calculTotalAbsences(elevesDuGroupe) {
    return elevesDuGroupe.reduce(function (total, eleve) {
        return total + eleve.absences;
    }, 0);
}
// Compter les eleves en alerte
function calculNombreAlertes(elevesDuGroupe) {
    const alertes = elevesDuGroupe.filter(function (eleve) {
        return eleve.absences >= 3;
    });

    return alertes.length;
}

// trouver le meilleur eleve
function calculMeilleurEleve(elevesDuGroupe) {
    let meilleur = null;
    for (let i = 0; i < elevesDuGroupe.length; i++) {
        const eleve = elevesDuGroupe[i];

        if (eleve.notes.length === 0) continue;

        const moyenne = eleve.notes.reduce(function (total, note) {
            return total + note;
        }, 0) / eleve.notes.length;

        if (meilleur === null || moyenne > meilleur.moyenne) {
            meilleur = {
                nom: eleve.prenom + " " + eleve.nom,
                moyenne: moyenne
            };
        }
    }
    if (meilleur === null) return "—";
    return meilleur.nom + " — " +
        meilleur.moyenne.toFixed(2).replace(".", ",") + " / 20";
}
// afficher les parents a appeler
function afficherParents(elevesDuGroupe) {
    // garder les eleves alerte
    const elevesAlertes = elevesDuGroupe.filter(function (eleve) {
        return eleve.absences >= 3;
    });
    // vider la liste
    listeParents.replaceChildren();
    // afficher les parents
    const parents = elevesAlertes.map(function (eleve) {
        return eleve.prenom + " " + eleve.nom + " — " + eleve.telephoneParent;
    });
    for (let i = 0; i < parents.length; i++) {
        const li = document.createElement("li");
        li.textContent = parents[i];
        listeParents.append(li);
    }
}
// verifie si aucun eleve sur alerte
function verifierAlertes(elevesDuGroupe) {
    return elevesDuGroupe.every(function (eleve) {
        return eleve.absences < 3;
    });
}

///. function  affiche la moyenne de groupe
function afficherBilan(elevesDuGroupe) {
    bilanMoyenne.textContent = calculMoyenneGroupe(elevesDuGroupe);
    bilanAbsences.textContent = calculTotalAbsences(elevesDuGroupe);
    bilanAlertes.textContent = calculNombreAlertes(elevesDuGroupe);
    bilanMeilleur.textContent = calculMeilleurEleve(elevesDuGroupe);
    afficherParents(elevesDuGroupe);
    aucuneAlerte.hidden = !verifierAlertes(elevesDuGroupe);
}
afficherBilan(eleves);
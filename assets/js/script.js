import { groupes, eleves } from './data.js';
const liste_eleves = document.querySelector("#liste-eleves");
// console.log(liste_eleves);

function creerLigne(eleve) {
    const li = document.createElement("li");
    li.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3")
    if (eleve.absences >= 3) {
        li.classList.add("alerte");
    }

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
    filterData.map(function (eleve) {
        const ligne = creerLigne(eleve)
        liste_eleves.append(ligne);
    })

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
    const valeurRechetcher = rechercheNom.value.trim();

    const filter_data = eleves.filter(function (eleve) {
        return (eleve.groupeId == Number(groupeSelectionne) || groupeSelectionne == "") &&
            (eleve.prenom.toLocaleLowerCase().includes(valeurRechetcher.toLocaleLowerCase()) ||
                eleve.nom.toLocaleLowerCase().includes(valeurRechetcher.toLocaleLowerCase()))
    })
    renderData(filter_data);
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
const regexTelephone = /^(06|07)[0-9]{8}$/;
//regex code privisoir
const regexCode = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;



// validation pour prenom
const prenom_champ = prenom_eleve.closest(".champ");
prenom_eleve.addEventListener("input", function () {

     const prenom = prenom_eleve.value.trim();

    if (prenom === "") {
        prenom_champ.className = "champ";
        prenom_msg.textContent = "2 caractères minimum.";
    }
    else if (!regexName.test(prenom)) {
        prenom_champ.className = "champ erreur";
        prenom_msg.textContent = "Prénom invalide.";
    }
    else {
        prenom_champ.className = "champ valide";
        prenom_msg.textContent = "Prénom valide.";
    }


});
// validation nom
const nom_champ = nom_eleve.closest(".champ");
nom_eleve.addEventListener("input", function () {

     const nom = nom_eleve.value.trim();

    if (nom === "") {
        nom_champ.className = "champ";
        nom_msg.textContent = "2 caractères minimum : lettres, espaces ou tirets.";
    }
    else if (!regexName.test(nom)) {
        nom_champ.className = "champ erreur";
        nom_msg.textContent = "nom invalide.";
    }
    else {
        nom_champ.className = "champ valide";
        nom_msg.textContent = "nom valide.";
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
        tele_msg.textContent = "10 chiffres : commence par 06 ou 07";
    }
    else if (regexTelephone.test(tele)=== false) {
        tele_champ.className = "champ erreur";
        tele_msg.textContent = "Numero invalide : exemple 0612345678";
    }
    else {
        tele_champ.className = "champ valide";
        tele_msg.textContent = "Numero valide.";
    }

});

// pour valive le code provisoir 
const code_msg = document.querySelector("#code-msg");
const code_champ = code_eleve.closest(".champ");
code_eleve.addEventListener("input", function(){
    const code = code_eleve.value.trim();

    if(code === ""){
        code_champ.className = "champ";
        code_msg.textContent = "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial.";

    }else if(regexCode.test(code) === false){
         code_champ.className = "champ erreur";
         code_msg.textContent = "Code invalide";

    }else{
        code_champ.className = "champ valide";
        code_msg.textContent = "code valide";
    }
})



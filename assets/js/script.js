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
    spanAbsence.classList.add("block", "text-sm", "text-muted")
    spanAbsence.textContent = eleve.absences + " absence(s)";
    infos.append(spanName, spanAbsence);
    button.append(infos)

    // calcule moyenne
    const span_moyenne = document.createElement("span");
    span_moyenne.classList.add("font-serif", "text-xl")
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
    input_note.classList.add("h-11", "w-full", "rounded-full", "border", "border-line", "bg-paper", "px-4", "text-sm", "lg:w-24")
    label.append(input_note)

    const btn_ajouter = document.createElement("button");
    btn_ajouter.type = "button";
    btn_ajouter.classList.add("btn-note", "h-11", "rounded-full", "bg-ink", "px-3", "sm:px-4", "text-sm", "font-medium", "text-white", "hover:bg-brand");
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
    compteur.textContent= filterData.length + " eleve"
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
filtre_groupe.addEventListener("change", function () {
    const groupeSelectionne = filtre_groupe.value;

    const filter_data = eleves.filter(function (eleve) {
        return eleve.groupeId == Number(groupeSelectionne) || groupeSelectionne == "";
    })
    // console.log(filter_data);
    renderData(filter_data)
});
renderData()

//filtrage par nom
const rechercheNom = document.querySelector("#recherche");
// console.log(rechercheNom)

rechercheNom.addEventListener("input", function(){
    const valeurRechetcher = rechercheNom.value.trim();
    const resultat = eleves.filter(function(eleve){
        return eleve.prenom.toLocaleLowerCase().includes(valeurRechetcher.toLocaleLowerCase()) || eleve.nom.toLocaleLowerCase().includes(valeurRechetcher.toLocaleLowerCase());

    });
    renderData(resultat);
});






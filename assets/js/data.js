// 1. donnes des groups
export const groupes = [
  {
    id: 1,
    nom: "2eme Bac",
    cours: "Mathematiques"
  },
  {
    id: 2,
    nom: "1ere Bac",
    cours: "Physique-Chimie"
  },
  {
    id: 3,
    nom: "3eme College",
    cours: "Francais"
  }
];

// 2. donnes des  eleves
export const eleves = [
  // groupe 1 : 2eme Bac
  {
    id: 1,
    prenom: "Ahmed",
    nom: "Alami",
    groupeId: 1,
    telephoneParent: "0612345678",
    absences: 2,
    notes: [12, 15, 14]
  },
  {
    id: 2,
    prenom: "Sofia",
    nom: "Amine",
    groupeId: 1,
    telephoneParent: "0623456789",
    absences: 0,
    notes: [16, 14, 18]
  },
  {
    id: 3,
    prenom: "Youssef",
    nom: "Boudra",
    groupeId: 1,
    telephoneParent: "0634567890",
    absences: 3,
    notes: [10, 12, 11]
  },
  {
    id: 4,
    prenom: "Salma",
    nom: "Omari",
    groupeId: 1,
    telephoneParent: "0645678901",
    absences: 1,
    notes: [15, 17, 14]
  },
  {
    id: 5,
    prenom: "Hamza",
    nom: "Driouche",
    groupeId: 1,
    telephoneParent: "0656789012",
    absences: 0,
    notes: []
  },

  // group 2 : 1ere Bac

  {
    id: 6,
    prenom: "Imane",
    nom: "Tazi",
    groupeId: 2,
    telephoneParent: "0667890123",
    absences: 4,
    notes: [9, 11, 12]
  },
  {
    id: 7,
    prenom: "Omar",
    nom: "Aloui",
    groupeId: 2,
    telephoneParent: "0678901234",
    absences: 1,
    notes: [14, 13, 15]
  },
  {
    id: 8,
    prenom: "Aya",
    nom: "Nacir",
    groupeId: 2,
    telephoneParent: "0689012345",
    absences: 0,
    notes: [17, 18, 16]
  },
  {
    id: 9,
    prenom: "Mehdi",
    nom: "Rachdi",
    groupeId: 2,
    telephoneParent: "0690123456",
    absences: 2,
    notes: [11, 13, 12]
  },
  {
    id: 10,
    prenom: "Nour",
    nom: "EL khazri",
    groupeId: 2,
    telephoneParent: "0701234567",
    absences: 3,
    notes: []
  },

  // group 3 : 3eme College

  {
    id: 11,
    prenom: "Adam",
    nom: "Lamssiah",
    groupeId: 3,
    telephoneParent: "0712345678",
    absences: 0,
    notes: [15, 16, 14]
  },
  {
    id: 12,
    prenom: "Mariam",
    nom: "Houssni",
    groupeId: 3,
    telephoneParent: "0723456789",
    absences: 2,
    notes: [13, 14, 12]
  },
  {
    id: 13,
    prenom: "Anas",
    nom: "Chraibi",
    groupeId: 3,
    telephoneParent: "0734567890",
    absences: 3,
    notes: [10, 9, 12]
  },
  {
    id: 14,
    prenom: "Lina",
    nom: "Mansouri",
    groupeId: 3,
    telephoneParent: "0745678901",
    absences: 1,
    notes: [18, 17, 19]
  },
  {
    id: 15,
    prenom: "Rayan",
    nom: "Ben rached",
    groupeId: 3,
    telephoneParent: "0756789012",
    absences: 0,
    notes: []
  }

];

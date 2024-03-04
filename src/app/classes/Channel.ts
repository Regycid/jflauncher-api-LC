import { Version } from './Version';

export class Channel {
    name: string; // Déclaration de la propriété "name" de type string
    versions!: Version[] // Déclaration de la propriété "versions" de type Version[] (tableau de Version)

    constructor(name: string) { // Constructeur de la classe Channel avec un paramètre "name" de type string
        this.name = name; // Initialisation de la propriété "name" avec la valeur du paramètre "name"
        this.versions = []; // Initialisation de la propriété "versions" avec un tableau vide
    }

    get ChannelName() { // Getter pour la propriété "ChannelName"
        return this.name; // Retourne la valeur de la propriété "name"
    }

    get Version(): Version[] { // Getter pour la propriété "Version"
        return this.versions; // Retourne la valeur de la propriété "versions"
    }

    set Version(version: Version) { // Setter pour la propriété "Version" avec un paramètre "version" de type Version
        this.versions.push(version); // Ajoute la valeur du paramètre "version" à la propriété "versions"
    }
}

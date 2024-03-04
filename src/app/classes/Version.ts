export class Version {
    protected version: string; // La version du logiciel
    protected changelog: string; // Le journal des modifications
    protected path: string; // Le chemin du fichier

    constructor(version: string, changelog: string, path: string) {
        this.version = version;
        this.changelog = changelog;
        this.path = path;
    }

    get Version() { // Accesseur pour obtenir la version
        return this.version;
    }

    get Changelog() { // Accesseur pour obtenir le journal des modifications
        return this.changelog;
    }

    get Path() { // Accesseur pour obtenir le chemin du fichier
        return this.path;
    }
}
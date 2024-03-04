import fs from 'fs';
import path from 'path';
import { Channel } from '../classes/Channel';
import { Version } from '../classes/Version';

var channels: Channel[] = []

export const init = () => {
    const repoPath: string = "repo"
    
    // Vérifie si le dossier "repo" existe, sinon le crée
    if (!fs.existsSync(repoPath)) {
        fs.mkdirSync(repoPath)
    }

    // Vérifie si le dossier "uploads" existe, sinon le crée
    if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads")
    }

    // Récupère le contenu du dossier "repo"
    const repoContent: any = fs.readdirSync(path.join(repoPath))

    // Parcourt chaque dossier dans "repo"
    for(const folderName of repoContent) {
        const folderPath: string = path.join(repoPath, folderName)
        const folderContent: any = fs.readdirSync(folderPath)
        const channel: Channel = new Channel(folderName)
        
        // Parcourt chaque sous-dossier dans le dossier actuel
        for(const subFolderName of folderContent) {
            const regex = new RegExp(/.*\.zip$/)
            const filePath: string = fs.readdirSync(path.join(repoPath, folderName, subFolderName)).filter((file: string) => regex.test(file))[0]
            const fileContent: any = fs.existsSync(path.join(repoPath, folderName, subFolderName, "changelog")) ? fs.readFileSync(path.join(repoPath, folderName, subFolderName, "changelog"), "utf8") : undefined
            const version: Version = new Version(subFolderName, fileContent, path.join(repoPath, folderName, subFolderName, filePath))
            channel.Version = version
        }

        channels.push(channel)
    }
}

// Retourne tous les canaux
export const getChannels = () => {
    return channels
}

// Retourne le canal avec le nom spécifié
export const getChannel = (name: string) => {
    return channels.filter((channel: Channel) => channel.ChannelName === name)[0]
}

// Retourne la version spécifiée du canal spécifié
export const getVersion = (channel: string, versionName: string) => {
    return getChannel(channel).Version.filter((version: Version) => version.Version === versionName)[0]
}

// Retourne le chemin de téléchargement de la version spécifiée du canal spécifié
export const getDownload = (channel: string, versionName: string) => {
    return getVersion(channel, versionName).Path
}

// Crée un nouveau canal avec le nom spécifié
export const createChannel = (name: string) => {
    const repoPath: string = "repo"
    fs.mkdirSync(path.join(repoPath, name))

    const channel: Channel = new Channel(name)
    channels.push(channel)

    return channel
}

// Crée une nouvelle version dans le canal spécifié avec le nom, le journal des modifications et le fichier spécifiés
export const createVersion = (channel: string, name: string, changelog: string, file: any) => {
    const repoPath: string = "repo"
    const channelPath: string = path.join(repoPath, channel)
    const latestVersion: string | boolean | undefined = fs.existsSync(path.join(channelPath, 'latest')) ? fs.readdirSync(path.join(channelPath, 'latest')).find((file: string) => file.endsWith('.zip')) : false
    const versionPath = path.join(repoPath, channel, name) as string

    // Vérifie si le canal existe, sinon le crée
    if (!fs.existsSync(channelPath)) {
        createChannel(channel)
    }

    // Vérifie si le nom de la nouvelle version est plus récent que la dernière version
    if(latestVersion) {
        const latestVersionName: string = latestVersion.split('.zip')[0]
        if(latestVersionName >= name) {
            return false
        }
        // Supprime l'ancien fichier "latest"
        fs.unlinkSync(path.join(channelPath, 'latest', latestVersion))

        // Copie le nouveau fichier "latest"
        fs.copyFileSync(path.join('uploads', file[0].originalname), path.join(channelPath, 'latest', `${name}.zip`))

        // Remplace l'ancien journal des modifications par le nouveau
        fs.writeFileSync(path.join(channelPath, 'latest', 'changelog'), changelog)
    }
    else {
        fs.mkdirSync(path.join(channelPath, 'latest'))
        fs.copyFileSync(path.join('uploads', file[0].originalname), path.join(channelPath, 'latest', `${name}.zip`))
        fs.writeFileSync(path.join(channelPath, 'latest', 'changelog'), changelog)
    }

    // Crée le dossier de la nouvelle version
    fs.mkdirSync(versionPath)

    // Crée le fichier "changelog" dans la nouvelle version
    fs.writeFileSync(path.join(versionPath, "changelog"), changelog)

    // Copie le fichier de la nouvelle version
    fs.copyFileSync(path.join('uploads', file[0].originalname), path.join(versionPath, `${name}.zip`))

    // Supprime le fichier d'origine des téléchargements
    fs.unlinkSync(path.join('uploads', file[0].originalname))

    // Crée une nouvelle instance de Version et l'ajoute au canal
    const version: Version = new Version(name, changelog, versionPath)
    getChannel(channel).Version = version

    return version
}
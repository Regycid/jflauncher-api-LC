import fs from 'fs';
import path from 'path';

import { Channel } from '../classes/Channel';
import { Version } from '../classes/Version';

var channels: Channel[] = []

export const init = () => {
    const repoPath: string = "repo"
    const repoContent: any = fs.readdirSync(path.join(repoPath))

    for(const folderName of repoContent) {
        const folderPath: string = path.join(repoPath, folderName)
        const folderContent: any = fs.readdirSync(folderPath)
        const channel: Channel = new Channel(folderName)
        
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

export const getChannels = () => {
    return channels
}

export const getChannel = (name: string) => {
    return channels.filter((channel: Channel) => channel.ChannelName === name)[0]
}

export const getVersion = (channel: string, versionName: string) => {
    return getChannel(channel).Version.filter((version: Version) => version.Version === versionName)[0]
}

export const getDownload = (channel: string, versionName: string) => {
    return getVersion(channel, versionName).Path
}

export const createChannel = (name: string) => {
    const repoPath: string = "repo"
    fs.mkdirSync(path.join(repoPath, name))

    const channel: Channel = new Channel(name)
    channels.push(channel)

    return channel
}

export const createVersion = (channel: string, name: string, changelog: string, file: any) => {
    const repoPath: string = "repo"
    const versionPath = path.join(repoPath, channel, name) as string
    fs.mkdirSync(versionPath)

    fs.writeFileSync(path.join(versionPath, "changelog"), changelog)
    fs.rename(path.join('uploads', file[0].originalname), path.join(versionPath, `${name}.zip`), (err)=>{
        if(err) console.log(err)
        console.log('file moved')
    })

    const version: Version = new Version(name, changelog, versionPath)
    getChannel(channel).Version = version

    return version
}
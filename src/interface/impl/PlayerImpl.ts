import  * as Player from 'play-sound'

import { IPlayer } from '../IPlayer';
import { getAssetDir } from '../../util/FileUtil'

const player = new Player({});

export class PlayerImpl implements IPlayer {

    play(fileName: string): void {
        player.play(getAssetDir(fileName), (error) => {})
    }
}
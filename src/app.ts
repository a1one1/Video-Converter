import { FfmpegExecuter } from "./commands/ffmpeg/ffmpeg.executer"
import { ConsoleLogger } from "./out/console-logger/console-logger"

export class App {
    async start() {
        new FfmpegExecuter(ConsoleLogger.getInstance()).execute()
    }
}
const start = new App()
start.start()
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/handlers/interface.stream-logger";
import { StreamHandler } from "../../core/handlers/stream.handler";
import { PromptServise } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { ICommandExecuterFfmpeg, IFfmpegInput } from "./ffmpeg.types";

export class FfmpegExecuter extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService()
    private promptService: PromptServise = new PromptServise()
    constructor(logger: IStreamLogger) {
        super(logger)
    }
    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number')
        const height = await this.promptService.input<number>('Высота', 'number')
        const path = await this.promptService.input<string>('Путь до файла', 'input')
        const name = await this.promptService.input<string>('Имя', 'input')
        return { width, height, path, name }
    }
    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecuterFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4')
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return { command: 'ffmpeg', args, output }
    }
    protected spawn({ output, command, args }: ICommandExecuterFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output)
        return spawn(command, args)
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }
}
import { PromptServise } from "./core/prompt/prompt.service"

export class App {
    async start() {
        const upshot = await (new PromptServise()).input<number>('Тестовое число', 'number')
    }
}
new App().start()
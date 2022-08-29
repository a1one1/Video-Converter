import inquirer from 'inquirer'
import { PromptType } from './prompt.types'

export class PromptServise {
    static input: any
    public async input<T>(message: string, type: PromptType) {
        const { upshot } = await inquirer.prompt<{ upshot: T }>([
            {
                type,
                name: 'upshot',
                message
            }
        ])
        return upshot
    }
}
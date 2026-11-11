import { Disposable, ExtensionContext } from 'vscode'
import { GrammarlyClient } from './GrammarlyClient'
import { StatusBarController } from './StatusBarController'

let client: GrammarlyClient | undefined

export async function activate(context: ExtensionContext) {
  client = new GrammarlyClient(context)
  await client.start()
  const disposable = Disposable.from(client.register(), new StatusBarController(client).register())
  context.subscriptions.push(disposable)
  return disposable
}

export async function deactivate(): Promise<void> {
  if (client) {
    await client.stop()
    client = undefined
  }
}


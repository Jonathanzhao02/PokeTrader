import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { EventEmitter } from 'events';

const BOT_PREFIX = process.env['BOT_PREFIX'];

export default class MyClient extends AkairoClient {
    private commandHandler: CommandHandler;
    private inhibitorHandler: InhibitorHandler;
    private listenerHandler: ListenerHandler;

    constructor() {
        super(
            {
                ownerID: '290237225596092416'
            },
            {
                messageCacheMaxSize: 0,
                messageEditHistoryMaxSize: 0
            }
        );

        this.commandHandler = new CommandHandler(this, {
            directory: './build/commands/',
            prefix: BOT_PREFIX
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './build/inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './build/listeners'
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.registerEmitter('commandHandler', this.commandHandler);
        this.registerEmitter('inhibitorHandler', this.inhibitorHandler);
        this.registerEmitter('listenerHandler', this.listenerHandler);
    }

    async login(token: string): Promise<string> {
        return super.login(token);
    }

    load(): void {
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.commandHandler.loadAll();
    }

    registerEmitter(id: string, emitter: EventEmitter): void {
        this.listenerHandler.emitters.set(id, emitter);
    }

    getCommandHandler(): CommandHandler {
        return this.commandHandler;
    }
}
